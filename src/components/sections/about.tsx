"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { MapPin, Award, TrendingUp } from "lucide-react";
import { personalInfo, stats } from "@/lib/data";

const journeyMilestones = [
  {
    year: "2014",
    title: "Engineering Graduate",
    description: "B.Tech from Shivaji University - Where the journey began",
  },
  {
    year: "2019",
    title: "Tech Transition",
    description: "CDAC ACTS Pune - Pivoting into software development",
  },
  {
    year: "2019-21",
    title: "First Tech Role",
    description: "Volante Technologies - IBS Intelligence Award for VolPay",
  },
  {
    year: "2021-24",
    title: "Startup Builder",
    description: "TartanHq - Founding engineer, built Perks from day 0",
  },
  {
    year: "2024-25",
    title: "Enterprise Scale",
    description: "Mastercard - Architecting solutions for 10M+ users",
  },
  {
    year: "2026",
    title: "Present",
    description: "Securonix - Scaling SIEM platform to 2M+ TPS",
  },
];

export function About() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-24 md:py-32 px-6"
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
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-[#a1a1aa] max-w-2xl mx-auto">
            From mechanical engineering to scaling distributed systems - my
            unconventional path in tech.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Photo + Story */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Profile Photo */}
            <div className="flex justify-center lg:justify-start mb-8">
              <div className="relative">
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-[#1e1e2e] relative">
                  <Image
                    src="/pratik-photo.jpg"
                    alt="Pratik Desai"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                {/* Decorative ring */}
                <div className="absolute inset-0 rounded-full border-2 border-[#3b82f6]/30 scale-110" />
                {/* Badge */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white text-sm font-medium">
                  7+ Years
                </div>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              {personalInfo.about.split("\n\n").map((paragraph, index) => (
                <p
                  key={index}
                  className="text-[#a1a1aa] leading-relaxed mb-4 text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="p-4 rounded-xl bg-[#12121a] border border-[#1e1e2e]"
                >
                  <div className="text-2xl md:text-3xl font-bold gradient-text">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[#71717a] mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-4 mt-8">
              <div className="flex items-center gap-2 text-[#a1a1aa]">
                <MapPin className="w-4 h-4 text-[#3b82f6]" />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-2 text-[#a1a1aa]">
                <Award className="w-4 h-4 text-[#3b82f6]" />
                <span>IBS Intelligence Award Winner</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Journey Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative"
          >
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#3b82f6]" />
              My Journey
            </h3>

            {/* Timeline */}
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-[#3b82f6] via-[#8b5cf6] to-[#3b82f6]/20" />

              <div className="space-y-6">
                {journeyMilestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="relative pl-10"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-[#0a0a0f] border-2 border-[#3b82f6] flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#3b82f6]" />
                    </div>

                    <div className="p-4 rounded-xl bg-[#12121a] border border-[#1e1e2e] hover:border-[#3b82f6]/30 transition-colors">
                      <span className="text-xs font-mono text-[#3b82f6]">
                        {milestone.year}
                      </span>
                      <h4 className="font-semibold text-white mt-1">
                        {milestone.title}
                      </h4>
                      <p className="text-sm text-[#71717a] mt-1">
                        {milestone.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
