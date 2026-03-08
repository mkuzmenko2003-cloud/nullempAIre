"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { generateAgentMessage, type AgentMessage } from "@/utils/generateAgentMessage";
import { generateReasoningChain } from "@/utils/generateReasoningChain";
import type { ArchiveEntry } from "@/data/archives";

const MAX_MESSAGES = 18;
const REASONING_TYPING_MS = 100;
const REASONING_DONE_DELAY_MS = 2500; // pause after all steps typed, then next archive
const DISPLAY_MESSAGES = 10;
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
  const scheduledNextRef = useRef(false);
  const nextTickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const tick = useCallback(() => {
    scheduledNextRef.current = false;
    if (nextTickTimeoutRef.current) {
      clearTimeout(nextTickTimeoutRef.current);
      nextTickTimeoutRef.current = null;
    }
    const msg = generateAgentMessage();
    setMessages((prev) => [msg, ...prev].slice(0, MAX_MESSAGES));
    setCurrentArchive(msg.archive);
    onArchiveChange?.(msg.archive);
    const chain = generateReasoningChain(msg.archive);
    setReasoningSteps(chain);
    setReasoningIndex(0);
    setReasoningDisplay("");
  }, [onArchiveChange]);

  // First tick on mount; next ticks only after reasoning chain is fully typed
  useEffect(() => {
    tick();
  }, [tick]);

  // When all reasoning steps are done, schedule next archive after a short pause
  useEffect(() => {
    if (
      reasoningSteps.length === 0 ||
      reasoningIndex < reasoningSteps.length ||
      scheduledNextRef.current
    )
      return;
    scheduledNextRef.current = true;
    nextTickTimeoutRef.current = setTimeout(() => {
      nextTickTimeoutRef.current = null;
      scheduledNextRef.current = false;
      tick();
    }, REASONING_DONE_DELAY_MS);
    return () => {
      if (nextTickTimeoutRef.current) {
        clearTimeout(nextTickTimeoutRef.current);
        nextTickTimeoutRef.current = null;
      }
    };
  }, [reasoningSteps.length, reasoningIndex, tick]);

  // Smooth scroll to top when new message arrives
  const prevLenRef = useRef(0);
  useEffect(() => {
    if (messages.length > prevLenRef.current && feedRef.current) {
      feedRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
    prevLenRef.current = messages.length;
  }, [messages.length]);

  // Type reasoning steps one by one (no new archive until this finishes)
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

  // Rotate system status every 12 sec (no flicker, calm)
  useEffect(() => {
    const id = setInterval(() => {
      setSystemStatus((prev) => {
        const next = SYSTEM_STATUS_MSGS[Math.floor(Math.random() * SYSTEM_STATUS_MSGS.length)];
        return next === prev ? SYSTEM_STATUS_MSGS[(SYSTEM_STATUS_MSGS.indexOf(prev) + 1) % SYSTEM_STATUS_MSGS.length] : next;
      });
    }, 12000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="py-10 md:py-14 px-4 section-content">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 border-2 border-neon/40 rounded-none overflow-hidden bg-black/90 backdrop-blur-sm max-h-[320px]">
          {/* LEFT: Live AI conversation feed — capped height, fewer messages */}
          <div className="border-r border-neon/30 flex flex-col min-h-[240px] max-h-[320px]">
            <div className="px-4 py-2 border-b border-neon/30 bg-black/60 font-mono text-xs text-neon/80 uppercase shrink-0">
              Live agent feed
            </div>
            <div
              ref={feedRef}
              className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-1.5 font-mono text-xs min-h-0 scroll-smooth"
              style={{ scrollBehavior: "smooth" }}
            >
              {messages.slice(0, DISPLAY_MESSAGES).map((m) => (
                <div
                  key={m.id}
                  className="border-l-2 border-cyan/50 pl-2 py-0.5 text-white/90 feed-row"
                >
                  <span className="text-cyan/90">[{m.agent.name}]</span>{" "}
                  {m.text}
                </div>
              ))}
            </div>
          </div>

          {/* CENTER: Current archive */}
          <div className="border-r border-neon/30 flex flex-col min-h-[240px] max-h-[320px] min-w-0">
            <div className="px-4 py-2 border-b border-neon/30 bg-black/60 font-mono text-xs text-neon/80 uppercase shrink-0">
              Current archive
            </div>
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 font-mono text-sm space-y-2 min-h-0">
              {currentArchive ? (
                <div key={currentArchive.id} className="space-y-2 opacity-100 transition-opacity duration-300">
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
                </div>
              ) : (
                <p className="text-white/40">Waiting for archive...</p>
              )}
            </div>
          </div>

          {/* RIGHT: AI reasoning chain */}
          <div className="flex flex-col min-h-[240px] max-h-[320px] min-w-0">
            <div className="px-4 py-2 border-b border-neon/30 bg-black/60 font-mono text-xs text-neon/80 uppercase shrink-0">
              Reasoning chain
            </div>
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 font-mono text-xs text-white/80 space-y-1 min-h-0">
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

        {/* BOTTOM: System status — no pulse to avoid flicker */}
        <div className="mt-4 px-4 py-3 border border-neon/30 rounded-none bg-black/60 font-mono text-xs text-cyan/90 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-neon" />
          {systemStatus}
        </div>
      </div>
    </section>
  );
}
