"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { generateAgentMessage, type AgentMessage } from "@/utils/generateAgentMessage";
import { generateReasoningChain } from "@/utils/generateReasoningChain";
import { getRandomArchive } from "@/data/archives";
import type { ArchiveEntry } from "@/data/archives";

const MAX_MESSAGES = 50;
const MESSAGE_INTERVAL_MS = 2000 + Math.random() * 2000; // 2–4 sec
const REASONING_TYPING_MS = 80;
const SYSTEM_STATUS_MSGS = [
  "Scanning archive clusters...",
  "Analyzing memetic signals...",
  "Cross-referencing cultural artifacts...",
  "Signal strength evaluation...",
  "Network topology update...",
  "Linguistic pattern match...",
  "Memetic propagation trace...",
  "Null cluster scan...",
];

export default function AIAgentTerminal({
  onArchiveChange,
}: {
  onArchiveChange?: (archive: ArchiveEntry | null) => void;
}) {
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [currentArchive, setCurrentArchive] = useState<ArchiveEntry | null>(null);
  const [reasoningSteps, setReasoningSteps] = useState<string[]>([]);
  const [reasoningIndex, setReasoningIndex] = useState(0);
  const [reasoningDisplay, setReasoningDisplay] = useState("");
  const [systemStatus, setSystemStatus] = useState(SYSTEM_STATUS_MSGS[0]);
  const feedRef = useRef<HTMLDivElement>(null);
  const reasoningChainRef = useRef<string[]>([]);

  // Live agent messages every 2–4 sec
  useEffect(() => {
    const tick = () => {
      const msg = generateAgentMessage();
      setMessages((prev) => [msg, ...prev].slice(0, MAX_MESSAGES));
      setCurrentArchive(msg.archive);
      onArchiveChange?.(msg.archive);
      reasoningChainRef.current = generateReasoningChain(msg.archive);
      setReasoningSteps(reasoningChainRef.current);
      setReasoningIndex(0);
      setReasoningDisplay("");
    };
    tick();
    const id = setInterval(tick, MESSAGE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [onArchiveChange]);

  // Type reasoning steps one by one
  useEffect(() => {
    if (reasoningSteps.length === 0) return;
    if (reasoningIndex >= reasoningSteps.length) return;
    const step = reasoningSteps[reasoningIndex];
    let i = 0;
    const id = setInterval(() => {
      i++;
      setReasoningDisplay(step.slice(0, i));
      if (i >= step.length) {
        clearInterval(id);
        setReasoningIndex((prev) => prev + 1);
        setReasoningDisplay("");
      }
    }, REASONING_TYPING_MS);
    return () => clearInterval(id);
  }, [reasoningSteps, reasoningIndex]);

  // Rotate system status
  useEffect(() => {
    const id = setInterval(() => {
      setSystemStatus(SYSTEM_STATUS_MSGS[Math.floor(Math.random() * SYSTEM_STATUS_MSGS.length)]);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  // Auto-scroll feed
  useEffect(() => {
    feedRef.current?.scrollTo(0, 0);
  }, [messages]);

  return (
    <section className="py-16 md:py-24 px-4 section-content">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="font-display text-2xl sm:text-3xl font-bold text-neon mb-2 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          AI INTELLIGENCE TERMINAL
        </motion.h2>
        <motion.p
          className="font-mono text-cyan/80 text-center text-xs uppercase tracking-widest mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Live agent network · Archive excavation simulation
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 border-2 border-neon/40 rounded-none overflow-hidden bg-black/90 backdrop-blur-sm">
          {/* LEFT: Live AI conversation feed */}
          <div className="border-r border-neon/30 flex flex-col min-h-[360px]">
            <div className="px-4 py-2 border-b border-neon/30 bg-black/60 font-mono text-xs text-neon/80 uppercase">
              Live agent feed
            </div>
            <div
              ref={feedRef}
              className="flex-1 overflow-y-auto p-3 space-y-2 font-mono text-xs"
            >
              <AnimatePresence initial={false}>
                {messages.slice(0, 25).map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="border-l-2 border-cyan/50 pl-2 py-1 text-white/90"
                  >
                    <span className="text-cyan/90">[{m.agent.name}]</span>{" "}
                    {m.text}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* CENTER: Current archive */}
          <div className="border-r border-neon/30 flex flex-col min-h-[360px]">
            <div className="px-4 py-2 border-b border-neon/30 bg-black/60 font-mono text-xs text-neon/80 uppercase">
              Current archive
            </div>
            <div className="flex-1 overflow-y-auto p-4 font-mono text-sm space-y-2">
              {currentArchive ? (
                <motion.div
                  key={currentArchive.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-2"
                >
                  <p>
                    <span className="text-cyan/80">title:</span>{" "}
                    <span className="text-white">{currentArchive.title}</span>
                  </p>
                  <p>
                    <span className="text-cyan/80">year:</span>{" "}
                    <span className="text-white">{currentArchive.year}</span>
                  </p>
                  <p>
                    <span className="text-cyan/80">type:</span>{" "}
                    <span className="text-white">{currentArchive.type}</span>
                  </p>
                  <p>
                    <span className="text-cyan/80">tags:</span>{" "}
                    <span className="text-white/90">
                      {currentArchive.tags.join(", ")}
                    </span>
                  </p>
                  <p>
                    <span className="text-cyan/80">memeticScore:</span>{" "}
                    <span className="text-neon">{currentArchive.memeticScore}</span>
                  </p>
                  <p>
                    <span className="text-cyan/80">signalStrength:</span>{" "}
                    <span className="text-neon">
                      {currentArchive.signalStrength.toFixed(2)}
                    </span>
                  </p>
                  <p className="pt-2 border-t border-neon/20">
                    <span className="text-cyan/80">summary:</span>{" "}
                    <span className="text-white/80">{currentArchive.summary}</span>
                  </p>
                </motion.div>
              ) : (
                <p className="text-white/40">Waiting for archive...</p>
              )}
            </div>
          </div>

          {/* RIGHT: AI reasoning chain */}
          <div className="flex flex-col min-h-[360px]">
            <div className="px-4 py-2 border-b border-neon/30 bg-black/60 font-mono text-xs text-neon/80 uppercase">
              Reasoning chain
            </div>
            <div className="flex-1 overflow-y-auto p-4 font-mono text-xs text-white/80 space-y-1">
              {reasoningSteps.slice(0, reasoningIndex).map((step, i) => (
                <div key={i} className="text-neon/90">
                  {step}
                </div>
              ))}
              {reasoningDisplay && (
                <span className="text-neon/90 terminal-cursor">
                  {reasoningDisplay}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* BOTTOM: System status */}
        <div className="mt-4 px-4 py-3 border border-neon/30 rounded-none bg-black/60 font-mono text-xs text-cyan/90 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
          {systemStatus}
        </div>
      </div>
    </section>
  );
}
