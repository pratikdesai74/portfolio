"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials, personalInfo } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 260 : -260, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (dir: number) => ({ zIndex: 0, x: dir < 0 ? 260 : -260, opacity: 0 }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = testimonials.length - 1;
      if (next >= testimonials.length) next = 0;
      return next;
    });
  };

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 8000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[currentIndex];

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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative"
      >
        <div className="relative overflow-hidden min-h-[280px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 280, damping: 28 },
                opacity: { duration: 0.18 },
              }}
              className="absolute inset-0"
            >
              <div className="h-full p-6 rounded-2xl bg-[#111827] border border-[#1e293b] relative">
                <div className="absolute top-5 right-5 text-[#22d3ee]/10">
                  <Quote className="w-10 h-10" />
                </div>

                <blockquote className="text-sm text-[#94a3b8] leading-relaxed mb-5 relative z-10">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#22d3ee] to-[#6366f1] flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {current.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="font-semibold text-[#e2e8f0] text-sm">{current.name}</div>
                    <div className="text-xs text-[#64748b]">
                      {current.role} · {current.company}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between mt-5">
          <div className="flex items-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={cn(
                  "rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "w-5 h-1.5 bg-[#22d3ee]"
                    : "w-1.5 h-1.5 bg-[#1e293b] hover:bg-[#22d3ee]/40"
                )}
                aria-label={`Testimonial ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => paginate(-1)}
              className="p-2 rounded-full bg-[#111827] border border-[#1e293b] text-[#64748b] hover:text-[#22d3ee] hover:border-[#22d3ee]/30 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="p-2 rounded-full bg-[#111827] border border-[#1e293b] text-[#64748b] hover:text-[#22d3ee] hover:border-[#22d3ee]/30 transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="mt-6"
      >
        <a
          href={personalInfo.social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-[#475569] hover:text-[#22d3ee] transition-colors"
        >
          View all recommendations on LinkedIn →
        </a>
      </motion.div>
    </section>
  );
}
