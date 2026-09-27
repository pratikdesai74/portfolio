"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, BookOpen, Calendar, Clock } from "lucide-react";

// Back to First Principles — a 10-part series on AI from the ground up.
const blogPosts = [
  {
    title: "RAG: How Agents Stop Making Things Up",
    description:
      "LLMs hallucinate facts they were never trained on. RAG turns a closed-book exam into an open-book one — chunk documents on semantic boundaries, embed them, retrieve by meaning, and inject the right passages into context before the model ever answers.",
    date: "Sep 2026",
    readTime: "7 min read",
    tags: ["RAG", "Vector Databases", "Embeddings"],
    link: "https://www.linkedin.com/pulse/rag-how-agents-stop-making-things-up-pratik-desai-loyef",
    type: "article",
    series: "Back to First Principles · Part 7",
  },
  {
    title: "Tool Engineering: The Agent Never Sees Your Code",
    description:
      "The LLM reads a schema, not your function body — so an imprecise tool description silently corrupts multi-step agent workflows. Covers function calling mechanics, tool selection, parallel execution, and MCP as the emerging standard for wiring agents to tools.",
    date: "Aug 2026",
    readTime: "8 min read",
    tags: ["MCP", "Function Calling", "Backend Engineering"],
    link: "https://www.linkedin.com/pulse/tool-engineering-agent-never-sees-your-code-pratik-desai-3pkgf",
    type: "article",
    series: "Back to First Principles · Part 6",
  },
  {
    title: "What Is an AI Agent — And Why Does It Feel Like Backend Engineering?",
    description:
      "Agents differ from chatbots by completing goals through multi-step reasoning and tool use, not single answers. Building one is system design, not prompt engineering: the ReAct loop, LangChain vs. LangGraph, and where prompt engineering actually fits in.",
    date: "Jul 2026",
    readTime: "7 min read",
    tags: ["ReAct", "LangGraph", "Agent Architecture"],
    link: "https://www.linkedin.com/pulse/what-ai-agent-why-does-feel-like-backend-engineering-pratik-desai-htkaf",
    type: "article",
    series: "Back to First Principles · Part 5",
  },
  {
    title: "The LLM Is Brilliant. And Completely Helpless.",
    description:
      "Every LLM hits three walls: a knowledge cutoff, a context window, and no ability to act in the world. Here's exactly why — and how agents were built to close the gap.",
    date: "Jul 2026",
    readTime: "8 min read",
    tags: ["LLM", "Agentic AI", "System Design"],
    link: "https://www.linkedin.com/pulse/llm-brilliant-completely-helpless-heres-why-pratik-desai-1f1wf",
    type: "article",
    series: "Back to First Principles · Part 4",
  },
  {
    title: "ChatGPT Isn't Thinking. It's Predicting.",
    description:
      "How LLMs actually generate text — one token at a time. Covers tokenisation, BPE, the autoregressive loop, softmax, temperature, and why 'आप कैसे हो?' costs 4× more tokens than 'How are you?'",
    date: "Jul 2026",
    readTime: "10 min read",
    tags: ["LLM", "Tokenization", "Machine Learning"],
    link: "https://www.linkedin.com/pulse/chatgpt-isnt-thinking-its-predicting-heres-exactly-how-pratik-desai-jo4pf",
    type: "article",
    series: "Back to First Principles · Part 3",
  },
  {
    title: "What Does It Actually Mean for a Machine to Learn?",
    description:
      "Nobody teaches a machine the rule. You show it examples and it figures the rule out. Here's what's happening inside a neural network — no jargon, just the actual mechanics.",
    date: "Jul 2026",
    readTime: "5 min read",
    tags: ["Neural Networks", "Machine Learning", "AI Fundamentals"],
    link: "https://www.linkedin.com/posts/pratikvdesai_machinelearning-neuralnetworks-buildinpublic-share-7479114327057293312-dg85/",
    type: "post",
    series: "Back to First Principles · Part 2",
  },
  {
    title: "Why We Can't Always Solve Problems With Rules",
    description:
      "7 years of writing backend code taught me to break problems into logic. Then I hit fraud detection — and realised some problems refuse to stay still. That's what pulled me into AI.",
    date: "Jul 2026",
    readTime: "4 min read",
    tags: ["AI Fundamentals", "Backend Engineering", "Build in Public"],
    link: "https://www.linkedin.com/posts/pratikvdesai_artificialintelligence-machinelearning-softwareengineering-share-7477790230863843328-qEva/",
    type: "post",
    series: "Back to First Principles · Part 1",
  },
];

type Post = (typeof blogPosts)[number];

function CardInner({ post, linked }: { post: Post; linked: boolean }) {
  return (
    <>
      <div className="flex items-start justify-between mb-3">
        <div className="w-8 h-8 rounded-xl bg-[#22d3ee]/10 flex items-center justify-center text-[#22d3ee] group-hover:bg-[#22d3ee]/20 transition-colors">
          <BookOpen className="w-4 h-4" />
        </div>
        <div className="flex items-center gap-1.5">
          {post.type === "article" && (
            <span className="px-2 py-0.5 text-[10px] font-mono rounded-full bg-[#22d3ee]/10 text-[#22d3ee] border border-[#22d3ee]/20">
              Article
            </span>
          )}
          {post.type === "post" && (
            <span className="px-2 py-0.5 text-[10px] font-mono rounded-full bg-[#475569]/20 text-[#6b7d9b] border border-[#475569]/20">
              Post
            </span>
          )}
          <span className="px-2 py-0.5 text-[10px] font-mono rounded-full bg-[#6366f1]/10 text-[#818cf8] border border-[#6366f1]/20">
            {post.series}
          </span>
        </div>
      </div>

      <h3 className="font-semibold font-display text-[#e2e8f0] mb-2 group-hover:text-[#22d3ee] transition-colors line-clamp-2 text-base">
        {post.title}
      </h3>

      <p className="text-sm text-[#6b7d9b] mb-4 line-clamp-3 leading-relaxed">
        {post.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-xs font-mono rounded-md bg-[#0a0f1e] text-[#6b7d9b] border border-[#1e293b]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between text-xs font-mono text-[#738094] pt-3 border-t border-[#1e293b]">
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {post.date}
        </span>
        {linked ? (
          <span className="flex items-center gap-1 text-[#22d3ee] opacity-0 group-hover:opacity-100 transition-opacity">
            {post.type === "article" ? "Read article" : "View post"}
            <ArrowUpRight className="w-3 h-3" />
          </span>
        ) : (
          <span className="flex items-center gap-1 text-[#fbbf24]">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </span>
        )}
      </div>
    </>
  );
}

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
            {post.link ? (
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full p-5 rounded-2xl bg-[#111827] border border-[#1e293b] hover:border-[#22d3ee]/30 hover:shadow-lg hover:shadow-[#22d3ee]/5 transition-all duration-300 card-lift"
              >
                <CardInner post={post} linked />
              </a>
            ) : (
              <div className="group block h-full p-5 rounded-2xl bg-[#111827] border border-[#1e293b]">
                <CardInner post={post} linked={false} />
              </div>
            )}
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
          href="https://www.linkedin.com/in/pratikdesai99/recent-activity/articles/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-mono text-[#738094] hover:text-[#22d3ee] transition-colors"
        >
          View all articles on LinkedIn
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </motion.div>
    </section>
  );
}
