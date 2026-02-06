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
} from "lucide-react";
import { skills } from "@/lib/data";

const categoryIcons: Record<string, React.ReactNode> = {
  languages: <Code2 className="w-5 h-5" />,
  backend: <Server className="w-5 h-5" />,
  cloud: <Cloud className="w-5 h-5" />,
  databases: <Database className="w-5 h-5" />,
  messaging: <MessageSquare className="w-5 h-5" />,
  tools: <Wrench className="w-5 h-5" />,
};

const categoryColors: Record<string, string> = {
  languages: "from-[#3b82f6] to-[#60a5fa]",
  backend: "from-[#8b5cf6] to-[#a78bfa]",
  cloud: "from-[#22c55e] to-[#4ade80]",
  databases: "from-[#f59e0b] to-[#fbbf24]",
  messaging: "from-[#ec4899] to-[#f472b6]",
  tools: "from-[#06b6d4] to-[#22d3ee]",
};

export function Skills() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      ref={containerRef}
      className="py-24 md:py-32 px-6 bg-[#0c0c12]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-[#a1a1aa] max-w-2xl mx-auto">
            Technologies and tools I use to build scalable, reliable systems.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skills).map(([key, category], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 rounded-2xl bg-[#12121a] border border-[#1e1e2e] hover:border-[#3b82f6]/30 transition-all duration-300"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`p-2.5 rounded-xl bg-gradient-to-br ${categoryColors[key]} text-white`}
                >
                  {categoryIcons[key]}
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {category.title}
                </h3>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1 + skillIndex * 0.05,
                    }}
                    className="px-3 py-1.5 text-sm font-medium rounded-lg bg-[#1e1e2e] text-[#a1a1aa] hover:text-white hover:bg-[#2e2e3e] transition-colors cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#3b82f6]/10 to-[#8b5cf6]/10 border border-[#3b82f6]/20 text-center"
        >
          <p className="text-[#a1a1aa]">
            Constantly learning and exploring new technologies.{" "}
            <span className="text-[#3b82f6]">Currently diving into:</span>{" "}
            <span className="text-white font-medium">
              AI/ML, LLMs, RAG Systems, and Distributed Computing at Scale
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
