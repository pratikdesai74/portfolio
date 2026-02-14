"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
}

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const starsRef = useRef<Star[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const rocketYRef = useRef(0);
  const animationRef = useRef<number | null>(null);

  const { scrollYProgress } = useScroll();
  const rocketProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);

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
    const starCount = Math.floor((dimensions.width * dimensions.height) / 3000);
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

      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, dimensions.height);
      gradient.addColorStop(0, "#0a0a0f");
      gradient.addColorStop(0.5, "#0d0d15");
      gradient.addColorStop(1, "#0a0a0f");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // Draw and update stars
      starsRef.current.forEach((star) => {
        // Twinkling effect
        const twinkle = Math.sin(currentTime * 0.001 * star.speed + star.x) * 0.3 + 0.7;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * twinkle})`;
        ctx.fill();

        // Move stars down (parallax effect with scroll)
        star.y += star.speed * 0.5;
        if (star.y > dimensions.height) {
          star.y = -star.size;
          star.x = Math.random() * dimensions.width;
        }
      });

      // Draw nebula/galaxy clouds
      const nebulaGradient1 = ctx.createRadialGradient(
        dimensions.width * 0.2,
        dimensions.height * 0.3,
        0,
        dimensions.width * 0.2,
        dimensions.height * 0.3,
        300
      );
      nebulaGradient1.addColorStop(0, "rgba(59, 130, 246, 0.05)");
      nebulaGradient1.addColorStop(0.5, "rgba(139, 92, 246, 0.03)");
      nebulaGradient1.addColorStop(1, "transparent");
      ctx.fillStyle = nebulaGradient1;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      const nebulaGradient2 = ctx.createRadialGradient(
        dimensions.width * 0.8,
        dimensions.height * 0.6,
        0,
        dimensions.width * 0.8,
        dimensions.height * 0.6,
        400
      );
      nebulaGradient2.addColorStop(0, "rgba(139, 92, 246, 0.04)");
      nebulaGradient2.addColorStop(0.5, "rgba(59, 130, 246, 0.02)");
      nebulaGradient2.addColorStop(1, "transparent");
      ctx.fillStyle = nebulaGradient2;
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);

      // Update and draw particles (rocket exhaust)
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);
      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life -= 1;
        particle.vy += 0.1; // Gravity

        const alpha = particle.life / particle.maxLife;
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size
        );
        gradient.addColorStop(0, `rgba(255, 150, 50, ${alpha * 0.8})`);
        gradient.addColorStop(0.5, `rgba(255, 100, 50, ${alpha * 0.4})`);
        gradient.addColorStop(1, `rgba(255, 50, 50, 0)`);

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions]);

  // Listen to rocket progress for particle emission
  useEffect(() => {
    const unsubscribe = rocketProgress.on("change", (value) => {
      rocketYRef.current = value;

      // Emit particles from rocket position
      const rocketX = 60;
      const rocketY = dimensions.height - (value / 100) * dimensions.height;

      if (Math.random() > 0.5) {
        particlesRef.current.push({
          x: rocketX + Math.random() * 10 - 5,
          y: rocketY + 40,
          vx: (Math.random() - 0.5) * 2,
          vy: Math.random() * 3 + 1,
          size: Math.random() * 8 + 4,
          life: 30,
          maxLife: 30,
        });
      }
    });

    return unsubscribe;
  }, [rocketProgress, dimensions.height]);

  return (
    <>
      {/* Canvas for stars and particles */}
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="fixed inset-0 z-0 pointer-events-none"
      />

      {/* Rocket that follows scroll */}
      <motion.div
        className="fixed left-8 z-10 pointer-events-none"
        style={{
          bottom: rocketProgress,
        }}
      >
        <motion.div
          animate={{
            x: [0, 3, -3, 0],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          {/* Rocket SVG */}
          <svg
            width="40"
            height="60"
            viewBox="0 0 40 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
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
            <circle cx="20" cy="25" r="4" fill="#3b82f6" opacity="0.5" />
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
            className="absolute left-1/2 -translate-x-1/2 top-full"
            animate={{
              scaleY: [1, 1.3, 0.8, 1],
              opacity: [0.8, 1, 0.6, 0.8],
            }}
            transition={{
              duration: 0.15,
              repeat: Infinity,
            }}
          >
            <svg width="20" height="30" viewBox="0 0 20 30" fill="none">
              <ellipse
                cx="10"
                cy="5"
                rx="5"
                ry="10"
                fill="url(#flameGradient)"
                filter="blur(2px)"
              />
              <ellipse cx="10" cy="8" rx="3" ry="15" fill="url(#flameInner)" />
              <defs>
                <linearGradient id="flameGradient" x1="10" y1="0" x2="10" y2="30" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#fbbf24" />
                  <stop offset="0.5" stopColor="#f97316" />
                  <stop offset="1" stopColor="#ef4444" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="flameInner" x1="10" y1="0" x2="10" y2="25" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#fef3c7" />
                  <stop offset="0.3" stopColor="#fbbf24" />
                  <stop offset="0.7" stopColor="#f97316" />
                  <stop offset="1" stopColor="#dc2626" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </motion.div>

        {/* Journey milestones indicator */}
        <motion.div
          className="absolute left-14 top-1/2 -translate-y-1/2 whitespace-nowrap"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <JourneyMilestone progress={rocketYRef.current} />
        </motion.div>
      </motion.div>

      {/* Journey progress line */}
      <div className="fixed left-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent z-0 pointer-events-none" />
    </>
  );
}

function JourneyMilestone({ progress }: { progress: number }) {
  const milestones = [
    { range: [0, 15], label: "Starting Point", year: "2015" },
    { range: [15, 30], label: "CDAC Transition", year: "2017" },
    { range: [30, 45], label: "First Tech Role", year: "2018" },
    { range: [45, 60], label: "Startup Journey", year: "2019" },
    { range: [60, 80], label: "Enterprise Scale", year: "2021" },
    { range: [80, 100], label: "Current Chapter", year: "2023" },
  ];

  const current = milestones.find(
    (m) => progress >= m.range[0] && progress < m.range[1]
  );

  if (!current) return null;

  return (
    <motion.div
      key={current.label}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-[#12121a]/80 backdrop-blur-sm border border-blue-500/30 rounded-lg px-3 py-2"
    >
      <p className="text-blue-400 text-xs font-mono">{current.year}</p>
      <p className="text-white text-sm font-medium">{current.label}</p>
    </motion.div>
  );
}
