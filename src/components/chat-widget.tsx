"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Loader2, Bot, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const SUGGESTED = [
  "What are your core technical skills?",
  "Tell me about your AI & RAG projects",
  "What's your distributed systems experience?",
  "How can I contact you?",
];

interface Message {
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  // Teaser bubble: show after 3s, hide once user interacts
  const [showTeaser, setShowTeaser] = useState(false);
  const [teaserDismissed, setTeaserDismissed] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Show teaser bubble after 3 seconds (only once)
  useEffect(() => {
    if (teaserDismissed) return;
    const t = setTimeout(() => setShowTeaser(true), 3000);
    return () => clearTimeout(t);
  }, [teaserDismissed]);

  // Auto-dismiss teaser after 8 seconds
  useEffect(() => {
    if (!showTeaser) return;
    const t = setTimeout(() => setShowTeaser(false), 8000);
    return () => clearTimeout(t);
  }, [showTeaser]);

  useEffect(() => {
    if (open && messages.length === 0) {
      inputRef.current?.focus();
    }
  }, [open, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleOpen = () => {
    setOpen((v) => !v);
    setShowTeaser(false);
    setTeaserDismissed(true);
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isStreaming) return;

    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");
    setIsStreaming(true);
    setMessages((prev) => [...prev, { role: "assistant", content: "", streaming: true }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok || !res.body) throw new Error("Request failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() ?? "";

        for (const part of parts) {
          if (!part.startsWith("data: ")) continue;
          const raw = part.slice(6);
          if (raw === "[DONE]") break;

          let parsed: { text?: string; error?: string };
          try {
            parsed = JSON.parse(raw);
          } catch {
            continue;
          }

          if (parsed.error) throw new Error(parsed.error);
          fullText += parsed.text || "";
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "assistant",
              content: fullText,
              streaming: true,
            };
            return updated;
          });
        }
      }

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: fullText || "I couldn't generate a response. Please try again.",
          streaming: false,
        };
        return updated;
      });
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content:
            "Sorry, I couldn't process that right now. Please reach out directly at pratikvilasdesai@gmail.com",
          streaming: false,
        };
        return updated;
      });
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <>
      {/* Teaser bubble */}
      <AnimatePresence>
        {showTeaser && !open && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="fixed bottom-[88px] right-6 z-50"
          >
            <div className="relative bg-[#111827] border border-[#22d3ee]/30 rounded-2xl rounded-br-sm px-4 py-3 shadow-xl shadow-[#22d3ee]/10 max-w-[220px]">
              {/* Dismiss */}
              <button
                onClick={() => { setShowTeaser(false); setTeaserDismissed(true); }}
                className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[#1e293b] border border-[#334155] text-[#475569] hover:text-[#94a3b8] flex items-center justify-center"
                aria-label="Dismiss"
              >
                <X className="w-2.5 h-2.5" />
              </button>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-3 h-3 text-[#22d3ee] shrink-0" />
                <span className="text-xs font-semibold text-[#e2e8f0]">AI knows everything about me!</span>
              </div>
              <p className="text-[11px] text-[#64748b] leading-snug">
                Ask about my projects, skills, or experience →
              </p>
              {/* Arrow pointing to button */}
              <div className="absolute -bottom-2 right-4 w-3 h-3 bg-[#111827] border-r border-b border-[#22d3ee]/30 rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button — with pulsing glow ring */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Pulsing ring (only when chat is closed) */}
        {!open && (
          <>
            <motion.span
              className="absolute inset-0 rounded-full"
              animate={{ scale: [1, 1.55], opacity: [0.5, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              style={{ background: "radial-gradient(circle, rgba(34,211,238,0.35) 0%, transparent 70%)" }}
            />
            <motion.span
              className="absolute inset-0 rounded-full"
              animate={{ scale: [1, 1.3], opacity: [0.4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
              style={{ background: "radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)" }}
            />
          </>
        )}

        <motion.button
          onClick={handleOpen}
          className={cn(
            "relative flex items-center gap-2.5 rounded-full text-white transition-shadow",
            open
              ? "p-3.5 bg-gradient-to-br from-[#22d3ee] to-[#6366f1] shadow-lg"
              : "pl-4 pr-5 py-3 bg-gradient-to-br from-[#22d3ee] to-[#6366f1] shadow-lg shadow-[#22d3ee]/25 hover:shadow-xl hover:shadow-[#22d3ee]/40"
          )}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          aria-label={open ? "Close chat" : "Chat with AI about Pratik"}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "close" : "open"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="block shrink-0"
            >
              {open ? <X className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </motion.span>
          </AnimatePresence>

          {/* Label — only when closed */}
          <AnimatePresence>
            {!open && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="text-sm font-semibold whitespace-nowrap overflow-hidden"
              >
                Ask AI about me
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="fixed bottom-[88px] right-6 z-50 w-80 md:w-96 flex flex-col rounded-2xl bg-[#111827] border border-[#1e293b] shadow-2xl overflow-hidden"
            style={{ maxHeight: "min(560px, calc(100vh - 110px))" }}
          >
            {/* Header */}
            <div className="p-4 border-b border-[#1e293b] bg-[#0a0f1e] shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-[#22d3ee]/20 to-[#6366f1]/20 text-[#22d3ee]">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#e2e8f0]">Ask about Pratik</p>
                  <p className="text-[10px] font-mono text-[#475569]">
                    Powered by Groq · llama-3.3-70b
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="ml-auto text-[#475569] hover:text-[#94a3b8] transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[160px]">
              {messages.length === 0 ? (
                <div>
                  <p className="text-[10px] text-[#334155] font-mono mb-3">// suggested questions</p>
                  <div className="space-y-2">
                    {SUGGESTED.map((q) => (
                      <button
                        key={q}
                        onClick={() => sendMessage(q)}
                        className="w-full text-left text-xs p-2.5 rounded-xl bg-[#0a0f1e] border border-[#1e293b] text-[#64748b] hover:border-[#22d3ee]/30 hover:text-[#22d3ee] transition-all"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((msg, i) => (
                  <div
                    key={i}
                    className={cn(
                      "text-xs rounded-xl px-3 py-2.5 leading-relaxed",
                      msg.role === "user"
                        ? "ml-auto max-w-[80%] bg-gradient-to-br from-[#22d3ee]/20 to-[#6366f1]/20 text-[#e2e8f0]"
                        : "max-w-[90%] bg-[#0a0f1e] border border-[#1e293b] text-[#94a3b8]"
                    )}
                  >
                    {msg.content}
                    {msg.streaming && msg.content && (
                      <span className="inline-block w-0.5 h-3 bg-[#22d3ee] ml-0.5 align-middle animate-pulse" />
                    )}
                    {msg.streaming && !msg.content && (
                      <span className="flex gap-1 py-1">
                        {[0, 1, 2].map((j) => (
                          <motion.span
                            key={j}
                            className="w-1.5 h-1.5 rounded-full bg-[#334155]"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1, repeat: Infinity, delay: j * 0.2 }}
                          />
                        ))}
                      </span>
                    )}
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-[#1e293b] shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMessage(input);
                }}
                className="flex gap-2"
              >
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask anything about Pratik..."
                  disabled={isStreaming}
                  className="flex-1 text-xs px-3 py-2 rounded-xl bg-[#0a0f1e] border border-[#1e293b] text-[#e2e8f0] placeholder-[#334155] focus:border-[#22d3ee]/40 focus:outline-none transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isStreaming}
                  className="p-2 rounded-xl bg-[#22d3ee] text-[#0a0f1e] disabled:opacity-40 hover:bg-[#67e8f9] transition-colors shrink-0"
                  aria-label="Send"
                >
                  {isStreaming ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
