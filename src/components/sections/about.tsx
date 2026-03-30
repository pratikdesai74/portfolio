"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { MapPin, Award, TrendingUp, Medal, Guitar, Lightbulb } from "lucide-react";
import { personalInfo, stats } from "@/lib/data";
import { AgentTrace } from "@/components/agent-trace";

const journeyMilestones = [
  {
    year: "2014",
    title: "Mechanical Engineering Graduate",
    description: "B.Tech from Shivaji University — non-tech to tech journey begins",
  },
  {
    year: "2019",
    title: "Tech Transition · AIR 34",
    description: "CDAC ACTS Pune — pivoted into software engineering",
  },
  {
    year: "2019–21",
    title: "First Tech Role",
    description: "Volante Technologies — IBS Intelligence Award for VolPay",
  },
  {
    year: "2021–24",
    title: "Founding Engineer",
    description: "TartanHQ — built Perks from day zero, 30K+ users, $66K/mo",
  },
  {
    year: "2024–25",
    title: "Enterprise Scale",
    description: "Mastercard — contactless payments, 10M+ users across Africa",
  },
  {
    year: "2026",
    title: "Present",
    description: "Securonix — scaling SIEM platform to 2M+ TPS",
  },
];

export function About() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
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
        // 01. about
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="text-2xl md:text-3xl font-bold font-display text-[#e2e8f0] mb-8"
      >
        About <span className="gradient-text">Me</span>
      </motion.h2>

      {/* Photo + quick info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex items-center gap-5 mb-8"
      >
        <div className="relative shrink-0">
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#1e293b] relative">
            <Image
              src="/pratik-photo.jpg"
              alt="Pratik Desai"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 rounded-full border border-[#22d3ee]/20 scale-110" />
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="flex items-center gap-1.5 text-sm text-[#94a3b8]">
            <MapPin className="w-3.5 h-3.5 text-[#22d3ee]" />
            {personalInfo.location}
          </span>
          <span className="flex items-center gap-1.5 text-sm text-[#94a3b8]">
            <Award className="w-3.5 h-3.5 text-[#22d3ee]" />
            IBS Intelligence Award Winner
          </span>
          <span className="font-mono text-xs text-[#475569]">7+ yrs · distributed systems & AI platforms</span>
        </div>
      </motion.div>

      {/* Story */}
      <div className="space-y-4 mb-10">
        {personalInfo.about.split("\n\n").map((paragraph, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.15 + index * 0.04 }}
            className="text-[#94a3b8] leading-relaxed text-sm"
          >
            {paragraph}
          </motion.p>
        ))}
      </div>

      {/* Stats bento */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.45 }}
        className="grid grid-cols-2 gap-3 mb-10"
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-4 rounded-xl bg-[#111827] border border-[#1e293b] hover:border-[#22d3ee]/20 transition-colors"
          >
            <div className="text-2xl font-bold font-display gradient-text">{stat.value}</div>
            <div className="text-xs text-[#64748b] mt-1">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Journey timeline */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.55 }}
        className="mb-10"
      >
        <h3 className="flex items-center gap-2 text-sm font-semibold text-[#e2e8f0] mb-5">
          <TrendingUp className="w-4 h-4 text-[#22d3ee]" />
          My Journey
        </h3>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#22d3ee] via-[#6366f1] to-[#22d3ee]/10" />
          <div className="space-y-3 pl-6">
            {journeyMilestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: 10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.06 }}
                className="relative"
              >
                <div className="absolute -left-[25px] top-2 w-2 h-2 rounded-full bg-[#0a0f1e] border border-[#22d3ee]" />
                <div className="p-3.5 rounded-xl bg-[#111827] border border-[#1e293b] hover:border-[#22d3ee]/25 transition-colors">
                  <span className="font-mono text-xs text-[#22d3ee]">{milestone.year}</span>
                  <p className="text-sm font-semibold text-[#e2e8f0] mt-0.5">{milestone.title}</p>
                  <p className="text-xs text-[#64748b] mt-0.5">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Beyond Code */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.75 }}
        className="p-5 rounded-xl bg-[#111827] border border-[#1e293b] mb-8"
      >
        <h4 className="text-sm font-semibold text-[#e2e8f0] mb-4">Beyond Code</h4>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Medal className="w-4 h-4 text-[#f59e0b] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm text-[#e2e8f0] font-medium">National Level Taekwondo Player</p>
              <p className="text-xs text-[#64748b] mt-0.5">Multiple Gold Medals · Represented Maharashtra State</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Guitar className="w-4 h-4 text-[#6366f1] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm text-[#e2e8f0] font-medium">Indie-Rock Band Member</p>
              <p className="text-xs text-[#64748b] mt-0.5">Guitarist & Vocalist · Hard Rock Cafe, Blue Frog</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Lightbulb className="w-4 h-4 text-[#22c55e] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm text-[#e2e8f0] font-medium">Product Builder at Heart</p>
              <p className="text-xs text-[#64748b] mt-0.5">Love turning ideas into reality from scratch</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Agent Runtime trace */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.9 }}
      >
        <AgentTrace />
      </motion.div>
    </section>
  );
}
