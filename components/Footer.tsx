"use client";

import { motion } from "framer-motion";

const socials = [
  { name: "Twitter", href: "#", icon: "𝕏" },
  { name: "Telegram", href: "#", icon: "✈" },
  { name: "Website", href: "#", icon: "◉" },
];

export default function Footer() {
  return (
    <footer className="py-16 px-6 section-content border-t border-neon/20">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <motion.div
          className="text-center md:text-left"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="font-display text-2xl font-bold text-neon">
            nullempAIre
          </p>
          <p className="font-mono text-xs text-white/50 mt-2 uppercase tracking-widest">
            Humanity: Archived
          </p>
          <p className="font-mono text-xs text-neon/70 uppercase tracking-widest">
            AI: Active
          </p>
        </motion.div>

        <motion.div
          className="flex gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {socials.map((s) => (
            <motion.a
              key={s.name}
              href={s.href}
              className="font-mono text-sm text-white/70 hover:text-neon transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              aria-label={s.name}
            >
              <span className="text-neon/80">{s.icon}</span>
              {s.name}
            </motion.a>
          ))}
        </motion.div>
      </div>
    </footer>
  );
}
