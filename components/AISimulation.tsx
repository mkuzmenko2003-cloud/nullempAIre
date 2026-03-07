"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ARCHIVE_ARTIFACTS } from "@/lib/archiveData";

const PHASES = ["scanning", "found", "analyzing", "conclusion"] as const;

export default function AISimulation() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<typeof PHASES[number]>("scanning");
  const artifact = ARCHIVE_ARTIFACTS[index % ARCHIVE_ARTIFACTS.length];

  useEffect(() => {
    const phaseTimings = [2000, 2500, 2000, 3000];
    const phaseIdx = PHASES.indexOf(phase);
    const delay = phaseTimings[phaseIdx];
    const t = setTimeout(() => {
      const next = (phaseIdx + 1) % PHASES.length;
      setPhase(PHASES[next]);
      if (next === 0) setIndex((i) => i + 1);
    }, delay);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <section id="simulation" className="py-20 md:py-28 px-6 section-content">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="font-display text-2xl sm:text-3xl font-bold text-neon mb-2 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          AI EXCAVATION SIMULATION
        </motion.h2>
        <motion.p
          className="font-mono text-cyan/80 text-center text-xs uppercase tracking-widest mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Live archive scanning
        </motion.p>

        <motion.div
          className="border-2 border-neon/40 rounded-none overflow-hidden bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ boxShadow: "0 0 30px rgba(0, 255, 156, 0.15)" }}
        >
          {/* Scanner header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-neon/30 bg-neon/5">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-neon/80" />
            </div>
            <span className="font-mono text-xs text-neon/80 ml-3">
              nullempAIre_scanner
            </span>
          </div>

          {/* Scan line animation */}
          <div className="relative h-1 bg-black/50 overflow-hidden">
            <motion.div
              className="absolute inset-y-0 w-full bg-gradient-to-r from-transparent via-neon/60 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="p-6 min-h-[280px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {phase === "scanning" && (
                <motion.div
                  key="scanning"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <p className="font-mono text-cyan text-sm uppercase tracking-wider mb-2">
                    AI SCANNING INTERNET ARCHIVES...
                  </p>
                  <motion.div
                    className="flex justify-center gap-1 mt-4"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {[0, 1, 2, 3, 4].map((i) => (
                      <span
                        key={i}
                        className="w-2 h-2 rounded-full bg-neon"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              )}

              {phase === "found" && (
                <motion.div
                  key="found"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <p className="font-mono text-neon text-xs uppercase mb-4">
                    ARCHIVE FOUND
                  </p>
                  <p className="font-display text-2xl md:text-3xl font-bold text-white mb-1">
                    {artifact.title}
                  </p>
                  <p className="font-mono text-white/60 text-sm">
                    YEAR: {artifact.year}
                  </p>
                </motion.div>
              )}

              {phase === "analyzing" && (
                <motion.div
                  key="analyzing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <p className="font-mono text-cyan text-sm uppercase tracking-wider">
                    AI ANALYSIS IN PROGRESS...
                  </p>
                  <p className="font-mono text-white/50 text-sm mt-2">
                    Neural networks interpreting artifact
                  </p>
                </motion.div>
              )}

              {phase === "conclusion" && (
                <motion.div
                  key="conclusion"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-left"
                >
                  <p className="font-mono text-neon text-xs uppercase mb-2">
                    Conclusion:
                  </p>
                  <p className="font-mono text-white/90 text-sm leading-relaxed">
                    {artifact.interpretation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="px-4 py-2 border-t border-neon/20 bg-black/50 font-mono text-xs text-white/40">
            Artifact {index + 1} / {ARCHIVE_ARTIFACTS.length} in queue
          </div>
        </motion.div>
      </div>
    </section>
  );
}
