"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { Play, ChevronLeft, ChevronRight, Trophy, Star, Rocket, GraduationCap, Briefcase, Code, Shield, X } from "lucide-react";

interface JourneyStop {
  id: number;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  achievements: string[];
  techStack?: string[];
}

const journeyStops: JourneyStop[] = [
  {
    id: 1,
    year: "2014",
    title: "The Origin",
    subtitle: "Mechanical Engineering - Shivaji University",
    description: "Completed B.Tech in Mechanical Engineering from Shivaji University, Kolhapur. The non-tech to tech journey begins here - building a foundation in problem-solving and analytical thinking.",
    icon: <GraduationCap className="w-8 h-8" />,
    color: "#22c55e",
    achievements: ["Mechanical Engineering", "Problem-Solving", "Non-Tech Start"],
  },
  {
    id: 2,
    year: "2019",
    title: "The Pivot",
    subtitle: "CDAC ACTS Pune - PG Diploma",
    description: "Made the bold decision to pivot into tech. Completed Post Graduate Diploma in Advanced Computing, mastering software development.",
    icon: <Code className="w-8 h-8" />,
    color: "#3b82f6",
    achievements: ["PG Diploma", "Java Mastery", "Tech Transition"],
    techStack: ["Java", "SQL", "Web Development"],
  },
  {
    id: 3,
    year: "2019-2021",
    title: "First Victory",
    subtitle: "Volante Technologies - Backend Engineer",
    description: "First tech role in enterprise banking. Built VolPay payment features and won the prestigious IBS Intelligence Award for Goldman Sachs project.",
    icon: <Trophy className="w-8 h-8" />,
    color: "#f59e0b",
    achievements: ["IBS Award Winner", "Payment Systems", "Goldman Sachs Project"],
    techStack: ["Java", "Spring Boot", "MySQL", "Kafka", "Docker"],
  },
  {
    id: 4,
    year: "2021-2024",
    title: "Startup Mode",
    subtitle: "TartanHq - Founding Engineer",
    description: "Joined as Day 0 founding engineer. Built Perks platform from scratch, onboarded 30,000 users, generated $66K/mo revenue. Achieved 50% AWS cost reduction.",
    icon: <Rocket className="w-8 h-8" />,
    color: "#8b5cf6",
    achievements: ["Founding Engineer", "$66K/mo Revenue", "30K Users"],
    techStack: ["Java", "Spring Boot", "AWS", "Kafka", "Redis", "DynamoDB"],
  },
  {
    id: 5,
    year: "2024-2025",
    title: "Enterprise Scale",
    subtitle: "Mastercard - Product Engineer",
    description: "Architected Africa expansion targeting 10M+ users. Built multi-region resiliency for instant clearing, onboarded 5+ clients. Designed event-driven library improving processing by 30%.",
    icon: <Star className="w-8 h-8" />,
    color: "#ef4444",
    achievements: ["10M+ Users Target", "5+ Clients", "30% Faster Processing"],
    techStack: ["Java", "Spring Boot", "Kafka", "Nats.io", "PostgreSQL", "gRPC"],
  },
  {
    id: 6,
    year: "2026",
    title: "Security Chapter",
    subtitle: "Securonix - Senior Software Engineer",
    description: "Currently scaling high-throughput SIEM platform from 1M to 2M+ TPS. Building next-gen alerting, tracing, and logging for large-scale security analytics.",
    icon: <Shield className="w-8 h-8" />,
    color: "#06b6d4",
    achievements: ["2M+ TPS Scale", "SIEM Platform", "Senior Engineer"],
    techStack: ["Java", "Kafka", "Spark", "Hadoop", "HBase", "Kubernetes"],
  },
];

export default function JourneyGame() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStop, setCurrentStop] = useState(0);
  const [unlockedStops, setUnlockedStops] = useState<number[]>([0]);
  const [showAchievement, setShowAchievement] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const goToStop = (index: number) => {
    if (index >= 0 && index < journeyStops.length) {
      setCurrentStop(index);
      if (!unlockedStops.includes(index)) {
        setUnlockedStops((prev) => [...prev, index]);
        setShowAchievement(true);
        setTimeout(() => setShowAchievement(false), 2000);
      }
    }
  };

  const nextStop = () => goToStop(currentStop + 1);
  const prevStop = () => goToStop(currentStop - 1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowRight") nextStop();
      if (e.key === "ArrowLeft") prevStop();
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentStop]);

  const currentJourney = journeyStops[currentStop];
  const progress = ((currentStop + 1) / journeyStops.length) * 100;

  return (
    <>
      {/* Launch Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-shadow"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: isOpen ? 0 : 1, x: isOpen ? -20 : 0 }}
        style={{ pointerEvents: isOpen ? "none" : "auto" }}
      >
        <Play className="w-5 h-5" />
        <span className="text-sm font-medium">Play Journey</span>
      </motion.button>

      {/* Journey Game Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-[#0d0d12] border border-[#1e1e2e] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e1e2e]">
                <div>
                  <h2 className="text-xl font-bold text-white">Journey Through Time</h2>
                  <p className="text-sm text-zinc-500">
                    Use arrow keys or buttons to navigate
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-zinc-400">
                      {unlockedStops.length}/{journeyStops.length} Unlocked
                    </span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5 text-zinc-400" />
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-1 bg-[#1e1e2e]">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>

              {/* Timeline Navigation */}
              <div className="px-6 py-4 border-b border-[#1e1e2e]">
                <div className="flex items-center justify-between">
                  {journeyStops.map((stop, index) => (
                    <button
                      key={stop.id}
                      onClick={() => goToStop(index)}
                      className="relative flex flex-col items-center group"
                    >
                      <motion.div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                          index === currentStop
                            ? "ring-2 ring-offset-2 ring-offset-[#0d0d12]"
                            : ""
                        } ${
                          unlockedStops.includes(index)
                            ? "opacity-100"
                            : "opacity-40 grayscale"
                        }`}
                        style={{
                          backgroundColor: stop.color + "20",
                          color: stop.color,
                          "--tw-ring-color": index === currentStop ? stop.color : "transparent",
                        } as React.CSSProperties}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {stop.icon}
                      </motion.div>
                      <span
                        className={`mt-2 text-xs font-mono transition-colors ${
                          index === currentStop
                            ? "text-white"
                            : "text-zinc-500 group-hover:text-zinc-300"
                        }`}
                      >
                        {stop.year}
                      </span>
                      {index < journeyStops.length - 1 && (
                        <div className="absolute left-full top-5 w-full h-0.5 -translate-y-1/2 bg-[#1e1e2e]">
                          <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                            initial={{ width: 0 }}
                            animate={{
                              width: unlockedStops.includes(index + 1)
                                ? "100%"
                                : "0%",
                            }}
                          />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Content */}
              <div className="relative h-[400px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStop}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="absolute inset-0 p-8"
                  >
                    <div className="flex gap-8 h-full">
                      {/* Left Side - Icon & Year */}
                      <div className="flex flex-col items-center justify-center w-48 shrink-0">
                        <motion.div
                          className="w-24 h-24 rounded-2xl flex items-center justify-center mb-4"
                          style={{ backgroundColor: currentJourney.color + "20" }}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", bounce: 0.5 }}
                        >
                          <div style={{ color: currentJourney.color }}>
                            {currentJourney.icon}
                          </div>
                        </motion.div>
                        <motion.span
                          className="text-4xl font-bold font-mono"
                          style={{ color: currentJourney.color }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          {currentJourney.year}
                        </motion.span>
                      </div>

                      {/* Right Side - Content */}
                      <div className="flex-1 flex flex-col justify-center">
                        <motion.h3
                          className="text-3xl font-bold text-white mb-2"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                        >
                          {currentJourney.title}
                        </motion.h3>
                        <motion.p
                          className="text-lg mb-4"
                          style={{ color: currentJourney.color }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15 }}
                        >
                          {currentJourney.subtitle}
                        </motion.p>
                        <motion.p
                          className="text-zinc-400 mb-6 leading-relaxed"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          {currentJourney.description}
                        </motion.p>

                        {/* Achievements */}
                        <motion.div
                          className="flex flex-wrap gap-2 mb-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.25 }}
                        >
                          {currentJourney.achievements.map((achievement, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 rounded-full text-sm font-medium"
                              style={{
                                backgroundColor: currentJourney.color + "20",
                                color: currentJourney.color,
                              }}
                            >
                              {achievement}
                            </span>
                          ))}
                        </motion.div>

                        {/* Tech Stack */}
                        {currentJourney.techStack && (
                          <motion.div
                            className="flex flex-wrap gap-2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            {currentJourney.techStack.map((tech, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 rounded-lg text-xs font-mono bg-[#1e1e2e] text-zinc-400"
                              >
                                {tech}
                              </span>
                            ))}
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <button
                  onClick={prevStop}
                  disabled={currentStop === 0}
                  className={`absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors ${
                    currentStop === 0 ? "opacity-30 cursor-not-allowed" : ""
                  }`}
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={nextStop}
                  disabled={currentStop === journeyStops.length - 1}
                  className={`absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors ${
                    currentStop === journeyStops.length - 1
                      ? "opacity-30 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-[#1e1e2e] flex items-center justify-between">
                <p className="text-sm text-zinc-500">
                  Stop {currentStop + 1} of {journeyStops.length}
                </p>
                <div className="flex gap-2">
                  {journeyStops.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToStop(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentStop
                          ? "w-6 bg-blue-500"
                          : unlockedStops.includes(index)
                          ? "bg-zinc-500 hover:bg-zinc-400"
                          : "bg-zinc-700"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Achievement Popup */}
            <AnimatePresence>
              {showAchievement && (
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.9 }}
                  className="fixed top-20 left-1/2 -translate-x-1/2 px-6 py-4 rounded-xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30"
                >
                  <div className="flex items-center gap-3">
                    <Trophy className="w-6 h-6 text-yellow-400" />
                    <div>
                      <p className="text-yellow-400 font-bold">New Chapter Unlocked!</p>
                      <p className="text-sm text-zinc-400">{currentJourney.title}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
