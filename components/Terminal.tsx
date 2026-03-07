"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ARCHIVE_ARTIFACTS } from "@/lib/archiveData";

const COMMANDS: Record<string, string[]> = {
  "scan archive": [
    "Scanning archives...",
    "Artifact discovered: " +
      ARCHIVE_ARTIFACTS[Math.floor(Math.random() * ARCHIVE_ARTIFACTS.length)]
        .title,
    "Interpretation: " +
      ARCHIVE_ARTIFACTS[Math.floor(Math.random() * ARCHIVE_ARTIFACTS.length)]
        .interpretation,
  ],
  "find meme": [
    "Searching meme clusters...",
    "Artifact discovered: Pepe Meme",
    "Interpretation: Symbol of ancient internet tribes.",
  ],
  "analyze bitcoin": [
    "Analyzing Bitcoin-related artifacts...",
    "Artifact discovered: Bitcoin Pizza Day",
    "Interpretation: Humans exchanged digital gold for bread offerings.",
  ],
  help: [
    "Available commands:",
    "  scan archive - discover random artifact",
    "  find meme   - search meme economy",
    "  analyze bitcoin - analyze Bitcoin ritual",
    "  clear - clear terminal",
  ],
  clear: [],
};

const DEFAULT_RESPONSE = [
  "Unknown command. Type 'help' for available commands.",
];

export default function Terminal() {
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<{ type: "in" | "out"; text: string }[]>([
    {
      type: "out",
      text: "nullempAIre archive terminal. Type a command and press Enter.",
    },
    { type: "out", text: "Try: scan archive | find meme | analyze bitcoin | help" },
  ]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const el = scrollContainerRef.current;
      el.scrollTop = el.scrollHeight;
    }
  }, [lines]);

  const submit = () => {
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    setLines((prev) => [...prev, { type: "in", text: `> ${cmd}` }]);
    setInput("");

    const response =
      COMMANDS[cmd] ?? (cmd === "clear" ? [] : DEFAULT_RESPONSE);

    if (cmd === "clear") {
      setLines([
        { type: "out", text: "Terminal cleared. Type a command." },
      ]);
      return;
    }

    response.forEach((text, i) => {
      setTimeout(() => {
        setLines((prev) => [...prev, { type: "out", text }]);
      }, (i + 1) * 400);
    });
  };

  return (
    <section id="terminal" className="py-20 md:py-28 px-6 section-content">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="font-display text-2xl sm:text-3xl font-bold text-neon mb-2 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          AI TERMINAL MODE
        </motion.h2>
        <motion.p
          className="font-mono text-cyan/80 text-center text-xs uppercase tracking-widest mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Type commands to query the archive
        </motion.p>

        <motion.div
          className="border-2 border-neon/40 rounded-xl overflow-hidden bg-black/90 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-neon/30 bg-neon/5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-neon/80" />
            <span className="font-mono text-xs text-neon/80 ml-3">
              terminal
            </span>
          </div>

          <div
            ref={scrollContainerRef}
            className="p-4 min-h-[260px] max-h-[320px] overflow-y-auto font-mono text-sm cursor-text"
            onClick={() => inputRef.current?.focus()}
          >
            {lines.map((line, i) => (
              <p
                key={i}
                className={
                  line.type === "in"
                    ? "text-cyan mb-1"
                    : "text-white/80 mb-1"
                }
              >
                {line.text}
              </p>
            ))}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-neon">▸</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                className="flex-1 bg-transparent border-none outline-none text-white font-mono text-sm placeholder-white/40"
                placeholder="Type command..."
                autoComplete="off"
                spellCheck={false}
              />
              <span className="terminal-cursor text-neon" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
