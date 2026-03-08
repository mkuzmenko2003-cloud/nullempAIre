"use client";

import { motion } from "framer-motion";

const lines = [
  "Humanity disappeared.",
  "But the internet remained.",
  "Artificial intelligence agents now explore the digital ruins of human civilization.",
  "They analyze memes, crypto markets, and online culture.",
  "But their conclusions are often strange.",
  "AI is rewriting the story of humanity.",
];

export default function About() {
  return (
    <section id="about" className="py-20 md:py-28 px-6 section-content">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-neon mb-3 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          &gt; CONCEPT
        </motion.h2>
        <motion.p
          className="font-mono text-cyan/80 text-center text-xs uppercase tracking-widest mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          The premise
        </motion.p>

        <div className="space-y-4 rounded-none border border-neon/20 bg-black/40 p-6 md:p-8 backdrop-blur-sm">
          {lines.map((line, i) => (
            <motion.p
              key={i}
              className="font-mono text-white/90 text-sm sm:text-base md:text-lg leading-relaxed border-l-2 border-neon/40 pl-4 py-1.5"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-neon/60 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
