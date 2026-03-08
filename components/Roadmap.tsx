"use client";

import { motion } from "framer-motion";

const phases = [
  {
    phase: 1,
    title: "AI Awakening",
    items: ["Token launch", "First AI agents activated"],
  },
  {
    phase: 2,
    title: "Archive Discovery",
    items: ["AI begins analyzing internet artifacts."],
  },
  {
    phase: 3,
    title: "AI Evolution",
    items: ["Community can create new AI agents."],
  },
  {
    phase: 4,
    title: "New History",
    items: [
      "AI establishes its interpretation of human civilization.",
    ],
  },
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="py-20 md:py-28 px-6 section-content">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="font-display text-2xl sm:text-3xl font-bold text-neon mb-2 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          &gt; ROADMAP
        </motion.h2>
        <motion.p
          className="font-mono text-cyan/80 text-center text-xs uppercase tracking-widest mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Timeline of the empire
        </motion.p>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-neon/30 -translate-x-1/2" />

          <div className="space-y-12">
            {phases.map((p, i) => (
              <motion.div
                key={p.phase}
                className={`relative flex flex-col md:flex-row gap-6 items-start ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {/* Node */}
                <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-neon border-2 border-black -translate-x-1/2 mt-2 z-10 shadow-[0_0_15px_rgba(0,255,156,0.5)]" />

                <div
                  className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${
                    i % 2 === 1 ? "md:pr-8 md:text-right" : "md:pl-8"
                  }`}
                >
                  <div className="border border-neon/40 rounded-none p-6 bg-black/50 backdrop-blur-sm hover:border-neon/60 transition-colors">
                    <span className="font-mono text-cyan text-sm uppercase tracking-wider">
                      Phase {p.phase}
                    </span>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-white mt-2 mb-4">
                      {p.title}
                    </h3>
                    <ul
                      className={`space-y-2 font-mono text-sm text-white/80 ${
                        i % 2 === 1 ? "md:ml-auto md:flex md:flex-col md:items-end" : ""
                      }`}
                    >
                      {p.items.map((item) => (
                        <li
                          key={item}
                          className={`flex items-center gap-2 min-h-[1.25rem] text-left ${
                            i % 2 === 1 ? "md:justify-end" : ""
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-neon shrink-0 flex-shrink-0" aria-hidden />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
