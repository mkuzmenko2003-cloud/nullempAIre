"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ACTIVITY_MESSAGES } from "@/lib/archiveData";

const INTERVAL_MS = 3500;

export default function ActivityFeed() {
  const [messages, setMessages] = useState<string[]>(() =>
    ACTIVITY_MESSAGES.slice(0, 4)
  );
  const indexRef = useRef(4);

  useEffect(() => {
    const t = setInterval(() => {
      const idx = indexRef.current % ACTIVITY_MESSAGES.length;
      indexRef.current += 1;
      setMessages((prev) =>
        prev.length < 8
          ? [...prev, ACTIVITY_MESSAGES[idx]]
          : [...prev.slice(1), ACTIVITY_MESSAGES[idx]]
      );
    }, INTERVAL_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-16 px-6 section-content">
      <div className="max-w-2xl mx-auto">
        <motion.h2
          className="font-display text-xl sm:text-2xl font-bold text-neon mb-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          LIVE AI ACTIVITY FEED
        </motion.h2>

        <motion.div
          className="border border-neon/30 rounded-lg overflow-hidden bg-black/60 backdrop-blur-sm max-h-[280px] overflow-y-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="p-4 space-y-2 font-mono text-xs text-white/80">
            {messages.map((msg, i) => (
              <motion.p
                key={`${i}-${msg.slice(0, 20)}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-2"
              >
                <span className="text-neon shrink-0">[{new Date().toLocaleTimeString("en-GB", { hour12: false })}]</span>
                {msg}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
