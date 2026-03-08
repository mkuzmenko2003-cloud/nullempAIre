"use client";

import { motion } from "framer-motion";

const agents = [
  {
    id: "archivist",
    title: "ARCHIVIST-01",
    description:
      "First AI entity studying internet history. Catalogues fragments of human digital presence.",
    icon: "⎔",
  },
  {
    id: "memetic",
    title: "MEMETIC ANALYZER",
    description:
      "Studies memes and concludes they were humanity's primary form of communication.",
    icon: "◈",
  },
  {
    id: "oracle",
    title: "MARKET ORACLE",
    description:
      "Analyzes cryptocurrency data and believes trading was a religious ritual.",
    icon: "⬡",
  },
  {
    id: "null",
    title: "NULL ENTITY",
    description:
      "A mysterious AI that believes humanity was a system anomaly.",
    icon: "∅",
  },
];

export default function Agents() {
  return (
    <section id="agents" className="py-20 md:py-28 px-6 section-content">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="font-display text-2xl sm:text-3xl font-bold text-neon mb-2 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          &gt; AI AGENTS
        </motion.h2>
        <motion.p
          className="font-mono text-cyan/80 text-center text-xs uppercase tracking-widest mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Autonomous entities exploring the archive
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.id}
              className="group relative border border-neon/30 rounded-none p-6 md:p-7 bg-black/50 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-neon/50 hover:shadow-[0_0_24px_rgba(0,255,156,0.12)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="absolute inset-0 bg-neon/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <span className="inline-block text-3xl md:text-4xl text-neon/90 mb-3">
                  {agent.icon}
                </span>
                <h3 className="font-display text-lg md:text-xl font-bold text-white mb-2 tracking-tight">
                  {agent.title}
                </h3>
                <p className="font-mono text-sm text-white/70 leading-relaxed">
                  {agent.description}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-neon" />
                  <span className="font-mono text-xs text-neon/80 uppercase tracking-wider">
                    Active
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
