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
    <section id="about" className="py-24 md:py-32 px-6 section-content">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-neon mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          &gt; CONCEPT
        </motion.h2>

        <div className="space-y-6">
          {lines.map((line, i) => (
            <motion.p
              key={i}
              className="font-mono text-white/90 text-base sm:text-lg md:text-xl leading-relaxed border-l-2 border-neon/50 pl-6 py-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {line}
            </motion.p>
          ))}
        </div>

        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-neon to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
