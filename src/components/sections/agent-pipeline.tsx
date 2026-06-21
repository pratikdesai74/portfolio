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
type AgentStatus = "idle" | "running" | "done";
type DemoPhase = "idle" | "running" | "analyzing" | "done";

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
   Agent definitions — amber for active states
───────────────────────────────────────────── */
const AGENTS: Agent[] = [
  { id: "jira",  name: "Jira MCP Agent",       source: "Jira Cloud · MCP Server",    icon: <AlertCircle className="w-3.5 h-3.5" />, color: "#22d3ee", finding: "SCRUM-1234 · P1 Critical",       detail: "NPE in PaymentService:156 · 847 occurrences · $24K revenue impact" },
  { id: "code",  name: "Code Context Agent",    source: "GitHub · diff analysis",     icon: <FileCode2  className="w-3.5 h-3.5" />, color: "#6366f1", finding: "SDK bump 2.1.0 → 2.3.0 found",    detail: "payment-gateway-sdk response schema changed — transactionId moved to response.data" },
  { id: "loki",  name: "Loki Log Agent",        source: "Loki CLI · logql",           icon: <ScrollText className="w-3.5 h-3.5" />, color: "#8b5cf6", finding: "847 errors in 30 min",           detail: "CircuitBreaker half-open · GatewayClient schema mismatch since 14:23 UTC" },
  { id: "db",    name: "DB Inspector Agent",    source: "PostgreSQL · metrics",       icon: <Database   className="w-3.5 h-3.5" />, color: "#f59e0b", finding: "1,247 stuck PENDING rows",       detail: "DB pool: 91/100 (critical) · Last success: 14:20 UTC" },
  { id: "s3",    name: "S3 Config Agent",       source: "AWS S3 · config bucket",     icon: <Cloud      className="w-3.5 h-3.5" />, color: "#22c55e", finding: "Endpoint changed 3h ago",        detail: "v3 API endpoint deployed by devops-bot · new response schema undocumented" },
  { id: "sqs",   name: "SQS Inspector Agent",   source: "AWS SQS · queue metrics",    icon: <Layers     className="w-3.5 h-3.5" />, color: "#ef4444", finding: "DLQ: 234 messages (CRITICAL)",  detail: "payment-events-queue backlog: 1,847 msgs · downstream consumers failing" },
  { id: "rag",   name: "RAG Context Builder",   source: "Vector store · embeddings",  icon: <GitBranch  className="w-3.5 h-3.5" />, color: "#a78bfa", finding: "Cross-context correlations",    detail: "SDK bump ↔ log spike ↔ config change — causal chain established" },
  { id: "llm",   name: "LLM Analysis Agent",    source: "Groq · llama-3.3-70b",       icon: <Sparkles   className="w-3.5 h-3.5" />, color: "#22d3ee", finding: "Root cause identified",         detail: "Synthesising resolution from 7 agent contexts..." },
];

// Timing: each agent activates after this many ms from start
const AGENT_DELAYS  = [0, 720, 1440, 2160, 2880, 3600, 4440, 5280];
const AGENT_DUR     = 680; // ms each agent runs before → done
const RESULT_DELAY  = 5280 + AGENT_DUR + 400;
const LOOP_DELAY    = RESULT_DELAY + 6000; // reset & loop

const LOG_LINES = [
  "▶ orchestrator.multi_agent → boot",
  "▶ jira_mcp    → fetch SCRUM-1234 [P1]",
  "▶ code_ctx    → git diff · checkout.service",
  "▶ loki        → logql: NullPointerException · 847 hits",
  "▶ db_inspect  → pg: connection_pool exhausted",
  "▶ s3_config   → fetch payment-config.yaml",
  "▶ sqs_inspect → queue depth 1.8k · stalled",
  "▶ rag_builder → embed context · 6 sources",
  "▶ llm_agent   → groq/llama-3.3-70b · synthesising",
  "✓ root_cause synthesised · confidence 0.92",
];

const STATIC_RESULT = {
  cause: "SDK bump 2.1.0→2.3.0 changed the response schema — transactionId moved to response.data.transactionId. PaymentService:156 still reads the old path → NPE. DB connection pool exhausted by retry storm (91/100), SQS DLQ backlogged at 234 msgs.",
  fix: "Pin gateway-sdk to 2.1.0 (immediate rollback). Update PaymentService:156 to response.getData().getTransactionId(). Add null-guard + circuit breaker. Drain DLQ. P95 recovers in < 5 min.",
};

const SAMPLE_TICKET = {
  id: "SCRUM-1234",
  title: "Payment processing timeout — NullPointerException on checkout",
  priority: "P1 · Critical",
  env: "production · us-east-1",
  occurrences: "847 in 30 min",
  impact: "~$24K revenue",
};

/* ─────────────────────────────────────────────
   Agent card (amber for running state)
───────────────────────────────────────────── */
function AgentCard({ agent, status }: { agent: Agent; status: AgentStatus }) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 p-3 rounded-xl border transition-all duration-400",
        status === "idle"    && "bg-[#0a0f1e] border-[#1e293b] opacity-40",
        status === "running" && "bg-[#1a1505] border-[#fbbf24]/40 shadow-[0_0_12px_rgba(251,191,36,0.12)]",
        status === "done"    && "bg-[#0f1929] border-[#1e293b]"
      )}
    >
      {/* Status dot */}
      <div className="shrink-0 mt-0.5 w-2.5 h-2.5 rounded-full mt-1.5"
        style={{
          background: status === "done"    ? agent.color
                    : status === "running" ? "#fbbf24"
                    : "#2a3346",
          boxShadow: status === "done"    ? `0 0 8px ${agent.color}80`
                   : status === "running" ? "0 0 10px rgba(251,191,36,0.9)"
                   : "none",
        }}
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-1">
          <span className={cn(
            "text-xs font-semibold truncate",
            status === "idle" ? "text-[#334155]" : "text-[#e2e8f0]"
          )}>
            {agent.name}
          </span>
          <span className={cn(
            "text-[10px] font-mono shrink-0",
            status === "done"    && "text-[#22d3ee]",
            status === "running" && "text-[#fbbf24]",
            status === "idle"    && "text-[#334155]"
          )}>
            {status === "done" ? "✓ done" : status === "running" ? "● running" : "○ idle"}
          </span>
        </div>
        <p className="text-[10px] text-[#475569] font-mono mt-0.5">{agent.source}</p>

        <AnimatePresence>
          {status === "done" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="overflow-hidden mt-1"
            >
              <p className="text-[11px] font-medium" style={{ color: agent.color }}>
                {agent.finding}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Result panel — amber border, synthesised output
───────────────────────────────────────────── */
function ResultPanel({ isLive, liveText, isStreaming }: {
  isLive: boolean;
  liveText: string;
  isStreaming: boolean;
}) {
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [liveText]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-2xl border border-[#22d3ee]/25"
      style={{ background: "linear-gradient(180deg, rgba(34,211,238,0.06) 0%, rgba(34,211,238,0.01) 100%)" }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[10px] font-mono text-[#22d3ee] uppercase tracking-widest">
          ✓ Root Cause Synthesised
        </span>
        <span className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-[#22c55e]/10 border border-[#22c55e]/25 text-[#22c55e]">
          confidence 0.92
        </span>
        {isStreaming && <Loader2 className="w-3 h-3 text-[#22d3ee] animate-spin ml-auto" />}
      </div>

      {isLive && liveText ? (
        <div className="font-mono text-xs leading-relaxed text-[#94a3b8] whitespace-pre-wrap max-h-44 overflow-y-auto">
          {liveText}
          {isStreaming && <span className="inline-block w-0.5 h-3 bg-[#22d3ee] ml-0.5 align-middle animate-pulse" />}
          <div ref={endRef} />
        </div>
      ) : (
        <>
          <div className="mb-3">
            <p className="text-[10px] font-mono text-[#475569] uppercase tracking-wider mb-1">Cause</p>
            <p className="text-xs text-[#e2e8f0] leading-relaxed">{STATIC_RESULT.cause}</p>
          </div>
          <div>
            <p className="text-[10px] font-mono text-[#475569] uppercase tracking-wider mb-1">Proposed Fix</p>
            <p className="text-xs text-[#e2e8f0] leading-relaxed">
              {STATIC_RESULT.fix}{" "}
              <span className="text-[#22c55e]">P95 recovers in &lt; 5 min.</span>
            </p>
          </div>
        </>
      )}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Main section
───────────────────────────────────────────── */
export function AgentPipeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-120px" });

  const [statuses, setStatuses]     = useState<Record<string, AgentStatus>>(Object.fromEntries(AGENTS.map(a => [a.id, "idle"])));
  const [phase, setPhase]           = useState<DemoPhase>("idle");
  const [logs, setLogs]             = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isLiveRun, setIsLiveRun]   = useState(false);
  const [liveText, setLiveText]     = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const abortRef  = useRef<AbortController | null>(null);

  const completedCount = Object.values(statuses).filter(s => s === "done").length;

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const resetState = useCallback(() => {
    setStatuses(Object.fromEntries(AGENTS.map(a => [a.id, "idle"])));
    setPhase("idle");
    setLogs([]);
    setShowResult(false);
    setIsLiveRun(false);
    setLiveText("");
    setIsStreaming(false);
  }, []);

  // Teaser auto-loop (no Groq call — uses static result)
  const runTeaser = useCallback(() => {
    clearTimers();
    abortRef.current?.abort();
    resetState();
    setPhase("running");
    setLogs(["▶ orchestrator.multi_agent → boot"]);

    AGENTS.forEach((agent, i) => {
      const t1 = setTimeout(() => {
        setStatuses(prev => ({ ...prev, [agent.id]: "running" }));
        setLogs(prev => [...prev, LOG_LINES[i + 1]].slice(-6));
      }, AGENT_DELAYS[i]);

      const t2 = setTimeout(() => {
        setStatuses(prev => ({ ...prev, [agent.id]: "done" }));
      }, AGENT_DELAYS[i] + AGENT_DUR);

      timersRef.current.push(t1, t2);
    });

    const tResult = setTimeout(() => {
      setLogs(prev => [...prev, LOG_LINES[9]].slice(-6));
      setShowResult(true);
      setPhase("done");
    }, RESULT_DELAY);

    const tLoop = setTimeout(() => {
      runTeaser(); // loop
    }, LOOP_DELAY);

    timersRef.current.push(tResult, tLoop);
  }, [clearTimers, resetState]);

  // Auto-start teaser when section enters view
  useEffect(() => {
    if (isInView && phase === "idle") {
      const t = setTimeout(runTeaser, 400);
      return () => clearTimeout(t);
    }
  }, [isInView, phase, runTeaser]);

  // Manual live run — calls real Groq API
  const runLive = useCallback(async () => {
    clearTimers();
    abortRef.current?.abort();
    abortRef.current = new AbortController();
    resetState();
    setIsLiveRun(true);
    setPhase("running");
    setLogs(["▶ orchestrator.multi_agent → boot"]);

    AGENTS.forEach((agent, i) => {
      const t1 = setTimeout(() => {
        setStatuses(prev => ({ ...prev, [agent.id]: "running" }));
        setLogs(prev => [...prev, LOG_LINES[i + 1]].slice(-6));
      }, AGENT_DELAYS[i]);

      const t2 = setTimeout(() => {
        setStatuses(prev => ({ ...prev, [agent.id]: "done" }));
      }, AGENT_DELAYS[i] + AGENT_DUR);

      timersRef.current.push(t1, t2);
    });

    const tStream = setTimeout(async () => {
      setPhase("analyzing");
      setShowResult(true);
      setIsStreaming(true);

      try {
        const res = await fetch("/api/agent-analysis", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ticketContext: "" }),
          signal: abortRef.current!.signal,
        });

        if (!res.ok || !res.body) throw new Error();

        const reader  = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "", full = "";

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
              const parsed: { text?: string } = JSON.parse(raw);
              full += parsed.text ?? "";
              setLiveText(full);
            } catch { continue; }
          }
        }
        setPhase("done");
      } catch {
        setLiveText(STATIC_RESULT.cause + "\n\nFix: " + STATIC_RESULT.fix);
        setPhase("done");
      } finally {
        setIsStreaming(false);
      }
    }, RESULT_DELAY);

    timersRef.current.push(tStream);
  }, [clearTimers, resetState]);

  const handleReset = useCallback(() => {
    clearTimers();
    abortRef.current?.abort();
    resetState();
    // Re-trigger teaser
    setTimeout(runTeaser, 200);
  }, [clearTimers, resetState, runTeaser]);

  useEffect(() => () => { clearTimers(); abortRef.current?.abort(); }, [clearTimers]);

  return (
    <section
      id="ai-pipeline"
      ref={sectionRef}
      className="py-16 md:py-24 border-b border-[#1e293b]/50"
    >
      {/* Header */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
        className="font-mono text-[#22d3ee] text-xs tracking-widest uppercase mb-2"
      >
        // 04.5 ai_agent_pipeline ·{" "}
        <span className="text-[#fbbf24]">live_demo</span>
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
        className="text-sm text-[#64748b] mb-6 max-w-xl"
      >
        Picks a P1 ticket from{" "}
        <span className="text-[#22d3ee] font-mono">Jira MCP</span>, gathers context from code, logs,
        DB, S3 &amp; SQS, then synthesises a root cause + fix with{" "}
        <span className="text-[#a78bfa] font-mono">llama-3.3-70b</span> via Groq.{" "}
        <span className="text-[#475569]">— running automatically ↓</span>
      </motion.p>

      {/* Tech badges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="flex flex-wrap gap-2 mb-8"
      >
        {["Multi-Agent", "Jira MCP", "RAG Pipeline", "Loki CLI", "AWS SQS/S3", "Groq LLM"].map(tag => (
          <span key={tag} className="px-2.5 py-1 text-[10px] font-mono rounded-full border border-[#22d3ee]/20 text-[#22d3ee] bg-[#22d3ee]/5">
            {tag}
          </span>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* LEFT: ticket + progress + log + result */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col gap-4"
        >
          {/* Jira ticket — warm critical accent */}
          <div className="p-4 rounded-2xl bg-[#111726] border border-[#1e2638]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-mono text-[#64748b] uppercase tracking-wider">
                <span className="text-[#f87171]">●</span> Jira · {SAMPLE_TICKET.env}
              </span>
              <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-red-500/10 border border-red-500/25 text-red-400">
                {SAMPLE_TICKET.priority}
              </span>
            </div>
            <p className="font-mono text-[#22d3ee] text-xs mb-2">{SAMPLE_TICKET.id}</p>
            <p className="text-sm font-semibold text-[#e2e8f0] leading-snug mb-3">
              {SAMPLE_TICKET.title}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] font-mono text-[#475569] uppercase mb-0.5">Occurrences</p>
                <p className="text-xs text-[#e2e8f0] font-semibold">{SAMPLE_TICKET.occurrences}</p>
              </div>
              <div>
                <p className="text-[10px] font-mono text-[#475569] uppercase mb-0.5">Revenue Impact</p>
                <p className="text-xs text-[#fbbf24] font-semibold">{SAMPLE_TICKET.impact}</p>
              </div>
            </div>
          </div>

          {/* Progress + controls */}
          <div className="p-4 rounded-2xl bg-[#111726] border border-[#1e2638]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-[#94a3b8]">Agent Pipeline Progress</span>
              <span className="text-[10px] font-mono text-[#22d3ee]">{completedCount}/{AGENTS.length} agents</span>
            </div>
            <div className="h-1.5 bg-[#0b1120] rounded-full overflow-hidden mb-4">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#22d3ee] to-[#0ea5e9]"
                animate={{ width: `${(completedCount / AGENTS.length) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={runLive}
                disabled={phase === "running" || phase === "analyzing"}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-[#22d3ee] to-[#0ea5e9] text-[#04121a] font-semibold text-sm disabled:opacity-50 hover:opacity-90 transition-opacity"
              >
                {phase === "running" || phase === "analyzing"
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Running…</>
                  : <><Play className="w-4 h-4" /> Run Agent Analysis</>
                }
              </button>
              <button
                onClick={handleReset}
                className="p-2.5 rounded-xl border border-[#1e293b] text-[#64748b] hover:text-[#94a3b8] hover:border-[#334155] transition-colors"
                aria-label="Reset"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {phase === "analyzing" && (
              <p className="text-[10px] text-[#fbbf24] font-mono mt-2 text-center animate-pulse">
                <Zap className="w-3 h-3 inline mr-1" />
                LLM synthesising from {AGENTS.length} agent contexts…
              </p>
            )}
          </div>

          {/* Streaming log panel */}
          <div className="p-4 rounded-2xl bg-[#0b1120] border border-[#1e2638] min-h-[120px]">
            <p className="text-[10px] font-mono text-[#475569] uppercase tracking-wider mb-3">
              // agent_runtime · stream
            </p>
            <div className="space-y-0.5">
              <AnimatePresence initial={false}>
                {logs.slice(-6).map((line, i) => (
                  <motion.div
                    key={line + i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "font-mono text-[11px] leading-relaxed",
                      line.startsWith("✓") ? "text-[#22c55e]" : "text-[#7dd3fc]"
                    )}
                  >
                    {line}
                  </motion.div>
                ))}
              </AnimatePresence>
              {phase === "idle" && logs.length === 0 && (
                <p className="font-mono text-[11px] text-[#334155]">waiting for scroll…</p>
              )}
            </div>
          </div>

          {/* Result panel — shows after agents complete */}
          <AnimatePresence>
            {showResult && (
              <ResultPanel
                isLive={isLiveRun}
                liveText={liveText}
                isStreaming={isStreaming}
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* RIGHT: 8 agent cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.25 }}
        >
          <p className="text-[10px] font-mono text-[#475569] uppercase tracking-wider mb-3">
            // agent_runtime · 8 agents
          </p>
          <div className="space-y-2">
            {AGENTS.map(agent => (
              <AgentCard
                key={agent.id}
                agent={agent}
                status={statuses[agent.id]}
              />
            ))}
          </div>

          {/* Architecture flow */}
          <div className="mt-4 p-3 rounded-xl bg-[#0a0f1e] border border-[#1e293b]/50">
            <p className="text-[10px] font-mono text-[#334155] mb-1.5">// architecture</p>
            <div className="flex items-center gap-1 flex-wrap text-[10px] font-mono text-[#475569]">
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

      </div>
    </section>
  );
}
