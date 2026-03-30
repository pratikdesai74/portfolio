"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Download, Mail } from "lucide-react";
import { personalInfo, navItems } from "@/lib/data";
import { cn } from "@/lib/utils";
import { StreamingText } from "@/components/streaming-text";
import { RAGPipeline } from "@/components/rag-pipeline";

export function LeftPanel() {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.slice(1));
      let current = sections[0];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) current = section;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col lg:h-full lg:justify-between gap-10 lg:gap-0">
      {/* Identity */}
      <div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="font-mono text-[#22d3ee] text-xs mb-5 tracking-[0.18em] uppercase"
        >
          // he/him · founding_engineer
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold font-display text-[#e2e8f0] tracking-tight mb-3"
        >
          {personalInfo.name}
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-lg font-semibold text-[#94a3b8] mb-2 leading-snug"
        >
          Founding Senior Backend Engineer
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="text-sm text-[#475569] font-mono mb-5 leading-relaxed"
        >
          Platform Engineering · Distributed Systems<br />
          LLM, RAG & Multi-Agent Architecture
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-[#64748b] leading-relaxed max-w-xs text-sm"
        >
          <StreamingText
            text="Building high-scale event-driven platforms and AI-powered developer tools. Java · Spring Boot · Kafka at the core."
            speed={22}
            delay={800}
          />
        </motion.p>

        {/* Availability */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-5 inline-flex items-center gap-2"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]" />
          </span>
          <span className="text-xs font-mono text-[#22c55e]">Open to opportunities</span>
        </motion.div>

        {/* RAG Pipeline visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.2 }}
          className="mt-6"
        >
          <RAGPipeline />
        </motion.div>
      </div>

      {/* Desktop nav */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="hidden lg:flex flex-col gap-0.5"
        aria-label="Primary navigation"
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.href.slice(1);
          return (
            <a
              key={item.href}
              href={item.href}
              className="group flex items-center gap-4 py-2"
            >
              <span
                className={cn(
                  "h-px transition-all duration-300",
                  isActive
                    ? "w-14 bg-[#e2e8f0]"
                    : "w-8 bg-[#334155] group-hover:w-12 group-hover:bg-[#64748b]"
                )}
              />
              <span
                className={cn(
                  "text-xs font-mono tracking-widest uppercase transition-colors duration-200",
                  isActive ? "text-[#e2e8f0]" : "text-[#475569] group-hover:text-[#94a3b8]"
                )}
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </motion.nav>

      {/* CTAs + Social */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-wrap gap-3">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#22d3ee] text-[#0a0f1e] font-semibold text-sm hover:bg-[#67e8f9] transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            Get in Touch
          </a>
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#22d3ee]/30 text-[#22d3ee] font-semibold text-sm hover:bg-[#22d3ee]/10 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Resume
          </a>
        </div>

        <div className="flex items-center gap-5">
          <a
            href={personalInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[#475569] hover:text-[#22d3ee] transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={personalInfo.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[#475569] hover:text-[#22d3ee] transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href={personalInfo.social.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LeetCode"
            className="text-[#475569] hover:text-[#22d3ee] transition-colors text-xs font-bold font-mono"
          >
            LC
          </a>
          <a
            href={personalInfo.social.medium}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Medium"
            className="text-[#475569] hover:text-[#22d3ee] transition-colors text-xs font-bold font-mono"
          >
            M
          </a>
        </div>
      </motion.div>
    </div>
  );
}
