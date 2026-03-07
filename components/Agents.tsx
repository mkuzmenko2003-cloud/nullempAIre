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
    <section id="agents" className="py-24 md:py-32 px-6 section-content">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-neon mb-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          &gt; AI AGENTS
        </motion.h2>
        <motion.p
          className="font-mono text-cyan/80 text-center text-sm uppercase tracking-widest mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Autonomous entities exploring the archive
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.id}
              className="group relative border border-neon/30 rounded-none p-6 md:p-8 bg-black/50 backdrop-blur-sm overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{
                borderColor: "rgba(0, 255, 156, 0.6)",
                boxShadow: "0 0 30px rgba(0, 255, 156, 0.15)",
              }}
            >
              <div className="absolute inset-0 bg-neon/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <motion.span
                  className="inline-block text-4xl md:text-5xl text-neon mb-4"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {agent.icon}
                </motion.span>
                <h3 className="font-display text-xl md:text-2xl font-bold text-white mb-3 tracking-tight">
                  {agent.title}
                </h3>
                <p className="font-mono text-sm text-white/70 leading-relaxed">
                  {agent.description}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
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
