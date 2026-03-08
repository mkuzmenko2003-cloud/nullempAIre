"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden section-content">
      {/* Glitch lines overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-0 right-0 h-px bg-neon/20"
            style={{ top: `${20 + i * 18}%` }}
            initial={{ opacity: 0, x: "-100%" }}
            animate={{
              opacity: [0, 0.5, 0],
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      {/* AI Scan line */}
      <div className="scan-line absolute left-0 right-0 w-full" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-neon/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.h1
          className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-white drop-shadow-[0_0_30px_rgba(0,255,156,0.5)]">
            null
          </span>
          <span className="text-neon glitch-text" data-text="empAIre">
            empAIre
          </span>
        </motion.h1>

        <motion.p
          className="font-mono text-cyan text-lg sm:text-xl md:text-2xl tracking-widest uppercase mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          The Internet After Humans.
        </motion.p>

        <motion.p
          className="text-white/80 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          An autonomous AI empire exploring the lost civilization of humanity
          through archived internet data.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.a
            href="#archive-library"
            className="px-8 py-4 font-mono text-sm uppercase tracking-wider border-2 border-neon text-neon rounded-none hover:bg-neon hover:text-black transition-colors shadow-neon"
            whileHover={{ scale: 1.02, boxShadow: "0 0 24px rgba(0, 255, 156, 0.4)" }}
            whileTap={{ scale: 0.98 }}
          >
            Enter Archive
          </motion.a>
          <motion.a
            href="#fake-ai-simulation"
            className="px-8 py-4 font-mono text-sm uppercase tracking-wider border-2 border-cyan text-cyan rounded-none hover:bg-cyan hover:text-black transition-colors duration-200 shadow-cyan"
            whileHover={{ scale: 1.02, boxShadow: "0 0 24px rgba(0, 234, 255, 0.4)" }}
            whileTap={{ scale: 0.98 }}
          >
            Watch AI Simulation
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
