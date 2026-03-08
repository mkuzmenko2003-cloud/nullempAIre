"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { ARCHIVE_ARTIFACTS } from "@/lib/archiveData";

function getDailyArtifact() {
  const start = new Date(2025, 0, 1);
  const now = new Date();
  const day = Math.floor(
    (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );
  return ARCHIVE_ARTIFACTS[day % ARCHIVE_ARTIFACTS.length];
}

export default function DailyDiscovery() {
  const artifact = useMemo(getDailyArtifact, []);
  const dayNum = useMemo(() => {
    const start = new Date(2025, 0, 1);
    const now = new Date();
    return (
      Math.floor(
        (now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
      ) + 1
    );
  }, []);

  return (
    <section id="daily" className="py-20 md:py-28 px-6 section-content">
      <div className="max-w-2xl mx-auto">
        <motion.h2
          className="font-display text-2xl sm:text-3xl font-bold text-neon mb-2 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          DAILY AI DISCOVERY
        </motion.h2>
        <motion.p
          className="font-mono text-cyan/80 text-center text-xs uppercase tracking-widest mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          One artifact revealed per day
        </motion.p>

        <motion.div
          className="border-2 border-cyan/40 rounded-none p-6 md:p-8 bg-black/60 backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(0,234,255,0.12)]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-cyan text-sm uppercase mb-4">
            DAY {dayNum} DISCOVERY
          </p>
          <p className="font-display text-2xl md:text-3xl font-bold text-white mb-6">
            {artifact.title}
          </p>
          <p className="font-mono text-white/60 text-sm mb-4">
            {artifact.year} · {artifact.category}
          </p>
          <p className="font-mono text-cyan/90 text-xs uppercase mb-2">
            AI conclusion:
          </p>
          <p className="font-mono text-white/90 text-sm leading-relaxed">
            {artifact.interpretation}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
