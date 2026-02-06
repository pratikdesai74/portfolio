"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, BookOpen, Calendar } from "lucide-react";

const blogPosts = [
  {
    title: "Building Scalable Payment Systems with Event-Driven Architecture",
    description:
      "Lessons learned from designing and implementing high-throughput payment systems that process millions of transactions.",
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
      "How I built TalkToPDF - a RAG-based tool for natural language document querying using LangChain and vector databases.",
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
            Writing & <span className="gradient-text">Thoughts</span>
          </h2>
          <p className="text-[#a1a1aa] max-w-2xl mx-auto">
            Sharing insights on system design, distributed systems, and lessons
            learned building at scale.
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full p-6 rounded-2xl bg-[#12121a] border border-[#1e1e2e] hover:border-[#3b82f6]/30 transition-all duration-300 card-lift"
              >
                {/* Icon */}
                <div className="w-10 h-10 rounded-xl bg-[#3b82f6]/10 flex items-center justify-center mb-4 text-[#3b82f6] group-hover:bg-[#3b82f6]/20 transition-colors">
                  <BookOpen className="w-5 h-5" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#3b82f6] transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#71717a] mb-4 line-clamp-2">
                  {post.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-xs font-medium rounded-full bg-[#1e1e2e] text-[#a1a1aa]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-[#71717a] pt-4 border-t border-[#1e1e2e]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                  <span>{post.readTime}</span>
                </div>

                {/* Read More indicator */}
                <div className="flex items-center gap-1 mt-4 text-sm text-[#3b82f6] opacity-0 group-hover:opacity-100 transition-opacity">
                  Read on Medium
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </a>
            </motion.article>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="https://medium.com/@pratikvilasdesai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#3b82f6] text-[#3b82f6] hover:bg-[#3b82f6]/10 transition-colors font-medium"
          >
            View all articles on Medium
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
