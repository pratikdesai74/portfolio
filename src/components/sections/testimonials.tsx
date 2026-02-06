"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
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

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section
      id="testimonials"
      ref={containerRef}
      className="py-24 md:py-32 px-6"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What People <span className="gradient-text">Say</span>
          </h2>
          <p className="text-[#a1a1aa] max-w-2xl mx-auto">
            Recommendations from colleagues and leaders I&apos;ve had the privilege
            to work with.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          {/* Main Testimonial Card */}
          <div className="relative overflow-hidden min-h-[320px] md:min-h-[280px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute inset-0"
              >
                <div className="h-full p-8 rounded-2xl bg-[#12121a] border border-[#1e1e2e] relative">
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 text-[#3b82f6]/20">
                    <Quote className="w-12 h-12" />
                  </div>

                  {/* Quote Text */}
                  <blockquote className="text-lg md:text-xl text-[#a1a1aa] leading-relaxed mb-6 relative z-10">
                    &ldquo;{currentTestimonial.quote}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center text-white font-bold text-lg">
                      {currentTestimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="font-semibold text-white">
                        {currentTestimonial.name}
                      </div>
                      <div className="text-sm text-[#71717a]">
                        {currentTestimonial.role} at {currentTestimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => paginate(-1)}
              className="p-2 rounded-full bg-[#12121a] border border-[#1e1e2e] text-[#a1a1aa] hover:text-white hover:border-[#3b82f6]/30 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    index === currentIndex
                      ? "w-6 bg-[#3b82f6]"
                      : "bg-[#1e1e2e] hover:bg-[#3b82f6]/50"
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => paginate(1)}
              className="p-2 rounded-full bg-[#12121a] border border-[#1e1e2e] text-[#a1a1aa] hover:text-white hover:border-[#3b82f6]/30 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* LinkedIn CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-8"
        >
          <a
            href="https://www.linkedin.com/in/pratikvilasdesai/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#71717a] hover:text-[#3b82f6] transition-colors"
          >
            View all recommendations on LinkedIn →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
