"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ARCHIVES, type ArchiveItem } from "@/data/archives";
import ArchiveFeed, { type FeedDiscovery } from "./ArchiveFeed";

type Phase = "idle" | "scanning" | "found" | "interpretation";

const SCAN_DURATION_MS = 2600;
const FOUND_DURATION_MS = 2700;
const INTERPRETATION_DURATION_MS = 2700;
const NEXT_CYCLE_DELAY_MS = 1800;

export default function FakeAISimulation() {
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [currentArchive, setCurrentArchive] = useState<ArchiveItem | null>(null);
  const [feedItems, setFeedItems] = useState<FeedDiscovery[]>([]);
  const [scanText, setScanText] = useState("AI scanning archives");
  const sequenceRef = useRef(0);
  const indexRef = useRef(0);
  const isRunningRef = useRef(false);
  isRunningRef.current = isRunning;

  const pushToFeed = useCallback((archive: ArchiveItem) => {
    sequenceRef.current += 1;
    setFeedItems((prev) => [
      {
        id: `${archive.id}-${Date.now()}`,
        title: archive.title,
        aiInterpretation: archive.aiInterpretation,
        timestamp: new Date(),
        sequence: sequenceRef.current,
      },
      ...prev.slice(0, 9),
    ]);
  }, []);

  const runOneCycle = useCallback(() => {
    const archive = ARCHIVES[indexRef.current % ARCHIVES.length];
    indexRef.current += 1;
    setCurrentArchive(archive);
    setPhase("scanning");

    const t1 = setTimeout(() => setPhase("found"), SCAN_DURATION_MS);
    const t2 = setTimeout(
      () => setPhase("interpretation"),
      SCAN_DURATION_MS + FOUND_DURATION_MS
    );
    const t3 = setTimeout(() => {
      pushToFeed(archive);
      if (!isRunningRef.current) {
        setPhase("idle");
        setCurrentArchive(null);
        return;
      }
      setTimeout(runOneCycle, NEXT_CYCLE_DELAY_MS);
    }, SCAN_DURATION_MS + FOUND_DURATION_MS + INTERPRETATION_DURATION_MS);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [pushToFeed]);

  useEffect(() => {
    if (phase !== "scanning") return;
    const full = "AI scanning archives...";
    let i = 0;
    const id = setInterval(() => {
      setScanText(full.slice(0, i + 1));
      i++;
      if (i >= full.length) clearInterval(id);
    }, 80);
    return () => clearInterval(id);
  }, [phase, isRunning]);

  const handleStart = () => {
    if (isRunning) return;
    setIsRunning(true);
    indexRef.current = 0;
    runOneCycle();
  };

  const handleStop = () => {
    setIsRunning(false);
    setPhase("idle");
    setCurrentArchive(null);
  };

  return (
    <section
      id="fake-ai-simulation"
      className="py-20 md:py-28 px-6 section-content"
    >
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="font-display text-2xl sm:text-3xl font-bold text-neon mb-2 text-center glitch-rgb"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          AI ARCHIVE GENERATION
        </motion.h2>
        <motion.p
          className="font-mono text-cyan/80 text-center text-xs uppercase tracking-widest mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Simulated discovery and analysis · neural terminal
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Simulation terminal */}
          <div className="lg:col-span-3 space-y-4">
            <motion.div
              className="relative border-2 border-neon/50 rounded-xl overflow-hidden bg-black shadow-[0_0_30px_rgba(0,255,156,0.08)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ boxShadow: "0 0 40px rgba(0, 255, 156, 0.12)" }}
            >
              {/* Scan line overlay */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-xl">
                <div className="ai-terminal-scan" />
              </div>

              <div className="relative min-h-[280px] p-6 pt-8">
                <AnimatePresence mode="wait">
                  {phase === "idle" && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-6"
                    >
                      <p className="font-mono text-white/50 text-sm mb-6">
                        Initialize AI archive scanner
                      </p>
                      <motion.button
                        onClick={handleStart}
                        className="px-8 py-4 font-mono text-sm uppercase tracking-wider border-2 border-neon text-neon rounded-lg hover:bg-neon hover:text-black transition-colors shadow-[0_0_20px_rgba(0,255,156,0.25)]"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Start AI Simulation
                      </motion.button>
                    </motion.div>
                  )}

                  {phase === "scanning" && (
                    <motion.div
                      key="scanning"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-8"
                    >
                      <p className="font-mono text-cyan text-sm">
                        {scanText}
                        <span className="text-neon terminal-cursor ml-0.5" />
                      </p>
                      <motion.div
                        className="flex justify-center gap-1.5 mt-6"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                      >
                        {[0, 1, 2, 3, 4].map((i) => (
                          <span
                            key={i}
                            className="w-2 h-2 rounded-full bg-neon"
                          />
                        ))}
                      </motion.div>
                    </motion.div>
                  )}

                  {phase === "found" && currentArchive && (
                    <motion.div
                      key="found"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-4"
                    >
                      <p className="font-mono text-cyan/80 text-xs uppercase mb-3 tracking-widest">
                        Archive found
                      </p>
                      <p className="font-display text-xl md:text-2xl font-bold text-neon glitch-flicker glitch-rgb">
                        {currentArchive.title}
                      </p>
                      <p className="font-mono text-white/50 text-xs mt-2">
                        {currentArchive.year} · {currentArchive.type}
                      </p>
                    </motion.div>
                  )}

                  {phase === "interpretation" && currentArchive && (
                    <motion.div
                      key="interpretation"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-2"
                    >
                      <p className="font-mono text-cyan/80 text-xs uppercase tracking-widest">
                        AI interpretation
                      </p>
                      <p className="font-mono text-white/90 text-sm leading-relaxed glitch-flicker">
                        {currentArchive.aiInterpretation}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="px-4 py-2 border-t border-neon/20 bg-black/60 font-mono text-[10px] text-white/40">
                nullempAIre_archive_scanner · {phase.toUpperCase()}
              </div>
            </motion.div>

            {isRunning && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-center"
              >
                <button
                  onClick={handleStop}
                  className="font-mono text-xs text-cyan/80 hover:text-cyan border border-cyan/40 px-4 py-2 rounded transition-colors"
                >
                  Stop simulation
                </button>
              </motion.div>
            )}
          </div>

          {/* Feed */}
          <div className="lg:col-span-2">
            <ArchiveFeed items={feedItems} />
          </div>
        </div>
      </div>
    </section>
  );
}
