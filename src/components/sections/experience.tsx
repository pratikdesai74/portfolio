"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown, Building2, Calendar, MapPin } from "lucide-react";
import { experiences } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Experience() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [expandedId, setExpandedId] = useState<number | null>(1);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="py-24 md:py-32 px-6 bg-[#0c0c12]"
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
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-[#a1a1aa] max-w-2xl mx-auto">
            7+ years of building scalable systems across fintech, payments, and
            cybersecurity.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#3b82f6] via-[#8b5cf6] to-transparent md:-translate-x-px" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={cn(
                  "relative",
                  index % 2 === 0 ? "md:pr-[50%] md:text-right" : "md:pl-[50%]"
                )}
              >
                {/* Timeline dot */}
                <div
                  className={cn(
                    "absolute top-0 w-4 h-4 rounded-full border-4 border-[#3b82f6] bg-[#0a0a0f]",
                    index % 2 === 0
                      ? "left-[-8px] md:left-auto md:right-[calc(50%-8px)]"
                      : "left-[-8px] md:left-[calc(50%-8px)]"
                  )}
                />

                {/* Card */}
                <div
                  className={cn(
                    "ml-8 md:ml-0",
                    index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                  )}
                >
                  <div
                    className="p-6 rounded-2xl bg-[#12121a] border border-[#1e1e2e] hover:border-[#3b82f6]/30 transition-all duration-300 cursor-pointer"
                    onClick={() =>
                      setExpandedId(expandedId === exp.id ? null : exp.id)
                    }
                  >
                    {/* Header */}
                    <div
                      className={cn(
                        "flex items-start justify-between gap-4",
                        index % 2 === 0 ? "md:flex-row-reverse" : ""
                      )}
                    >
                      <div
                        className={cn(
                          index % 2 === 0 ? "md:text-right" : ""
                        )}
                      >
                        <h3 className="text-xl font-semibold text-white">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2 mt-1 text-[#3b82f6]">
                          <Building2 className="w-4 h-4" />
                          <span className="font-medium">{exp.company}</span>
                        </div>
                        <p className="text-sm text-[#71717a] mt-1">
                          {exp.companyDescription}
                        </p>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedId === exp.id ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="p-2 rounded-full bg-[#1e1e2e] shrink-0"
                      >
                        <ChevronDown className="w-4 h-4 text-[#a1a1aa]" />
                      </motion.div>
                    </div>

                    {/* Meta */}
                    <div
                      className={cn(
                        "flex flex-wrap gap-4 mt-3 text-sm text-[#71717a]",
                        index % 2 === 0 ? "md:justify-end" : ""
                      )}
                    >
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {exp.location}
                      </span>
                    </div>

                    {/* Expandable Content */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: expandedId === exp.id ? "auto" : 0,
                        opacity: expandedId === exp.id ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 mt-4 border-t border-[#1e1e2e]">
                        {/* Highlights */}
                        <ul
                          className={cn(
                            "space-y-2",
                            index % 2 === 0 ? "md:text-right" : ""
                          )}
                        >
                          {exp.highlights.map((highlight, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-[#a1a1aa]"
                            >
                              <span className="text-[#3b82f6] shrink-0 mt-1">
                                {index % 2 === 0 ? "" : "▹"}
                              </span>
                              <span>{highlight}</span>
                              <span className="text-[#3b82f6] shrink-0 mt-1">
                                {index % 2 === 0 ? "◃" : ""}
                              </span>
                            </li>
                          ))}
                        </ul>

                        {/* Tech Stack */}
                        <div
                          className={cn(
                            "flex flex-wrap gap-2 mt-4",
                            index % 2 === 0 ? "md:justify-end" : ""
                          )}
                        >
                          {exp.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 text-xs font-medium rounded-full bg-[#3b82f6]/10 text-[#60a5fa] border border-[#3b82f6]/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
