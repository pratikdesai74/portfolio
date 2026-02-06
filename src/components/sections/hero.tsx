"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import { personalInfo } from "@/lib/data";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-[#3b82f6]/5 blur-3xl"
        />
        <motion.div
          animate={{
            y: [0, 20, 0],
            x: [0, -10, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full bg-[#8b5cf6]/5 blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[#a1a1aa] text-lg mb-4 font-mono"
        >
          Hi, my name is
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4"
        >
          <span className="gradient-text">{personalInfo.name}</span>
        </motion.h1>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-2xl md:text-3xl lg:text-4xl font-semibold text-[#a1a1aa] mb-6"
        >
          {personalInfo.title}
        </motion.h2>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg md:text-xl text-[#71717a] max-w-2xl mx-auto mb-8"
        >
          {personalInfo.tagline}
        </motion.p>

        {/* Tech badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {["Fintech", "Payments", "Cybersecurity", "Distributed Systems"].map(
            (tag, index) => (
              <span
                key={tag}
                className="px-4 py-1.5 text-sm font-medium rounded-full bg-[#12121a] border border-[#1e1e2e] text-[#a1a1aa]"
              >
                {tag}
              </span>
            )
          )}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <a
            href="#contact"
            className="group relative px-8 py-3 rounded-full font-medium overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#3b82f6]/20"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6]" />
            <span className="absolute inset-0 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
            <span className="relative flex items-center gap-2 text-white">
              <Mail className="w-4 h-4" />
              Get In Touch
            </span>
          </a>
          <a
            href="/resume.pdf"
            download
            className="group px-8 py-3 rounded-full font-medium border border-[#3b82f6] text-[#3b82f6] hover:bg-[#3b82f6]/10 transition-all duration-300 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download Resume
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex items-center justify-center gap-4"
        >
          {[
            { icon: Github, href: personalInfo.social.github, label: "GitHub" },
            {
              icon: Linkedin,
              href: personalInfo.social.linkedin,
              label: "LinkedIn",
            },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-[#12121a] border border-[#1e1e2e] text-[#a1a1aa] hover:text-[#3b82f6] hover:border-[#3b82f6]/50 transition-all duration-300"
              aria-label={label}
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
          <a
            href={personalInfo.social.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-[#12121a] border border-[#1e1e2e] text-[#a1a1aa] hover:text-[#3b82f6] hover:border-[#3b82f6]/50 transition-all duration-300"
            aria-label="LeetCode"
          >
            <span className="text-sm font-bold">LC</span>
          </a>
          <a
            href={personalInfo.social.medium}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-[#12121a] border border-[#1e1e2e] text-[#a1a1aa] hover:text-[#3b82f6] hover:border-[#3b82f6]/50 transition-all duration-300"
            aria-label="Medium"
          >
            <span className="text-sm font-bold">M</span>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-[#71717a] hover:text-[#a1a1aa] transition-colors"
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
