"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
}

const milestones = [
  { range: [0, 16], label: "Mechanical Engineering", year: "2014", company: "Shivaji University" },
  { range: [16, 32], label: "Tech Transition", year: "2019", company: "CDAC ACTS Pune" },
  { range: [32, 48], label: "First Tech Role", year: "2019-2021", company: "Volante Technologies" },
  { range: [48, 64], label: "Founding Engineer", year: "2021-2024", company: "TartanHq" },
  { range: [64, 82], label: "Product Engineer", year: "2024-2025", company: "Mastercard" },
  { range: [82, 100], label: "Senior Engineer", year: "2026-Present", company: "Securonix" },
];

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number | null>(null);
  const [scrollPercent, setScrollPercent] = useState(0);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const rocketY = useTransform(smoothProgress, [0, 1], ["90%", "10%"]);

  // Track scroll percentage for milestone display
  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (value) => {
      setScrollPercent(value * 100);
    });
    return unsubscribe;
  }, [smoothProgress]);

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (dimensions.width === 0) return;

    // Initialize stars
    const starCount = Math.floor((dimensions.width * dimensions.height) / 4000);
    starsRef.current = Array.from({ length: starCount }, () => ({
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.5 + 0.1,
    }));
  }, [dimensions]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastTime = 0;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      animationRef.current = requestAnimationFrame(animate);

      const deltaTime = currentTime - lastTime;
      if (deltaTime < frameInterval) return;
      lastTime = currentTime - (deltaTime % frameInterval);

      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Draw and update stars
      starsRef.current.forEach((star) => {
        const twinkle = Math.sin(currentTime * 0.001 * star.speed + star.x) * 0.3 + 0.7;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
        ctx.fill();

        // Slow parallax movement
        star.y += star.speed * 0.3;
        if (star.y > dimensions.height) {
          star.y = -star.size;
          star.x = Math.random() * dimensions.width;
        }
      });

      // Draw nebula clouds
      const nebulaGradient1 = ctx.createRadialGradient(
        dimensions.width * 0.2,
        dimensions.height * 0.3,
        0,
        dimensions.width * 0.2,
        dimensions.height * 0.3,
        300
      );
      nebulaGradient1.addColorStop(0, "rgba(59, 130, 246, 0.03)");
      nebulaGradient1.addColorStop(1, "transparent");
      ctx.fillStyle = nebulaGradient1;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      const nebulaGradient2 = ctx.createRadialGradient(
        dimensions.width * 0.8,
        dimensions.height * 0.7,
        0,
        dimensions.width * 0.8,
        dimensions.height * 0.7,
        350
      );
      nebulaGradient2.addColorStop(0, "rgba(139, 92, 246, 0.03)");
      nebulaGradient2.addColorStop(1, "transparent");
      ctx.fillStyle = nebulaGradient2;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions]);

  const currentMilestone = milestones.find(
    (m) => scrollPercent >= m.range[0] && scrollPercent < m.range[1]
  ) || milestones[0];

  return (
    <>
      {/* Canvas for stars */}
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="fixed inset-0 z-0 pointer-events-none"
      />

      {/* Journey progress line */}
      <div className="fixed left-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent z-0 pointer-events-none hidden lg:block" />

      {/* Rocket that follows scroll */}
      <motion.div
        className="fixed left-6 z-20 pointer-events-none hidden lg:block"
        style={{ top: rocketY }}
      >
        <motion.div
          animate={{
            x: [0, 2, -2, 0],
            rotate: [0, 1, -1, 0],
          }}
          transition={{
            duration: 0.4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="relative"
        >
          {/* Rocket SVG */}
          <svg
            width="36"
            height="54"
            viewBox="0 0 40 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_12px_rgba(59,130,246,0.6)]"
          >
            {/* Rocket body */}
            <path
              d="M20 0C20 0 8 15 8 35C8 45 13 50 20 50C27 50 32 45 32 35C32 15 20 0 20 0Z"
              fill="url(#rocketGradient)"
              stroke="#60a5fa"
              strokeWidth="1"
            />
            {/* Window */}
            <circle cx="20" cy="25" r="6" fill="#0a0a0f" stroke="#60a5fa" strokeWidth="1" />
            <circle cx="20" cy="25" r="4" fill="#3b82f6" opacity="0.6" />
            {/* Fins */}
            <path d="M8 35L0 50L8 45V35Z" fill="#8b5cf6" />
            <path d="M32 35L40 50L32 45V35Z" fill="#8b5cf6" />
            {/* Exhaust nozzle */}
            <ellipse cx="20" cy="52" rx="6" ry="3" fill="#1e1e2e" />

            <defs>
              <linearGradient id="rocketGradient" x1="20" y1="0" x2="20" y2="50" gradientUnits="userSpaceOnUse">
                <stop stopColor="#60a5fa" />
                <stop offset="1" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>

          {/* Rocket exhaust flame */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 top-[52px]"
            animate={{
              scaleY: [1, 1.4, 0.9, 1],
              opacity: [0.9, 1, 0.7, 0.9],
            }}
            transition={{
              duration: 0.12,
              repeat: Infinity,
            }}
          >
            <svg width="20" height="28" viewBox="0 0 20 30" fill="none">
              <ellipse
                cx="10"
                cy="5"
                rx="6"
                ry="12"
                fill="url(#flameGradient)"
              />
              <ellipse cx="10" cy="6" rx="3" ry="14" fill="url(#flameInner)" />
              <defs>
                <linearGradient id="flameGradient" x1="10" y1="0" x2="10" y2="28" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#fbbf24" />
                  <stop offset="0.4" stopColor="#f97316" />
                  <stop offset="1" stopColor="#ef4444" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="flameInner" x1="10" y1="0" x2="10" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#fef3c7" />
                  <stop offset="0.3" stopColor="#fbbf24" />
                  <stop offset="0.6" stopColor="#f97316" />
                  <stop offset="1" stopColor="#dc2626" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </motion.div>

        {/* Journey milestone indicator */}
        <motion.div
          key={currentMilestone.label}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute left-12 top-1/2 -translate-y-1/2 whitespace-nowrap"
        >
          <div className="bg-[#12121a]/90 backdrop-blur-sm border border-blue-500/30 rounded-lg px-3 py-2 shadow-lg">
            <p className="text-blue-400 text-xs font-mono">{currentMilestone.year}</p>
            <p className="text-white text-sm font-semibold">{currentMilestone.label}</p>
            <p className="text-zinc-500 text-xs">{currentMilestone.company}</p>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
