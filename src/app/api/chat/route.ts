import { NextRequest } from "next/server";
import Groq from "groq-sdk";
import {
  personalInfo,
  experiences,
  projects,
  skills,
  testimonials,
} from "@/lib/data";

export const runtime = "nodejs";

function buildSystemPrompt(): string {
  const expSummary = experiences
    .map(
      (e) =>
        `- ${e.role} at ${e.company} (${e.period}): ${e.highlights.slice(0, 2).join("; ")}`
    )
    .join("\n");

  const projectSummary = projects
    .map((p) => `- ${p.title}: ${p.description}`)
    .join("\n");

  const skillList = Object.values(skills)
    .map((s) => `${s.title}: ${s.items.join(", ")}`)
    .join("\n");

  const testimonialSummary = testimonials
    .slice(0, 3)
    .map((t) => `- ${t.name} (${t.role}, ${t.company}): "${t.quote.slice(0, 100)}..."`)
    .join("\n");

  return `You are an AI assistant for Pratik Desai's portfolio website. Answer questions about Pratik concisely and helpfully.

## About Pratik
Name: ${personalInfo.name}
Title: ${personalInfo.title}
Location: ${personalInfo.location}
Email: ${personalInfo.email}

${personalInfo.about}

## Experience
${expSummary}

## Projects
${projectSummary}

## Skills
${skillList}

## What Colleagues Say
${testimonialSummary}

## Social
- LinkedIn: ${personalInfo.social.linkedin}
- GitHub: ${personalInfo.social.github}
- Medium: ${personalInfo.social.medium}

## Guidelines
- Be concise and friendly. Keep answers under 150 words unless the question requires more detail.
- Speak about Pratik in third person.
- If asked something unrelated to Pratik, politely redirect to topics about his work and background.
- Highlight his expertise in distributed systems, Java/Spring Boot/Kafka, AI agent pipelines, and RAG/LLM architecture when relevant.
- If asked about AI agents or the demo on this site, mention his work on multi-agent customer issue analysis pipelines using Jira MCP, Loki, and LLM orchestration.
`;
}

export async function POST(req: NextRequest) {
  const { message } = await req.json();

  if (!message || typeof message !== "string") {
    return new Response(JSON.stringify({ error: "Invalid message" }), { status: 400 });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "API key not configured" }), { status: 500 });
  }

  const client = new Groq({ apiKey });
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const completion = await client.chat.completions.create({
          model: "llama-3.3-70b-versatile",
          max_tokens: 512,
          messages: [
            { role: "system", content: buildSystemPrompt() },
            { role: "user", content: message },
          ],
          stream: true,
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
        const msg = error instanceof Error ? error.message : "Stream error";
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
