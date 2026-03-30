"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="projects"
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
        // 03. projects
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="text-2xl md:text-3xl font-bold font-display text-[#e2e8f0] mb-8"
      >
        Featured <span className="gradient-text">Projects</span>
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 + index * 0.07 }}
            className={cn(
              "group",
              project.featured && index === 0 ? "sm:col-span-2" : ""
            )}
          >
            <div className="relative h-full p-5 rounded-2xl bg-[#111827] border border-[#1e293b] hover:border-[#22d3ee]/30 hover:shadow-lg hover:shadow-[#22d3ee]/5 transition-all duration-300 card-lift">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="font-semibold font-display text-[#e2e8f0] group-hover:text-[#22d3ee] transition-colors">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className="inline-block mt-1.5 px-2 py-0.5 text-xs font-mono rounded-full bg-[#22d3ee]/10 text-[#22d3ee] border border-[#22d3ee]/20">
                      featured
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-lg text-[#475569] hover:text-[#22d3ee] hover:bg-[#22d3ee]/10 transition-colors z-10 relative"
                      aria-label="GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {(project.demo || project.link) && (
                    <a
                      href={project.demo || project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-lg text-[#475569] hover:text-[#22d3ee] hover:bg-[#22d3ee]/10 transition-colors z-10 relative"
                      aria-label="Live demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-[#64748b] text-sm leading-relaxed mb-4 line-clamp-3">
                {project.longDescription}
              </p>

              {/* Metrics */}
              {project.metrics && (
                <div className="flex flex-wrap gap-5 mb-4">
                  {project.metrics.map((metric) => (
                    <div key={metric.label}>
                      <div className="text-base font-bold font-display gradient-text">{metric.value}</div>
                      <div className="text-xs text-[#475569]">{metric.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tech stack */}
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#1e293b]">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-xs font-mono rounded-md bg-[#0a0f1e] text-[#64748b] border border-[#1e293b]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Full-card invisible link */}
              {(project.demo || project.link || project.github) && (
                <a
                  href={project.demo || project.link || project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 rounded-2xl"
                  aria-label={`View ${project.title}`}
                  tabIndex={-1}
                >
                  <span className="sr-only">View project</span>
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="mt-8"
      >
        <a
          href="https://github.com/pratikdesai74"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-mono text-[#475569] hover:text-[#22d3ee] transition-colors"
        >
          View more on GitHub
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </motion.div>
    </section>
  );
}
