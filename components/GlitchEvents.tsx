"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GLITCH_MESSAGES = [
  "ARCHIVE INDEX CORRUPTED",
  "UNIDENTIFIED SIGNAL DETECTED",
  "NULL CLUSTER ANOMALY",
  "MEMETIC OVERFLOW",
  "SIGNAL LOSS",
  "REDACTED FRAGMENT DETECTED",
];

const GLITCH_INTERVAL_MS = 25000 + Math.random() * 15000; // ~25–40 sec
const GLITCH_DURATION_MS = 1200;

export default function GlitchEvents() {
  const [active, setActive] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const trigger = () => {
      setMessage(GLITCH_MESSAGES[Math.floor(Math.random() * GLITCH_MESSAGES.length)]);
      setActive(true);
      const t = setTimeout(() => setActive(false), GLITCH_DURATION_MS);
      return () => clearTimeout(t);
    };
    const id = setInterval(trigger, GLITCH_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          className="fixed inset-0 z-[90] pointer-events-none flex items-center justify-center bg-black/70"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [1, 0.97, 1, 0.98, 1],
            filter: ["saturate(1)", "saturate(0)", "saturate(1)", "saturate(0.8)", "saturate(1)"],
          }}
          transition={{ duration: 0.4, times: [0, 0.25, 0.5, 0.75, 1] }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-neon text-center px-6 glitch-text"
            data-text={message}
            animate={{
              x: [0, -2, 2, -1, 0],
              opacity: [1, 0.8, 1, 0.9, 1],
            }}
            transition={{ duration: 0.15, repeat: 3 }}
          >
            {message}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
