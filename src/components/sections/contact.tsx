"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { personalInfo } from "@/lib/data";

const FORMSPREE_ID = "xreazdyp";

export function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setSubmitStatus("success");
        form.reset();
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        const data = await response.json();
        throw new Error(data.error || "Failed to send message");
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to send. Please email directly."
      );
      setTimeout(() => {
        setSubmitStatus("idle");
        setErrorMessage("");
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-[#0a0f1e] border border-[#1e293b] text-[#e2e8f0] placeholder-[#475569] text-sm focus:border-[#22d3ee] focus:outline-none focus:ring-1 focus:ring-[#22d3ee]/40 transition-colors";

  return (
    <section
      id="contact"
      ref={containerRef}
      className="py-16 md:py-24"
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
        className="font-mono text-[#22d3ee] text-xs tracking-widest uppercase mb-2"
      >
        // 07. contact
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="text-2xl md:text-3xl font-bold font-display text-[#e2e8f0] mb-2"
      >
        Let&apos;s <span className="gradient-text">Connect</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-sm text-[#64748b] mb-10"
      >
        Open to interesting conversations, collaborations, and opportunities.
      </motion.p>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <a
            href={`mailto:${personalInfo.email}`}
            className="flex items-center gap-4 p-4 rounded-xl bg-[#111827] border border-[#1e293b] hover:border-[#22d3ee]/30 transition-all group"
          >
            <div className="p-2.5 rounded-xl bg-[#22d3ee]/10 text-[#22d3ee] group-hover:bg-[#22d3ee]/20 transition-colors">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-[#64748b] font-mono mb-0.5">Email</div>
              <div className="text-sm text-[#e2e8f0] font-medium">{personalInfo.email}</div>
            </div>
          </a>

          <a
            href="https://wa.me/917588113838"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl bg-[#111827] border border-[#1e293b] hover:border-[#22c55e]/30 transition-all group"
          >
            <div className="p-2.5 rounded-xl bg-[#22c55e]/10 text-[#22c55e] group-hover:bg-[#22c55e]/20 transition-colors">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-[#64748b] font-mono mb-0.5">WhatsApp / Phone</div>
              <div className="text-sm text-[#e2e8f0] font-medium">{personalInfo.phone}</div>
            </div>
          </a>

          <div className="flex items-center gap-4 p-4 rounded-xl bg-[#111827] border border-[#1e293b]">
            <div className="p-2.5 rounded-xl bg-[#6366f1]/10 text-[#6366f1]">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-[#64748b] font-mono mb-0.5">Location</div>
              <div className="text-sm text-[#e2e8f0] font-medium">{personalInfo.location}</div>
            </div>
          </div>

          <div className="pt-2">
            <div className="text-xs font-mono text-[#475569] mb-3">Find me on</div>
            <div className="flex gap-3">
              {[
                { href: personalInfo.social.github, label: "GitHub", icon: <Github className="w-4 h-4" /> },
                { href: personalInfo.social.linkedin, label: "LinkedIn", icon: <Linkedin className="w-4 h-4" /> },
                { href: personalInfo.social.leetcode, label: "LeetCode", icon: <span className="text-xs font-bold font-mono">LC</span> },
                { href: personalInfo.social.medium, label: "Medium", icon: <span className="text-xs font-bold font-mono">M</span> },
              ].map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-[#111827] border border-[#1e293b] text-[#64748b] hover:text-[#22d3ee] hover:border-[#22d3ee]/30 transition-all flex items-center justify-center"
                  aria-label={label}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]" />
            </span>
            <span className="text-xs font-mono text-[#22c55e]">Open to opportunities</span>
          </div>
        </motion.div>

        {/* Contact form */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="p-6 rounded-2xl bg-[#111827] border border-[#1e293b]">
            <h3 className="text-base font-semibold text-[#e2e8f0] mb-5">Send a message</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="_replyto" value={personalInfo.email} />

              <div>
                <label htmlFor="name" className="block text-xs font-mono text-[#64748b] mb-1.5">
                  Name
                </label>
                <input type="text" id="name" name="name" required className={inputClass} placeholder="Your name" />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-mono text-[#64748b] mb-1.5">
                  Email
                </label>
                <input type="email" id="email" name="email" required className={inputClass} placeholder="your@email.com" />
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-mono text-[#64748b] mb-1.5">
                  Subject
                </label>
                <input type="text" id="subject" name="subject" required className={inputClass} placeholder="What's this about?" />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono text-[#64748b] mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className={`${inputClass} resize-none`}
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>

              {submitStatus === "error" && errorMessage && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || submitStatus === "success"}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 disabled:cursor-not-allowed bg-gradient-to-r from-[#22d3ee] to-[#6366f1] text-white hover:opacity-90 hover:shadow-lg hover:shadow-[#22d3ee]/20"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                ) : submitStatus === "success" ? (
                  <><CheckCircle className="w-4 h-4" /> Message Sent!</>
                ) : (
                  <><Send className="w-4 h-4" /> Send Message</>
                )}
              </button>

              <p className="text-xs text-center font-mono text-[#475569]">
                Or email at{" "}
                <a href={`mailto:${personalInfo.email}`} className="text-[#22d3ee] hover:underline">
                  {personalInfo.email}
                </a>
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
