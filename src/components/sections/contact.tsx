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
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSubmitStatus("success");
        form.reset();
        // Reset after 5 seconds
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
          : "Failed to send message. Please try emailing directly."
      );
      // Reset error after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
        setErrorMessage("");
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={containerRef} className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-[#a1a1aa] max-w-2xl mx-auto">
            Have a project in mind or want to discuss opportunities? I&apos;m always
            open to interesting conversations and collaborations.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-6">Get in touch</h3>

            <div className="space-y-6">
              {/* Email */}
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-[#12121a] border border-[#1e1e2e] hover:border-[#3b82f6]/30 transition-all group"
              >
                <div className="p-3 rounded-xl bg-[#3b82f6]/10 text-[#3b82f6] group-hover:bg-[#3b82f6]/20 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-[#71717a]">Email</div>
                  <div className="text-white font-medium">
                    {personalInfo.email}
                  </div>
                </div>
              </a>

              {/* Phone / WhatsApp */}
              <a
                href={`https://wa.me/917588113838`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-[#12121a] border border-[#1e1e2e] hover:border-[#3b82f6]/30 transition-all group"
              >
                <div className="p-3 rounded-xl bg-[#22c55e]/10 text-[#22c55e] group-hover:bg-[#22c55e]/20 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-[#71717a]">WhatsApp / Phone</div>
                  <div className="text-white font-medium">
                    {personalInfo.phone}
                  </div>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-[#12121a] border border-[#1e1e2e]">
                <div className="p-3 rounded-xl bg-[#8b5cf6]/10 text-[#8b5cf6]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm text-[#71717a]">Location</div>
                  <div className="text-white font-medium">
                    {personalInfo.location}
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <div className="text-sm text-[#71717a] mb-4">Find me on</div>
              <div className="flex gap-3">
                <a
                  href={personalInfo.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-[#12121a] border border-[#1e1e2e] text-[#a1a1aa] hover:text-white hover:border-[#3b82f6]/30 transition-all"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={personalInfo.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-[#12121a] border border-[#1e1e2e] text-[#a1a1aa] hover:text-white hover:border-[#3b82f6]/30 transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={personalInfo.social.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-[#12121a] border border-[#1e1e2e] text-[#a1a1aa] hover:text-white hover:border-[#3b82f6]/30 transition-all"
                  aria-label="LeetCode"
                >
                  <span className="text-sm font-bold">LC</span>
                </a>
                <a
                  href={personalInfo.social.medium}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-[#12121a] border border-[#1e1e2e] text-[#a1a1aa] hover:text-white hover:border-[#3b82f6]/30 transition-all"
                  aria-label="Medium"
                >
                  <span className="text-sm font-bold">M</span>
                </a>
              </div>
            </div>

            {/* Availability Badge */}
            <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]"></span>
              </span>
              <span className="text-sm text-[#22c55e] font-medium">
                Open to opportunities
              </span>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="p-8 rounded-2xl bg-[#12121a] border border-[#1e1e2e]">
              <h3 className="text-xl font-semibold mb-6">Send a message</h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Hidden field for recipient email */}
                <input type="hidden" name="_replyto" value={personalInfo.email} />

                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[#a1a1aa] mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#0a0a0f] border border-[#1e1e2e] text-white placeholder-[#71717a] focus:border-[#3b82f6] focus:outline-none focus:ring-1 focus:ring-[#3b82f6] transition-colors"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#a1a1aa] mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#0a0a0f] border border-[#1e1e2e] text-white placeholder-[#71717a] focus:border-[#3b82f6] focus:outline-none focus:ring-1 focus:ring-[#3b82f6] transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-[#a1a1aa] mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#0a0a0f] border border-[#1e1e2e] text-white placeholder-[#71717a] focus:border-[#3b82f6] focus:outline-none focus:ring-1 focus:ring-[#3b82f6] transition-colors"
                    placeholder="What's this about?"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-[#a1a1aa] mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#0a0a0f] border border-[#1e1e2e] text-white placeholder-[#71717a] focus:border-[#3b82f6] focus:outline-none focus:ring-1 focus:ring-[#3b82f6] transition-colors resize-none"
                    placeholder="Tell me about your project or opportunity..."
                  />
                </div>

                {/* Error Message */}
                {submitStatus === "error" && errorMessage && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || submitStatus === "success"}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 disabled:cursor-not-allowed bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white hover:shadow-lg hover:shadow-[#3b82f6]/20"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : submitStatus === "success" ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>

                {/* Alternative Contact */}
                <p className="text-xs text-center text-[#71717a] mt-4">
                  Or email directly at{" "}
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-[#3b82f6] hover:underline"
                  >
                    {personalInfo.email}
                  </a>
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
