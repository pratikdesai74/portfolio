"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const runs = [
  {
    id: "init",
    label: "agent.initialization",
    lines: [
      "Loading context store...",
      "Connecting vector database [OK]",
      "Initializing memory module...",
      "System ready. Agents: 3 active",
    ],
  },
  {
    id: "rag",
    label: "rag.query_pipeline",
    lines: [
      "Query received: 'payment architecture'",
      "Embedding query → 1536-dim vector",
      "VDB cosine search → top 5 chunks [OK]",
      "Augmenting prompt with context...",
    ],
  },
  {
    id: "agents",
    label: "orchestrator.multi_agent",
    lines: [
      "Spawning research_agent...",
      "research_agent → tool_call: search",
      "Spawning synthesis_agent...",
      "synthesis_agent → generating response",
    ],
  },
];

export function AgentTrace() {
  const [runIndex, setRunIndex] = useState(0);
  const [visibleLines, setVisibleLines] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    setVisibleLines(0);
    setFading(false);

    const run = runs[runIndex];
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Reveal lines one by one
    run.lines.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), 500 + i * 700));
    });

    const allVisible = 500 + run.lines.length * 700;

    // Fade after pause
    timers.push(setTimeout(() => setFading(true), allVisible + 2000));

    // Switch run
    timers.push(
      setTimeout(
        () => setRunIndex((prev) => (prev + 1) % runs.length),
        allVisible + 2600
      )
    );

    return () => timers.forEach(clearTimeout);
  }, [runIndex]);

  const run = runs[runIndex];

  return (
    <div>
      <p className="font-mono text-[#22d3ee] text-xs tracking-widest uppercase mb-4 opacity-70">
        // agent_runtime
      </p>

      <motion.div
        animate={{ opacity: fading ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className="p-4 rounded-xl bg-[#080d1a] border border-[#1e293b] font-mono text-xs"
      >
        {/* Terminal bar */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-[#334155] text-[10px] ml-1 truncate">{run.label}</span>
          <span className="ml-auto text-[#22c55e] text-[10px] flex items-center gap-1 shrink-0">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
            running
          </span>
        </div>

        {/* Log lines */}
        <div className="space-y-1.5">
          {run.lines.map((line, i) => (
            <motion.div
              key={`${runIndex}-${i}`}
              initial={{ opacity: 0, x: -6 }}
              animate={i < visibleLines ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
              transition={{ duration: 0.2 }}
              className="flex gap-2 text-[#475569]"
            >
              <span className="text-[#22d3ee] shrink-0">▶</span>
              <span>{line}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
