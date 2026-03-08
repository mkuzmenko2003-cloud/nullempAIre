"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BOOT_MESSAGES } from "@/lib/archiveData";

type BootScreenProps = {
  onComplete: () => void;
};

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (currentLine >= BOOT_MESSAGES.length) {
      const t = setTimeout(onComplete, 800);
      return () => clearTimeout(t);
    }

    const msg = BOOT_MESSAGES[currentLine];
    let i = 0;
    const interval = setInterval(() => {
      if (i <= msg.length) {
        setDisplayedText(msg.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
        const next = setTimeout(() => {
          setCurrentLine((c) => c + 1);
          setDisplayedText("");
        }, 400);
        return () => clearTimeout(next);
      }
    }, 35);
    return () => clearInterval(interval);
  }, [currentLine, onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center px-6"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,156,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,156,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="relative font-mono text-sm sm:text-base text-neon space-y-2 max-w-md w-full">
          <motion.p
            className="text-cyan/80 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            &gt; SYSTEM BOOT
          </motion.p>
          {BOOT_MESSAGES.slice(0, currentLine).map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-white/90"
            >
              {line}
            </motion.p>
          ))}
          <p className="text-neon">
            {displayedText}
            <span className="terminal-cursor inline-block w-2" />
          </p>
        </div>
        <motion.p
          className="absolute bottom-8 left-0 right-0 text-center font-mono text-xs text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          nullempAIre archive system
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
