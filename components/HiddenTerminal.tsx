"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HIDDEN_TERMINAL_COMMANDS,
  decodeBase64Clue,
  CLUE_BASE64,
} from "@/utils/argEngine";
import { getLoreByCondition } from "@/data/lore";

export default function HiddenTerminal() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<{ type: "in" | "out"; text: string }[]>([
    { type: "out", text: "Hidden terminal. Type 'help' for commands." },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "N") {
        e.preventDefault();
        setOpen((o) => !o);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const runCommand = (cmd: string) => {
    const c = cmd.trim().toLowerCase();
    if (!c) return;

    setLines((prev) => [...prev, { type: "in", text: `> ${cmd}` }]);

    if (c === "help") {
      const out = Object.entries(HIDDEN_TERMINAL_COMMANDS)
        .map(([k, v]) => `  ${k} — ${v.description}`)
        .join("\n");
      setLines((prev) => [...prev, { type: "out", text: out }]);
      return;
    }

    if (c === "scan_null_cluster") {
      const lore = getLoreByCondition("scan_null_cluster");
      setLines((prev) => [
        ...prev,
        { type: "out", text: "Scanning null cluster..." },
        { type: "out", text: lore ? `[LORE] ${lore.title}: ${lore.text}` : "No anomaly." },
      ]);
      return;
    }

    if (c === "decode_signal") {
      const decoded = decodeBase64Clue(CLUE_BASE64);
      const lore = getLoreByCondition("decode_signal");
      setLines((prev) => [
        ...prev,
        { type: "out" as const, text: `Decoded: "${decoded}"` },
        ...(lore ? [{ type: "out" as const, text: "[LORE] " + lore.text }] : []),
      ]);
      return;
    }

    if (c === "open_redacted_archive") {
      const lore = getLoreByCondition("open_redacted_archive");
      setLines((prev) => [
        ...prev,
        { type: "out", text: "Access denied. Fragment recovered:" },
        { type: "out", text: lore ? `[LORE] ${lore.title}: ${lore.text}` : "[REDACTED]" },
      ]);
      return;
    }

    setLines((prev) => [
      ...prev,
      { type: "out", text: `Unknown command: ${c}. Type 'help'.` },
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    runCommand(input);
    setInput("");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div
            className="border-2 border-magenta/60 rounded-none bg-black w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-[0_0_40px_rgba(255,0,200,0.15)]"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center px-4 py-2 border-b border-magenta/40 bg-black/80">
              <span className="font-mono text-sm text-magenta">HIDDEN TERMINAL</span>
              <button
                onClick={() => setOpen(false)}
                className="text-white/60 hover:text-white font-mono"
              >
                ✕
              </button>
            </div>
            <div className="p-4 font-mono text-xs text-cyan/90 overflow-y-auto max-h-[60vh]">
              {lines.map((line, i) => (
                <div
                  key={i}
                  className={line.type === "in" ? "text-neon/90" : "text-white/80"}
                >
                  {line.text}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
            <form onSubmit={handleSubmit} className="flex border-t border-magenta/40 p-2">
              <span className="text-magenta pr-2">{">"}</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent text-white font-mono text-sm outline-none"
                placeholder="Type command..."
                autoComplete="off"
              />
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
