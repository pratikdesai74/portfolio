"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote, ExternalLink } from "lucide-react";
import { testimonials, personalInfo } from "@/lib/data";

// Show the 3 most impactful testimonials prominently, rest accessible via LinkedIn
const FEATURED = testimonials.slice(0, 3);   // Hiren, Manas (CTO), Jatin

export function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  return (
    <section
      id="testimonials"
      ref={containerRef}
      className="py-16 md:py-24 border-b border-[#1e293b]/50"
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
        className="font-mono text-[#22d3ee] text-xs tracking-widest uppercase mb-2"
      >
        // 05. testimonials
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="text-2xl md:text-3xl font-bold font-display text-[#e2e8f0] mb-2"
      >
        What People <span className="gradient-text">Say</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-sm text-[#64748b] mb-8"
      >
        Recommendations from colleagues and leaders I&apos;ve had the privilege to work with.
      </motion.p>

      {/* Grid: featured full-width (CTO) + 2 side-by-side below */}
      <div className="space-y-4">
        {/* Featured — CTO testimonial (index 1, Manas Mallik) full width */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="p-6 rounded-2xl bg-[#111827] border border-[#22d3ee]/15 relative"
        >
          <div className="absolute top-5 right-5 text-[#22d3ee]/8">
            <Quote className="w-12 h-12" />
          </div>
          <blockquote className="text-sm text-[#94a3b8] leading-relaxed mb-5 relative z-10 max-w-2xl">
            &ldquo;{FEATURED[1].quote}&rdquo;
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#22d3ee] to-[#6366f1] flex items-center justify-center text-white font-bold text-sm shrink-0">
              {FEATURED[1].name.split(" ").map(n => n[0]).join("")}
            </div>
            <div>
              <div className="font-semibold text-[#e2e8f0] text-sm">{FEATURED[1].name}</div>
              <div className="text-xs text-[#64748b]">
                {FEATURED[1].role} · {FEATURED[1].company}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Two side-by-side */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[FEATURED[0], FEATURED[2]].map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.25 + i * 0.08 }}
              className="p-5 rounded-2xl bg-[#111827] border border-[#1e293b] relative"
            >
              <div className="absolute top-4 right-4 text-[#22d3ee]/6">
                <Quote className="w-8 h-8" />
              </div>
              <blockquote className="text-xs text-[#94a3b8] leading-relaxed mb-4 relative z-10 line-clamp-5">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white font-bold text-xs shrink-0">
                  {t.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <div className="font-semibold text-[#e2e8f0] text-xs">{t.name}</div>
                  <div className="text-[10px] text-[#64748b]">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="mt-6 flex items-center gap-4"
      >
        <a
          href={personalInfo.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#475569] hover:text-[#22d3ee] transition-colors"
        >
          View all {testimonials.length} recommendations on LinkedIn
          <ExternalLink className="w-3 h-3" />
        </a>
      </motion.div>
    </section>
  );
}
