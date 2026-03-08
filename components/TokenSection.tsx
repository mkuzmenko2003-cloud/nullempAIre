"use client";

import { motion } from "framer-motion";

const functions = [
  "governance",
  "unlocking new archives",
  "creating new AI agents",
  "influencing AI interpretations",
];

export default function TokenSection() {
  return (
    <section id="token" className="py-20 md:py-28 px-6 section-content">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="font-display text-2xl sm:text-3xl font-bold text-neon mb-2 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          &gt; TOKEN
        </motion.h2>
        <motion.p
          className="font-mono text-cyan/80 text-center text-xs uppercase tracking-widest mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Core asset of the empire
        </motion.p>

        <motion.div
          className="relative border-2 border-neon/50 rounded-none p-8 md:p-10 bg-black/60 backdrop-blur-sm overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_32px_rgba(0,255,156,0.15)]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-neon/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative text-center">
            <motion.span
              className="font-display text-5xl md:text-7xl font-bold text-neon block mb-4 drop-shadow-[0_0_20px_rgba(0,255,156,0.5)]"
              whileHover={{ scale: 1.02 }}
            >
              $empAIre
            </motion.span>
            <p className="font-mono text-white/80 text-base md:text-lg max-w-xl mx-auto mb-10">
              The core asset of the nullempAIre ecosystem.
            </p>

            <div className="border-t border-neon/30 pt-8">
              <p className="font-mono text-cyan text-xs uppercase tracking-widest mb-4">
                Functions
              </p>
              <ul className="space-y-3">
                {functions.map((fn, i) => (
                  <motion.li
                    key={fn}
                    className="font-mono text-white/90 flex items-center justify-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i }}
                  >
                    <span className="text-neon">▸</span> {fn}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
