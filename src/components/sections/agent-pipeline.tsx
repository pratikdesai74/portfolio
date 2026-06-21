"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Play,
  CheckCircle2,
  Circle,
  Loader2,
  AlertCircle,
  ChevronRight,
  Cpu,
  Database,
  FileCode2,
  ScrollText,
  Cloud,
  GitBranch,
  Layers,
  Sparkles,
  RotateCcw,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
type AgentStatus = "idle" | "running" | "done" | "error";

interface Agent {
  id: string;
  name: string;
  source: string;
  icon: React.ReactNode;
  color: string;
  finding: string;
  detail: string;
}

/* ─────────────────────────────────────────────
   Agent definitions
───────────────────────────────────────────── */
const AGENTS: Agent[] = [
  {
    id: "jira",
    name: "Jira MCP Agent",
    source: "Jira Cloud · MCP Server",
    icon: <AlertCircle className="w-3.5 h-3.5" />,
    color: "#22d3ee",
    finding: "SCRUM-1234 · P1 Critical",
    detail: "NPE in PaymentService:156 · 847 occurrences · $24K revenue impact",
  },
  {
    id: "code",
    name: "Code Context Agent",
    source: "GitHub · diff analysis",
    icon: <FileCode2 className="w-3.5 h-3.5" />,
    color: "#6366f1",
    finding: "SDK bump 2.1.0 → 2.3.0 found",
    detail: "payment-gateway-sdk response schema changed — transactionId moved to response.data",
  },
  {
    id: "loki",
    name: "Loki Log Agent",
    source: "Loki CLI · logql",
    icon: <ScrollText className="w-3.5 h-3.5" />,
    color: "#8b5cf6",
    finding: "847 errors in 30 min",
    detail: "CircuitBreaker half-open · GatewayClient schema mismatch since 14:23 UTC",
  },
  {
    id: "db",
    name: "DB Inspector Agent",
    source: "PostgreSQL · metrics",
    icon: <Database className="w-3.5 h-3.5" />,
    color: "#f59e0b",
    finding: "1,247 stuck PENDING rows",
    detail: "DB pool: 91/100 (critical) · Last success: 14:20 UTC",
  },
  {
    id: "s3",
    name: "S3 Config Agent",
    source: "AWS S3 · config bucket",
    icon: <Cloud className="w-3.5 h-3.5" />,
    color: "#22c55e",
    finding: "Endpoint changed 3h ago",
    detail: "v3 API endpoint deployed by devops-bot · new response schema undocumented",
  },
  {
    id: "sqs",
    name: "SQS Inspector Agent",
    source: "AWS SQS · queue metrics",
    icon: <Layers className="w-3.5 h-3.5" />,
    color: "#ef4444",
    finding: "DLQ: 234 messages (CRITICAL)",
    detail: "payment-events-queue backlog: 1,847 msgs · downstream consumers failing",
  },
  {
    id: "rag",
    name: "RAG Context Builder",
    source: "Vector store · embeddings",
    icon: <GitBranch className="w-3.5 h-3.5" />,
    color: "#a78bfa",
    finding: "Cross-context correlations found",
    detail: "SDK bump ↔ log spike ↔ config change — causal chain established",
  },
  {
    id: "llm",
    name: "LLM Analysis Agent",
    source: "Groq · llama-3.3-70b",
    icon: <Sparkles className="w-3.5 h-3.5" />,
    color: "#22d3ee",
    finding: "Root cause identified",
    detail: "Generating resolution with full multi-source context...",
  },
];

const AGENT_DELAYS = [0, 1300, 2500, 3600, 4700, 5700, 7000, 8200];

const SAMPLE_TICKET = {
  id: "SCRUM-1234",
  title: "Payment processing timeout — NullPointerException on checkout",
  priority: "P1 · Critical",
  status: "Investigating",
  env: "production · us-east-1",
  reporter: "platform-alerts@company.com",
  occurrences: "847 in 30 min",
  impact: "~$24K revenue",
};

/* ─────────────────────────────────────────────
   Agent card
───────────────────────────────────────────── */
function AgentCard({
  agent,
  status,
  index,
}: {
  agent: Agent;
  status: AgentStatus;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className={cn(
        "flex items-start gap-3 p-3 rounded-xl border transition-all duration-500",
        status === "idle" && "bg-[#0a0f1e] border-[#1e293b] opacity-50",
        status === "running" && "bg-[#111827] border-[#334155] shadow-lg",
        status === "done" && "bg-[#0f1929] border-[#1e293b]",
        status === "error" && "bg-red-950/20 border-red-500/20"
      )}
    >
      {/* Status icon */}
      <div className="shrink-0 mt-0.5">
        {status === "idle" && (
          <Circle className="w-4 h-4 text-[#334155]" />
        )}
        {status === "running" && (
          <Loader2 className="w-4 h-4 animate-spin" style={{ color: agent.color }} />
        )}
        {status === "done" && (
          <CheckCircle2 className="w-4 h-4" style={{ color: agent.color }} />
        )}
        {status === "error" && (
          <AlertCircle className="w-4 h-4 text-red-400" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span style={{ color: status === "idle" ? "#334155" : agent.color }}>
            {agent.icon}
          </span>
          <span
            className={cn(
              "text-xs font-semibold font-mono truncate",
              status === "idle" ? "text-[#334155]" : "text-[#e2e8f0]"
            )}
          >
            {agent.name}
          </span>
        </div>
        <p className="text-[10px] text-[#475569] mt-0.5 font-mono">{agent.source}</p>

        <AnimatePresence>
          {status === "running" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-1.5 overflow-hidden"
            >
              <div className="flex gap-1">
                {[0, 1, 2].map((j) => (
                  <motion.span
                    key={j}
                    className="w-1 h-1 rounded-full"
                    style={{ backgroundColor: agent.color }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: j * 0.2 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
          {status === "done" && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1.5"
            >
              <p
                className="text-xs font-medium"
                style={{ color: agent.color }}
              >
                {agent.finding}
              </p>
              <p className="text-[10px] text-[#64748b] mt-0.5 leading-relaxed">
                {agent.detail}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Streaming analysis output
───────────────────────────────────────────── */
function AnalysisOutput({ text, isStreaming }: { text: string; isStreaming: boolean }) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [text]);

  // Parse sections for highlight rendering
  const sections = text.split(/\n(?=#{1,3}\s|\*\*[A-Z])/);

  return (
    <div className="font-mono text-xs leading-relaxed space-y-1 text-[#94a3b8] whitespace-pre-wrap break-words">
      {text}
      {isStreaming && (
        <span className="inline-block w-0.5 h-3 bg-[#22d3ee] ml-0.5 align-middle animate-pulse" />
      )}
      <div ref={endRef} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main section
───────────────────────────────────────────── */
export function AgentPipeline() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  const [agentStatuses, setAgentStatuses] = useState<Record<string, AgentStatus>>(
    Object.fromEntries(AGENTS.map((a) => [a.id, "idle"]))
  );
  const [phase, setPhase] = useState<"idle" | "running" | "analyzing" | "done">("idle");
  const [analysisText, setAnalysisText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const resetDemo = useCallback(() => {
    abortRef.current?.abort();
    setAgentStatuses(Object.fromEntries(AGENTS.map((a) => [a.id, "idle"])));
    setPhase("idle");
    setAnalysisText("");
    setIsStreaming(false);
  }, []);

  const runAnalysis = useCallback(async () => {
    if (phase !== "idle") return;
    abortRef.current = new AbortController();
    setPhase("running");
    setAnalysisText("");

    // Sequentially activate agents
    for (let i = 0; i < AGENTS.length; i++) {
      const agent = AGENTS[i];
      const delay = AGENT_DELAYS[i];

      setTimeout(() => {
        setAgentStatuses((prev) => ({ ...prev, [agent.id]: "running" }));
        setTimeout(
          () => {
            setAgentStatuses((prev) => ({ ...prev, [agent.id]: "done" }));
            // Last agent triggers streaming
            if (i === AGENTS.length - 1) {
              setPhase("analyzing");
              streamAnalysis(abortRef.current!.signal);
            }
          },
          agent.id === "llm" ? 900 : 700
        );
      }, delay);
    }
  }, [phase]);

  const streamAnalysis = async (signal: AbortSignal) => {
    setIsStreaming(true);
    try {
      const res = await fetch("/api/agent-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticketContext: "" }),
        signal,
      });

      if (!res.ok || !res.body) throw new Error("Analysis request failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let full = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() ?? "";
        for (const part of parts) {
          if (!part.startsWith("data: ")) continue;
          const raw = part.slice(6);
          if (raw === "[DONE]") break;
          try {
            const parsed: { text?: string; error?: string } = JSON.parse(raw);
            if (parsed.error) throw new Error(parsed.error);
            full += parsed.text ?? "";
            setAnalysisText(full);
          } catch {
            continue;
          }
        }
      }
      setPhase("done");
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setAnalysisText("Analysis failed. Please try again.");
      }
      setPhase("done");
    } finally {
      setIsStreaming(false);
    }
  };

  const completedCount = Object.values(agentStatuses).filter((s) => s === "done").length;

  return (
    <section
      id="ai-pipeline"
      ref={containerRef}
      className="py-16 md:py-24 border-b border-[#1e293b]/50"
    >
      {/* Header */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
        className="font-mono text-[#22d3ee] text-xs tracking-widest uppercase mb-2"
      >
        // 04.5 ai_agent_pipeline · live_demo
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="text-2xl md:text-3xl font-bold font-display text-[#e2e8f0] mb-2"
      >
        Multi-Agent <span className="gradient-text">Issue Analyser</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-sm text-[#64748b] mb-8 max-w-xl"
      >
        A production-grade AI agent pipeline I built: picks P1 tickets from{" "}
        <span className="text-[#22d3ee] font-mono">Jira MCP</span>, gathers context from
        code, logs, DB, S3 & SQS, then synthesises a root cause + fix using{" "}
        <span className="text-[#a78bfa] font-mono">llama-3.3-70b</span> via Groq.
      </motion.p>

      {/* Architecture badges */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="flex flex-wrap gap-2 mb-8"
      >
        {["Multi-Agent", "Jira MCP", "RAG Pipeline", "Loki CLI", "AWS SQS/S3", "Groq LLM"].map(
          (tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-[10px] font-mono rounded-full border border-[#22d3ee]/20 text-[#22d3ee] bg-[#22d3ee]/5"
            >
              {tag}
            </span>
          )
        )}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: Jira ticket + controls */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col gap-4"
        >
          {/* Jira Ticket Card */}
          <div className="p-4 rounded-2xl bg-[#111827] border border-[#1e293b]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] font-mono text-[#64748b] uppercase tracking-widest">
                Jira · {SAMPLE_TICKET.env}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <span className="font-mono text-[#22d3ee] text-xs">{SAMPLE_TICKET.id}</span>
                <span className="px-2 py-0.5 text-[10px] rounded-full bg-red-500/10 text-red-400 border border-red-500/20 font-mono shrink-0">
                  {SAMPLE_TICKET.priority}
                </span>
              </div>

              <p className="text-sm font-semibold text-[#e2e8f0] leading-snug">
                {SAMPLE_TICKET.title}
              </p>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1e293b]">
                {[
                  { label: "Status", value: SAMPLE_TICKET.status },
                  { label: "Reporter", value: SAMPLE_TICKET.reporter },
                  { label: "Occurrences", value: SAMPLE_TICKET.occurrences },
                  { label: "Revenue Impact", value: SAMPLE_TICKET.impact },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-[10px] text-[#334155] font-mono uppercase">{label}</p>
                    <p className="text-xs text-[#94a3b8] mt-0.5 truncate">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Progress / CTA */}
          <div className="p-4 rounded-2xl bg-[#111827] border border-[#1e293b]">
            {/* Progress bar */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-[#475569]">Agent Pipeline Progress</span>
              <span className="text-[10px] font-mono text-[#22d3ee]">
                {completedCount}/{AGENTS.length} agents
              </span>
            </div>
            <div className="w-full h-1 bg-[#1e293b] rounded-full mb-4 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#22d3ee] to-[#6366f1]"
                animate={{ width: `${(completedCount / AGENTS.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            <div className="flex gap-2">
              {phase === "idle" ? (
                <button
                  onClick={runAnalysis}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-[#22d3ee] to-[#6366f1] text-[#0a0f1e] font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  <Play className="w-4 h-4" />
                  Run Agent Analysis
                </button>
              ) : (
                <button
                  onClick={resetDemo}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#1e293b] text-[#64748b] font-semibold text-sm hover:border-[#334155] hover:text-[#94a3b8] transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Demo
                </button>
              )}
            </div>

            {phase === "running" && (
              <p className="text-[10px] text-[#475569] font-mono mt-2 text-center">
                Agents gathering context in parallel...
              </p>
            )}
            {phase === "analyzing" && (
              <p className="text-[10px] text-[#22d3ee] font-mono mt-2 text-center animate-pulse">
                <Zap className="w-3 h-3 inline mr-1" />
                LLM synthesising analysis from {AGENTS.length} agent contexts...
              </p>
            )}
            {phase === "done" && (
              <p className="text-[10px] text-[#22c55e] font-mono mt-2 text-center">
                ✓ Analysis complete · See output panel →
              </p>
            )}
          </div>

          {/* Architecture note */}
          <div className="p-3 rounded-xl bg-[#0a0f1e] border border-[#1e293b]/50">
            <p className="text-[10px] font-mono text-[#334155] mb-1.5">// architecture</p>
            <div className="flex items-center gap-1.5 flex-wrap text-[10px] font-mono text-[#475569]">
              <span className="text-[#22d3ee]">Jira MCP</span>
              <ChevronRight className="w-2.5 h-2.5" />
              <span className="text-[#6366f1]">Context Agents</span>
              <ChevronRight className="w-2.5 h-2.5" />
              <span className="text-[#a78bfa]">RAG Builder</span>
              <ChevronRight className="w-2.5 h-2.5" />
              <span className="text-[#22d3ee]">LLM Agent</span>
              <ChevronRight className="w-2.5 h-2.5" />
              <span className="text-[#22c55e]">Resolution</span>
            </div>
          </div>
        </motion.div>

        {/* Right: Agent pipeline + analysis */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="flex flex-col gap-3"
        >
          {/* Agent list */}
          <div className="p-3 rounded-2xl bg-[#111827] border border-[#1e293b]">
            <p className="text-[10px] font-mono text-[#334155] mb-3 uppercase tracking-wider">
              // agent_runtime · {AGENTS.length} agents
            </p>
            <div className="space-y-2">
              {AGENTS.map((agent, i) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  status={agentStatuses[agent.id]}
                  index={i}
                />
              ))}
            </div>
          </div>

          {/* Analysis Output */}
          <AnimatePresence>
            {(phase === "analyzing" || phase === "done" || analysisText) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-4 rounded-2xl bg-[#0a0f1e] border border-[#22d3ee]/20"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Cpu className="w-3.5 h-3.5 text-[#22d3ee]" />
                  <span className="text-[10px] font-mono text-[#22d3ee] uppercase tracking-widest">
                    LLM Analysis Output · llama-3.3-70b via Groq
                  </span>
                  {isStreaming && (
                    <Loader2 className="w-3 h-3 text-[#22d3ee] animate-spin ml-auto" />
                  )}
                </div>
                <div
                  className="max-h-64 overflow-y-auto pr-1"
                  style={{ scrollbarWidth: "thin", scrollbarColor: "#1e293b transparent" }}
                >
                  {analysisText ? (
                    <AnalysisOutput text={analysisText} isStreaming={isStreaming} />
                  ) : (
                    <div className="flex gap-1 py-2">
                      {[0, 1, 2].map((j) => (
                        <motion.span
                          key={j}
                          className="w-1.5 h-1.5 rounded-full bg-[#22d3ee]"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: j * 0.25 }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
