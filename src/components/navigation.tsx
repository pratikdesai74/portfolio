"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.slice(1));
      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile menu button — only visible on mobile */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={() => setIsMobileMenuOpen(true)}
        className="fixed top-5 right-5 z-50 p-2.5 rounded-full lg:hidden glass"
        aria-label="Open navigation menu"
      >
        <Menu className="w-5 h-5 text-[#94a3b8]" />
      </motion.button>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#0a0f1e]/90 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-[#111827] border-l border-[#1e293b] p-6"
            >
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#1e293b] transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-[#94a3b8]" />
              </button>

              <nav className="mt-16 flex flex-col gap-1">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => scrollToSection(item.href)}
                    className={cn(
                      "text-left px-4 py-3 rounded-lg font-medium transition-colors",
                      activeSection === item.href.slice(1)
                        ? "text-[#22d3ee] bg-[#22d3ee]/10"
                        : "text-[#94a3b8] hover:text-[#e2e8f0] hover:bg-[#1e293b]"
                    )}
                  >
                    <span className="font-mono text-xs text-[#475569] mr-3">
                      {String(index + 1).padStart(2, "0")}.
                    </span>
                    {item.label}
                  </motion.button>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
