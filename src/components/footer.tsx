"use client";

import { motion } from "framer-motion";
import { Heart, Github, Linkedin } from "lucide-react";
import { personalInfo } from "@/lib/data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 border-t border-[#1e1e2e]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#71717a] text-sm text-center md:text-left"
          >
            <p>
              &copy; {currentYear} {personalInfo.name}. All rights reserved.
            </p>
            <p className="flex items-center justify-center md:justify-start gap-1 mt-1">
              Built with{" "}
              <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" />{" "}
              using Next.js & Framer Motion
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            <a
              href={personalInfo.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#71717a] hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={personalInfo.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#71717a] hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={personalInfo.social.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#71717a] hover:text-white transition-colors text-sm font-bold"
              aria-label="LeetCode"
            >
              LC
            </a>
            <a
              href={personalInfo.social.medium}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#71717a] hover:text-white transition-colors text-sm font-bold"
              aria-label="Medium"
            >
              M
            </a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
