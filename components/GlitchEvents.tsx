"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const GLITCH_MESSAGES = [
  "ARCHIVE INDEX CORRUPTED",
  "UNIDENTIFIED SIGNAL DETECTED",
  "NULL CLUSTER ANOMALY",
  "MEMETIC OVERFLOW",
  "SIGNAL LOSS",
  "REDACTED FRAGMENT DETECTED",
];

const GLITCH_INTERVAL_MS = 70000; // ~70 sec (was 25–40)
const GLITCH_DURATION_MS = 500;

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

  if (!active) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[90] pointer-events-none flex items-center justify-center bg-black/40"
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0.9, 0.95, 0.9],
        filter: ["saturate(1)", "saturate(0.7)", "saturate(1)"],
      }}
      transition={{ duration: 0.25, times: [0, 0.5, 1] }}
    >
      <span className="font-display text-lg sm:text-xl font-bold text-neon/90 text-center px-4">
        {message}
      </span>
    </motion.div>
  );
}
