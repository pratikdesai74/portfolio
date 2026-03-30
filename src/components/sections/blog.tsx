"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, BookOpen, Calendar } from "lucide-react";

const blogPosts = [
  {
    title: "Building Scalable Payment Systems with Event-Driven Architecture",
    description:
      "Lessons learned from designing high-throughput payment systems that process millions of transactions.",
    date: "2024",
    readTime: "8 min read",
    tags: ["System Design", "Kafka", "Payments"],
    link: "https://medium.com/@pratikvilasdesai",
  },
  {
    title: "From Monolith to Microservices: A Practical Migration Guide",
    description:
      "A step-by-step approach to migrating legacy systems to microservices without disrupting business operations.",
    date: "2024",
    readTime: "12 min read",
    tags: ["Microservices", "Architecture", "Best Practices"],
    link: "https://medium.com/@pratikvilasdesai",
  },
  {
    title: "RAG Systems: Building AI-Powered Document Intelligence",
    description:
      "How I built TalkToPDF — a RAG-based tool for natural language document querying using LangChain and vector databases.",
    date: "2024",
    readTime: "10 min read",
    tags: ["AI/ML", "LangChain", "RAG"],
    link: "https://medium.com/@pratikvilasdesai",
  },
];

export function Blog() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="blog"
      ref={containerRef}
      className="py-16 md:py-24 border-b border-[#1e293b]/50"
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
        className="font-mono text-[#22d3ee] text-xs tracking-widest uppercase mb-2"
      >
        // 06. writing
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="text-2xl md:text-3xl font-bold font-display text-[#e2e8f0] mb-8"
      >
        Writing & <span className="gradient-text">Thoughts</span>
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {blogPosts.map((post, index) => (
          <motion.article
            key={post.title}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1 + index * 0.07 }}
            className={index === 0 ? "sm:col-span-2" : ""}
          >
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block h-full p-5 rounded-2xl bg-[#111827] border border-[#1e293b] hover:border-[#22d3ee]/30 hover:shadow-lg hover:shadow-[#22d3ee]/5 transition-all duration-300 card-lift"
            >
              <div className="w-8 h-8 rounded-xl bg-[#22d3ee]/10 flex items-center justify-center mb-4 text-[#22d3ee] group-hover:bg-[#22d3ee]/20 transition-colors">
                <BookOpen className="w-4 h-4" />
              </div>

              <h3 className="font-semibold font-display text-[#e2e8f0] mb-2 group-hover:text-[#22d3ee] transition-colors line-clamp-2 text-base">
                {post.title}
              </h3>

              <p className="text-sm text-[#64748b] mb-4 line-clamp-2 leading-relaxed">
                {post.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs font-mono rounded-md bg-[#0a0f1e] text-[#64748b] border border-[#1e293b]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-[#475569] pt-3 border-t border-[#1e293b]">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1 text-[#22d3ee] opacity-0 group-hover:opacity-100 transition-opacity">
                  Read on Medium <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </a>
          </motion.article>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="mt-8"
      >
        <a
          href="https://medium.com/@pratikvilasdesai"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-mono text-[#475569] hover:text-[#22d3ee] transition-colors"
        >
          View all articles on Medium
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </motion.div>
    </section>
  );
}
