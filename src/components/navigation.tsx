"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navItems.map((item) => item.href.slice(1));
      for (const section of sections.reverse()) {
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

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 z-50 hidden md:block",
          "transition-all duration-300"
        )}
      >
        <motion.div
          className={cn(
            "flex items-center gap-1 px-2 py-2 rounded-full",
            "glass transition-all duration-300",
            isScrolled ? "shadow-lg shadow-black/20" : ""
          )}
        >
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className={cn(
                "relative px-4 py-2 text-sm font-medium rounded-full transition-colors",
                activeSection === item.href.slice(1)
                  ? "text-white"
                  : "text-[#a1a1aa] hover:text-white"
              )}
            >
              {activeSection === item.href.slice(1) && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute inset-0 bg-[#3b82f6]/20 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          ))}
        </motion.div>
      </motion.nav>

      {/* Mobile Menu Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={() => setIsMobileMenuOpen(true)}
        className={cn(
          "fixed top-4 right-4 z-50 p-3 rounded-full md:hidden",
          "glass transition-all duration-300"
        )}
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-[#12121a] border-l border-[#1e1e2e] p-6"
            >
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#1e1e2e] transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>

              <nav className="mt-16 flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => scrollToSection(item.href)}
                    className={cn(
                      "text-left px-4 py-3 rounded-lg text-lg font-medium transition-colors",
                      activeSection === item.href.slice(1)
                        ? "bg-[#3b82f6]/20 text-white"
                        : "text-[#a1a1aa] hover:text-white hover:bg-[#1e1e2e]"
                    )}
                  >
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
