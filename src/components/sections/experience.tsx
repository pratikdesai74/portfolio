"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { experiences } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Experience() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState(0);

  const exp = experiences[activeTab];

  return (
    <section
      id="experience"
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
        // 02. experience
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="text-2xl md:text-3xl font-bold font-display text-[#e2e8f0] mb-8"
      >
        Work <span className="gradient-text">Experience</span>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="flex flex-col sm:flex-row gap-0"
      >
        {/* Company tabs */}
        <div
          className="flex sm:flex-col overflow-x-auto sm:overflow-x-visible border-b sm:border-b-0 sm:border-l border-[#1e293b] shrink-0"
          role="tablist"
          aria-label="Companies"
        >
          {experiences.map((e, index) => (
            <button
              key={e.id}
              role="tab"
              aria-selected={activeTab === index}
              onClick={() => setActiveTab(index)}
              className={cn(
                "px-4 py-3 text-left text-sm font-mono whitespace-nowrap transition-all duration-200",
                "border-b-2 sm:border-b-0 sm:border-l-2 -mb-px sm:-mb-0 sm:-ml-px",
                activeTab === index
                  ? "border-[#22d3ee] text-[#22d3ee] bg-[#22d3ee]/5"
                  : "border-transparent text-[#64748b] hover:text-[#94a3b8] hover:bg-[#111827]/60"
              )}
            >
              {e.company}
            </button>
          ))}
        </div>

        {/* Job details */}
        <div className="pt-6 sm:pt-0 sm:pl-8 flex-1 min-h-[360px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              role="tabpanel"
            >
              <h3 className="text-lg font-semibold font-display text-[#e2e8f0] mb-0.5">
                {exp.role}
              </h3>
              <p className="text-sm mb-0.5">
                <span className="text-[#22d3ee] font-medium">{exp.company}</span>
                <span className="text-[#475569]"> · {exp.companyDescription}</span>
              </p>
              <p className="font-mono text-xs text-[#475569] mb-5">
                {exp.period} · {exp.location}
              </p>

              <ul className="space-y-2.5 mb-6">
                {exp.highlights.map((highlight, i) => (
                  <li key={i} className="flex gap-3 text-sm text-[#94a3b8]">
                    <span className="text-[#22d3ee] shrink-0 mt-0.5 select-none">▹</span>
                    <span className="leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-xs font-mono rounded-md bg-[#22d3ee]/8 text-[#22d3ee] border border-[#22d3ee]/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
