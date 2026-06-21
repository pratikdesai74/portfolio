import { NextRequest } from "next/server";
import Groq from "groq-sdk";

export const runtime = "nodejs";

// Simulated agent context gathered before calling the LLM
const AGENT_CONTEXTS = {
  jira: `JIRA Ticket: SCRUM-1234 (Priority: P1 CRITICAL)
Title: Payment processing timeout — NullPointerException on checkout
Reporter: platform-alerts@company.com
Component: payment-service
Environment: production (us-east-1)
Occurrences: 847 in last 30 min | Revenue impact: ~$24,000 lost
Stack trace:
  java.lang.NullPointerException: Cannot invoke "String.length()" because "response.getTransactionId()" is null
    at com.company.payment.PaymentService.processPayment(PaymentService.java:156)
    at com.company.payment.CheckoutController.checkout(CheckoutController.java:89)`,

  code: `Git context — PaymentService.java:156
  Recent commits on payment-service (last 6h):
    [3h ago] feat: update payment-gateway-v2 endpoint config (devops-bot)
    [2h ago] chore: bump payment-gateway-sdk 2.1.0 → 2.3.0 (renovate[bot])

  Relevant code (PaymentService.java:150-162):
    String txId = response.getTransactionId();   // LINE 156 — NPE here
    PaymentGatewayResponse response = gatewayClient.charge(request);
    // SDK 2.3.0 changed: transactionId is now nested in response.data.transactionId`,

  loki: `Loki log analysis (last 30 min, payment-service):
  [ERROR] PaymentService — Null response.transactionId after gateway call (count: 847)
  [WARN]  GatewayClient — Received 200 OK but response body schema mismatch
  [WARN]  CircuitBreaker — payment-gateway-v2 half-open (failure rate 94%)
  [ERROR] CheckoutController — PaymentProcessingException: downstream unavailable (count: 847)
  First occurrence: 2026-06-21T14:23:11Z (3 min after SDK bump)`,

  db: `Database state (PostgreSQL — payment_transactions):
  Stuck transactions: 1,247 rows in PENDING state (>30 min)
  Last successful payment: 2026-06-21T14:20:43Z
  DB connection pool: 91/100 connections in use (critical threshold: 85)
  Deadlock alerts: 0 (not a DB-level issue)
  payment_transactions table health: OK`,

  s3: `S3 config file — s3://company-configs/payment-gateway-config.json
  Last modified: 2026-06-21T14:20:00Z (by devops-bot via CI/CD pipeline)
  Previous endpoint: https://api.payment-gw-v1.com/v2/charge
  Current endpoint:  https://api.payment-gw-v2.com/v3/charge   ← changed
  Note: v3 API has new response schema — transactionId moved to response.data.transactionId`,

  sqs: `SQS Queue: payment-events-queue (us-east-1)
  Messages in flight: 1,847 (normal baseline: ~50)
  DLQ (payment-events-dlq): 234 messages (CRITICAL — normally 0)
  Oldest message age: 34 min
  Consumer lag: payment-processor-service is 34 min behind
  Note: downstream consumers are also failing due to malformed payment event payloads`,
};

export async function POST(req: NextRequest) {
  const { ticketContext } = await req.json();

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "API key not configured" }), { status: 500 });
  }

  const client = new Groq({ apiKey });
  const encoder = new TextEncoder();

  const systemPrompt = `You are a senior AI-powered production incident analysis agent. You are given multi-source context gathered by specialized sub-agents (Jira MCP, code analysis, log analysis, database inspection, S3 config, SQS queue state). Your job is to:

1. Identify the ROOT CAUSE precisely and concisely
2. Explain the BLAST RADIUS (what was affected and why)
3. Provide a concrete IMMEDIATE FIX (copy-paste ready commands or code change)
4. Suggest LONG-TERM PREVENTION steps

Format your response in clear sections. Be technical, precise, and action-oriented. Keep the tone of a highly experienced platform engineer who has seen this before.`;

  const userPrompt = `Analyze this production incident using all gathered agent context:

=== JIRA MCP AGENT ===
${AGENT_CONTEXTS.jira}

=== CODE CONTEXT AGENT ===
${AGENT_CONTEXTS.code}

=== LOKI LOG ANALYSIS AGENT ===
${AGENT_CONTEXTS.loki}

=== DATABASE INSPECTOR AGENT ===
${AGENT_CONTEXTS.db}

=== S3 CONFIG AGENT ===
${AGENT_CONTEXTS.s3}

=== SQS INSPECTOR AGENT ===
${AGENT_CONTEXTS.sqs}

${ticketContext ? `Additional context: ${ticketContext}` : ""}

Provide root cause, blast radius, immediate fix, and prevention strategy.`;

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const completion = await client.chat.completions.create({
          model: "llama-3.3-70b-versatile",
          max_tokens: 800,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          stream: true,
          temperature: 0.3,
        });

        for await (const chunk of completion) {
          const text = chunk.choices[0]?.delta?.content ?? "";
          if (text) {
            const data = `data: ${JSON.stringify({ text })}\n\n`;
            controller.enqueue(encoder.encode(data));
          }
        }

        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch (error) {
        const msg = error instanceof Error ? error.message : "Analysis error";
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: msg })}\n\n`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
