"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Code2,
  Server,
  Cloud,
  Database,
  MessageSquare,
  Wrench,
  Cpu,
} from "lucide-react";
import { skills } from "@/lib/data";

const categoryConfig: Record<
  string,
  { icon: React.ReactNode; color: string; glowClass: string }
> = {
  languages: {
    icon: <Code2 className="w-4 h-4" />,
    color: "text-[#22d3ee]",
    glowClass: "group-hover:bg-[#22d3ee]/5",
  },
  backend: {
    icon: <Server className="w-4 h-4" />,
    color: "text-[#6366f1]",
    glowClass: "group-hover:bg-[#6366f1]/5",
  },
  cloud: {
    icon: <Cloud className="w-4 h-4" />,
    color: "text-[#22c55e]",
    glowClass: "group-hover:bg-[#22c55e]/5",
  },
  databases: {
    icon: <Database className="w-4 h-4" />,
    color: "text-[#f59e0b]",
    glowClass: "group-hover:bg-[#f59e0b]/5",
  },
  messaging: {
    icon: <MessageSquare className="w-4 h-4" />,
    color: "text-[#ec4899]",
    glowClass: "group-hover:bg-[#ec4899]/5",
  },
  tools: {
    icon: <Wrench className="w-4 h-4" />,
    color: "text-[#94a3b8]",
    glowClass: "group-hover:bg-[#94a3b8]/5",
  },
};

export function Skills() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      ref={containerRef}
      className="py-16 md:py-24 border-b border-[#1e293b]/50"
    >
      {/* Section label */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
        className="font-mono text-[#22d3ee] text-xs tracking-widest uppercase mb-2"
      >
        // 04. skills
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="text-2xl md:text-3xl font-bold font-display text-[#e2e8f0] mb-8"
      >
        Technical <span className="gradient-text">Skills</span>
      </motion.h2>

      {/* Bento grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(skills).map(([key, category], index) => {
          const config = categoryConfig[key];
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.07 }}
              className={`group p-5 rounded-2xl bg-[#111827] border border-[#1e293b] hover:border-[#22d3ee]/20 transition-all duration-300 ${config.glowClass}`}
            >
              <div className="flex items-center gap-2.5 mb-4">
                <span className={config.color}>{config.icon}</span>
                <h3 className="text-sm font-semibold text-[#e2e8f0]">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {category.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-xs font-mono rounded-md bg-[#0a0f1e]/70 text-[#94a3b8] border border-[#1e293b] hover:border-[#22d3ee]/30 hover:text-[#e2e8f0] transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Currently building with */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.65 }}
        className="mt-5 p-5 rounded-2xl border border-[#22d3ee]/20 bg-[#22d3ee]/5"
      >
        <div className="flex items-center gap-2 mb-2">
          <Cpu className="w-4 h-4 text-[#22d3ee]" />
          <span className="text-sm font-semibold text-[#22d3ee]">Currently building with</span>
        </div>
        <p className="text-sm text-[#94a3b8] leading-relaxed">
          LLM APIs · RAG Pipelines · Multi-Agent Architecture · LangChain4j · Vector Databases · Platform Engineering · AI-powered Developer Tooling
        </p>
      </motion.div>
    </section>
  );
}
