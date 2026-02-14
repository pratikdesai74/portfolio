"use client";

import { useState, useRef, useEffect, KeyboardEvent, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, Minus } from "lucide-react";

interface CommandOutput {
  command: string;
  output: string | ReactNode;
  isError?: boolean;
}

const COMMANDS: Record<string, string | ReactNode> = {
  help: `Available commands:

  about      - Learn about Pratik
  journey    - See career journey timeline
  skills     - View technical skills
  contact    - Get contact information
  projects   - List featured projects
  exp        - Work experience summary
  education  - Educational background
  awards     - Awards and achievements
  social     - Social media links
  resume     - Download resume
  clear      - Clear terminal
  ascii      - Show ASCII art
  matrix     - Enter the matrix
  coffee     - Essential fuel`,

  about: `
┌─────────────────────────────────────────────────────────────┐
│  PRATIK DESAI - Senior Software Engineer                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  7+ years crafting scalable systems in Fintech, Payments,   │
│  and Cybersecurity domains.                                 │
│                                                             │
│  🎯 Engineering graduate turned Tech Leader                 │
│  🚀 Built systems processing millions of transactions       │
│  💡 Founding engineer who scaled startups to $66K/mo        │
│  🛡️  Currently securing enterprises at Securonix            │
│                                                             │
│  Philosophy: "Write code that tells a story"                │
│                                                             │
└─────────────────────────────────────────────────────────────┘`,

  journey: `
╔══════════════════════════════════════════════════════════════╗
║                    CAREER JOURNEY                            ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  2014 ─── 🎓 Engineering Graduate                            ║
║           └── BE/B.Tech from Shivaji University              ║
║                                                              ║
║  2019 ─── 💻 CDAC ACTS Pune                                  ║
║           └── PG Diploma - Pivoted to software               ║
║                                                              ║
║  2019-21 ── 🏆 Volante Technologies                          ║
║           └── IBS Award Winner, payment systems              ║
║                                                              ║
║  2021-24 ── 🚀 TartanHq (Founding Engineer)                  ║
║           └── Built platform generating $66K/mo revenue      ║
║                                                              ║
║  2024-25 ── 💳 Mastercard (Product Engineer)                 ║
║           └── Africa expansion, 10M+ users target            ║
║                                                              ║
║  2026 ─── 🛡️  Securonix (Current)                            ║
║           └── Senior Engineer, SIEM 1M to 2M+ TPS            ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝`,

  skills: `
┌──────────────────────────────────────────────────────────────┐
│                    TECHNICAL ARSENAL                         │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  LANGUAGES      │ Java ████████████ Expert                   │
│                 │ Python ██████████ Advanced                 │
│                 │ Bash/Shell █████████ Advanced              │
│                 │ SQL ████████████ Expert                    │
│                                                              │
│  BACKEND        │ Spring Boot, Spring Security, Hibernate    │
│                 │ Microservices, REST APIs, gRPC, JUnit      │
│                                                              │
│  MESSAGING      │ Apache Kafka, Nats.io, AWS SQS             │
│                 │ Event-Driven Architecture (EDA)            │
│                                                              │
│  CLOUD/DEVOPS   │ AWS (S3, SQS, EKS, Lambda)                 │
│                 │ GCP, Docker, Kubernetes, Jenkins, CI/CD    │
│                                                              │
│  DATABASES      │ PostgreSQL, MySQL, Redis, DynamoDB         │
│                 │ HBase, SQL Server, Solr                    │
│                                                              │
│  BIG DATA       │ Apache Spark, Hadoop (HDFS), HBase         │
│                                                              │
└──────────────────────────────────────────────────────────────┘`,

  contact: `
╔══════════════════════════════════════════════════════════════╗
║                    LET'S CONNECT                             ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  📧 Email    : pratikvilasdesai@gmail.com                    ║
║  📱 WhatsApp : +91 7588113838                                ║
║  📍 Location : Pune, India                                   ║
║                                                              ║
║  🌐 Website  : https://pratikdesai.dev                       ║
║  💼 LinkedIn : linkedin.com/in/pratikvdesai                  ║
║  🐙 GitHub   : github.com/pratikdesai74                      ║
║                                                              ║
║  💚 Status   : Open to Remote Opportunities                  ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝`,

  projects: `
┌──────────────────────────────────────────────────────────────┐
│                   FEATURED PROJECTS                          │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  [1] 💰 PAYMENT WALLET                                       │
│      Full-featured digital wallet with real-time             │
│      transactions, fraud detection, multi-currency           │
│      Tech: Java, Spring Boot, Kafka, PostgreSQL              │
│                                                              │
│  [2] 📄 TALKTOPDF                                            │
│      AI-powered PDF analysis with RAG pipeline               │
│      Tech: Python, FastAPI, LangChain, React                 │
│      Live: talktopdf.pratikdesai.dev                         │
│                                                              │
│  [3] 🎁 PERKS PLATFORM                                       │
│      B2B employee benefits platform                          │
│      Tech: Java, Spring Boot, AWS, PostgreSQL                │
│      Revenue: $66K/month generated                           │
│                                                              │
│  [4] 🎓 MARVEL - CLASS MANAGEMENT                            │
│      Self-hosted on Raspberry Pi + GCP                       │
│      Tech: Java, Spring Boot, Docker, GitHub Actions         │
│                                                              │
└──────────────────────────────────────────────────────────────┘`,

  exp: `
┌──────────────────────────────────────────────────────────────┐
│                   WORK EXPERIENCE                            │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  SECURONIX (Jan 2026 - Present)                              │
│  Senior Software Engineer                                    │
│  └─ Scaling SIEM platform from 1M to 2M+ TPS                │
│  └─ Cybersecurity | UEBA Platform                           │
│                                                              │
│  MASTERCARD (Mar 2024 - Dec 2025)                            │
│  Product Engineer                                            │
│  └─ Africa contactless payment, 10M+ users target           │
│  └─ Multi-region resiliency, 5+ clients onboarded           │
│                                                              │
│  TARTANHQ (Jul 2021 - Mar 2024)                              │
│  Founding Software Engineer                                  │
│  └─ Day 0 role, built Perks platform from scratch           │
│  └─ $66K/mo revenue, 30K users onboarded                    │
│                                                              │
│  VOLANTE TECHNOLOGIES (Feb 2019 - Jul 2021)                  │
│  Software Engineer (Backend)                                 │
│  └─ VolPay - IBS Intelligence Award Winner                  │
│  └─ Payment infrastructure for Goldman Sachs                │
│                                                              │
└──────────────────────────────────────────────────────────────┘`,

  education: `
┌──────────────────────────────────────────────────────────────┐
│                      EDUCATION                               │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  🎓 Scaler (2022)                                            │
│     Software Development & Problem Solving                   │
│                                                              │
│  🎓 CDAC ACTS, Pune (2019)                                   │
│     Post Graduate Diploma                                    │
│     └─ Advanced Computing                                    │
│                                                              │
│  🎓 Shivaji University, Kolhapur (2014)                      │
│     BE/B.Tech/BS                                             │
│     └─ Foundation in engineering & problem-solving           │
│                                                              │
└──────────────────────────────────────────────────────────────┘`,

  awards: `
╔══════════════════════════════════════════════════════════════╗
║                  AWARDS & RECOGNITION                        ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  🏆 IBS Intelligence Award                                   ║
║     └─ For VolPay product development for Goldman Sachs     ║
║     └─ Recognized as top payment platform                   ║
║                                                              ║
║  🚀 Founding Engineer Impact - TartanHq                      ║
║     └─ Built platform from 0 to $66K/mo revenue             ║
║     └─ Onboarded 30,000 concurrent users                    ║
║                                                              ║
║  📈 10M+ Users Impacted                                      ║
║     └─ Africa expansion at Mastercard                       ║
║     └─ Enterprise scale across all roles                    ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝`,

  social: `
┌──────────────────────────────────────────────────────────────┐
│                    SOCIAL LINKS                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  💼 LinkedIn  → linkedin.com/in/pratikvdesai                 │
│  🐙 GitHub    → github.com/pratikdesai74                     │
│  📝 Medium    → medium.com/@pratikvilasdesai                 │
│  🧩 LeetCode  → leetcode.com/u/pratikvilasdesai              │
│  📧 Email     → pratikvilasdesai@gmail.com                   │
│                                                              │
│  Type 'contact' for more ways to reach out!                  │
│                                                              │
└──────────────────────────────────────────────────────────────┘`,

  ascii: `
    ____             __  _ __      ____                   _
   / __ \\_________ _/ /_(_) /__   / __ \\___  _________ _(_)
  / /_/ / ___/ __ \`/ __/ / //_/  / / / / _ \\/ ___/ __ \`/ /
 / ____/ /  / /_/ / /_/ / ,<    / /_/ /  __(__  ) /_/ / /
/_/   /_/   \\__,_/\\__/_/_/|_|  /_____/\\___/____/\\__,_/_/

        ╔═══════════════════════════════════════════╗
        ║  Building the future, one commit at a time ║
        ╚═══════════════════════════════════════════╝`,

  coffee: `
        ( (
         ) )
      ........
      |      |]
      \\      /
       \`----'

  ☕ Coffee Level: CRITICAL
  Status: Always coding with caffeine
  Preferred: Black, no sugar

  Fun fact: This portfolio was built with
  approximately 47 cups of coffee.`,

  resume: `
┌──────────────────────────────────────────────────────────────┐
│                    📄 RESUME                                 │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Downloading resume...                                       │
│  ████████████████████████████████████ 100%                   │
│                                                              │
│  ✅ Resume will open in a new tab!                           │
│                                                              │
│  Or visit: pratikdesai.dev/resume.pdf                        │
│                                                              │
└──────────────────────────────────────────────────────────────┘`,
};

const MATRIX_CHARS = "ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ01234789";

export default function InteractiveTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showMatrix, setShowMatrix] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    if (trimmedCmd === "") return;

    setCommandHistory((prev) => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    if (trimmedCmd === "clear") {
      setHistory([]);
      return;
    }

    if (trimmedCmd === "matrix") {
      setShowMatrix(true);
      setTimeout(() => setShowMatrix(false), 5000);
      setHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output: "Entering the matrix... (5 seconds of green rain)",
        },
      ]);
      return;
    }

    if (trimmedCmd === "resume") {
      window.open("/resume.pdf", "_blank");
    }

    const output = COMMANDS[trimmedCmd];

    if (output) {
      setHistory((prev) => [...prev, { command: cmd, output }]);
    } else {
      setHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output: `Command not found: ${cmd}\nType 'help' to see available commands.`,
          isError: true,
        },
      ]);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex < commandHistory.length - 1
            ? historyIndex + 1
            : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <>
      {/* Floating Terminal Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isOpen ? 0 : 1, y: isOpen ? 20 : 0 }}
        style={{ pointerEvents: isOpen ? "none" : "auto" }}
      >
        <Terminal className="w-6 h-6" />
      </motion.button>

      {/* Terminal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{
              opacity: 1,
              scale: isMinimized ? 0.5 : 1,
              y: isMinimized ? 300 : 0,
            }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-6 z-50 w-[700px] max-w-[calc(100vw-3rem)]"
          >
            <div className="bg-[#0d0d12] border border-[#1e1e2e] rounded-lg overflow-hidden shadow-2xl shadow-black/50">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#12121a] border-b border-[#1e1e2e]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
                    />
                    <button
                      onClick={() => setIsMinimized(!isMinimized)}
                      className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
                    />
                    <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors" />
                  </div>
                </div>
                <span className="text-sm text-zinc-500 font-mono">
                  pratik@portfolio:~
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="text-zinc-500 hover:text-zinc-300"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-zinc-500 hover:text-zinc-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Terminal Body */}
              {!isMinimized && (
                <div
                  ref={terminalRef}
                  className="h-[400px] overflow-y-auto p-4 font-mono text-sm relative"
                  onClick={() => inputRef.current?.focus()}
                >
                  {/* Matrix Rain Effect */}
                  {showMatrix && (
                    <div className="absolute inset-0 bg-black/90 overflow-hidden z-10">
                      {Array.from({ length: 50 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute text-green-500 text-xs font-mono whitespace-nowrap"
                          style={{ left: `${i * 2}%` }}
                          initial={{ y: -100 }}
                          animate={{ y: "100vh" }}
                          transition={{
                            duration: Math.random() * 2 + 1,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                          }}
                        >
                          {Array.from({ length: 20 })
                            .map(
                              () =>
                                MATRIX_CHARS[
                                  Math.floor(Math.random() * MATRIX_CHARS.length)
                                ]
                            )
                            .join("\n")}
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* Welcome Message */}
                  {history.length === 0 && (
                    <div className="text-zinc-400 mb-4">
                      <pre className="text-blue-400 text-xs mb-2">
{`  ____           _   _ _
 |  _ \\ _ __ __ _| |_(_) | __
 | |_) | '__/ _\` | __| | |/ /
 |  __/| | | (_| | |_| |   <
 |_|   |_|  \\__,_|\\__|_|_|\\_\\`}
                      </pre>
                      <p className="text-green-400">
                        Welcome to Pratik&apos;s Interactive Terminal!
                      </p>
                      <p className="text-zinc-500 mt-1">
                        Type{" "}
                        <span className="text-yellow-400">&apos;help&apos;</span> to
                        see available commands.
                      </p>
                    </div>
                  )}

                  {/* Command History */}
                  {history.map((entry, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-green-400">➜</span>
                        <span className="text-blue-400">~</span>
                        <span className="text-white">{entry.command}</span>
                      </div>
                      <pre
                        className={`mt-1 whitespace-pre-wrap ${
                          entry.isError ? "text-red-400" : "text-zinc-300"
                        }`}
                      >
                        {entry.output}
                      </pre>
                    </div>
                  ))}

                  {/* Input Line */}
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">➜</span>
                    <span className="text-blue-400">~</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="flex-1 bg-transparent outline-none text-white caret-green-400"
                      spellCheck={false}
                      autoComplete="off"
                    />
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="w-2 h-5 bg-green-400"
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
