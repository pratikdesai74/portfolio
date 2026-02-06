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
    <section id="projects" ref={containerRef} className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-[#a1a1aa] max-w-2xl mx-auto">
            A selection of projects that showcase my expertise in building
            scalable, production-ready systems.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "group relative",
                project.featured && index === 0 ? "md:col-span-2 md:row-span-1" : ""
              )}
            >
              <div className="h-full p-6 rounded-2xl bg-[#12121a] border border-[#1e1e2e] hover:border-[#3b82f6]/30 transition-all duration-300 card-lift">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-[#3b82f6] transition-colors">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="inline-block mt-2 px-2 py-0.5 text-xs font-medium rounded-full bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-[#1e1e2e] text-[#a1a1aa] hover:text-white hover:bg-[#2e2e3e] transition-colors"
                        aria-label="View on GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {(project.demo || project.link) && (
                      <a
                        href={project.demo || project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-[#1e1e2e] text-[#a1a1aa] hover:text-white hover:bg-[#2e2e3e] transition-colors"
                        aria-label="View live demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-[#a1a1aa] text-sm mb-4 line-clamp-3">
                  {project.longDescription}
                </p>

                {/* Metrics */}
                {project.metrics && (
                  <div className="flex flex-wrap gap-4 mb-4">
                    {project.metrics.map((metric) => (
                      <div key={metric.label} className="text-center">
                        <div className="text-lg font-bold gradient-text">
                          {metric.value}
                        </div>
                        <div className="text-xs text-[#71717a]">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-[#1e1e2e]">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs font-medium rounded-full bg-[#1e1e2e] text-[#a1a1aa]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Hover overlay link */}
                {(project.demo || project.link || project.github) && (
                  <a
                    href={project.demo || project.link || project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-10"
                    aria-label={`View ${project.title}`}
                  >
                    <span className="sr-only">View project</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/pratikdesai74"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#3b82f6] hover:text-[#60a5fa] transition-colors font-medium"
          >
            View more on GitHub
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
