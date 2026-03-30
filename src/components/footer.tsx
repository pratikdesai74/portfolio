"use client";

import { motion } from "framer-motion";
import { Heart, Github, Linkedin } from "lucide-react";
import { personalInfo } from "@/lib/data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 px-6 md:px-10 lg:px-16 border-t border-[#1e293b]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center md:text-left"
        >
          <p className="text-xs font-mono text-[#475569]">
            &copy; {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          <p className="flex items-center justify-center md:justify-start gap-1 mt-1 text-xs font-mono text-[#334155]">
            Built with <Heart className="w-3 h-3 text-red-500/60 fill-red-500/60" /> using Next.js & Framer Motion
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-5"
        >
          <a
            href={personalInfo.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-[#475569] hover:text-[#22d3ee] transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={personalInfo.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-[#475569] hover:text-[#22d3ee] transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={personalInfo.social.medium}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Medium"
            className="text-xs font-bold font-mono text-[#475569] hover:text-[#22d3ee] transition-colors"
          >
            M
          </a>
        </motion.div>
      </div>
    </footer>
  );
}
