"use client";

import { motion } from "framer-motion";

const nodes = [
  { id: "query", label: "Query", sublabel: "input", color: "#22d3ee" },
  { id: "embed", label: "Embed", sublabel: "vectors", color: "#6366f1" },
  { id: "vdb", label: "VDB", sublabel: "search", color: "#8b5cf6" },
  { id: "llm", label: "LLM", sublabel: "claude", color: "#f59e0b" },
  { id: "out", label: "Output", sublabel: "response", color: "#22c55e" },
];

export function RAGPipeline() {
  return (
    <div className="font-mono">
      <p className="text-[#22d3ee] mb-3 text-[10px] tracking-widest uppercase opacity-60">
        // rag_pipeline · active
      </p>
      <div className="flex items-center overflow-x-auto pb-1">
        {nodes.map((node, i) => (
          <div key={node.id} className="flex items-center">
            {/* Node */}
            <div className="flex flex-col items-center gap-1 shrink-0">
              <div
                className="w-11 h-11 rounded-xl border flex items-center justify-center text-[10px] font-bold"
                style={{
                  borderColor: `${node.color}40`,
                  backgroundColor: `${node.color}0d`,
                  color: node.color,
                }}
              >
                {node.label}
              </div>
              <span className="text-[9px] text-[#334155]">{node.sublabel}</span>
            </div>

            {/* Connector with traveling dot */}
            {i < nodes.length - 1 && (
              <div className="relative mx-1 shrink-0" style={{ width: 24, height: 12 }}>
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-full h-px"
                  style={{ backgroundColor: "#1e293b" }}
                />
                <motion.div
                  className="absolute top-1/2 rounded-full"
                  style={{
                    width: 5,
                    height: 5,
                    marginTop: -2.5,
                    backgroundColor: node.color,
                    boxShadow: `0 0 6px ${node.color}`,
                  }}
                  animate={{ left: [0, 19] }}
                  transition={{
                    duration: 0.7,
                    repeat: Infinity,
                    repeatDelay: 1.8,
                    delay: i * 0.35,
                    ease: "easeInOut",
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
