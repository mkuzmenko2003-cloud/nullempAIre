"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QUESTIONS = [
  { id: "crypto", text: "Did you trade crypto?", options: ["Yes", "No", "A little"] },
  { id: "meme", text: "What meme did you like?", options: ["Doge", "Pepe", "None", "All of them"] },
  { id: "social", text: "Where did you spend time online?", options: ["Twitter", "Reddit", "Forums", "Everywhere"] },
  {
    id: "platform",
    text: "Favorite platform for communication?",
    options: ["Reddit", "Discord", "Twitter/X", "Telegram", "4chan/Local forums", "Other"],
  },
  {
    id: "artifacts",
    text: "Which digital artifacts did you prefer?",
    options: ["NFT", "Cryptocurrencies", "Memes", "Virtual Games", "Video/Meme content", "Software/Scripts"],
  },
  {
    id: "time",
    text: "How much time did you spend online daily?",
    options: ["Less than 1 hour", "1–3 hours", "3–6 hours", "6–10 hours", "More than 10 hours"],
  },
];

const CONCLUSIONS = [
  "You were likely a mid-level trader during the meme economy era.",
  "AI conclusion: You appear to have worshipped digital frog deities. A memetic believer.",
  "You were part of the tribe that communicated through 280-character oracles.",
  "Your data suggests involvement in bread-offering rituals (pizza day).",
  "You were a digital archaeologist before it was cool.",
  "Your profile matches a high-activity node in the ancient social graph.",
  "The archive suggests you were a guardian of rare digital artifacts.",
  "Neural reconstruction indicates heavy engagement with meme economy protocols.",
  "You belonged to a tribe that valued virtual gathering spaces above all.",
  "Analysis complete: your pattern fits the 'chronic scroller' archetype of late-stage internet.",
  "The AI concludes you were a bridge between multiple digital subcultures.",
  "Data points to a user who preferred long-form tribal forums over short oracles.",
];

function getConclusion(answers: Record<string, string>): string {
  const ids = ["crypto", "meme", "social", "platform", "artifacts", "time"];
  let seed = 0;
  ids.forEach((id) => {
    const v = answers[id];
    if (v) seed += v.length + id.length;
  });
  return CONCLUSIONS[seed % CONCLUSIONS.length];
}

export default function LetAIAnalyzeYou() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [conclusion, setConclusion] = useState<string | null>(null);

  const current = QUESTIONS[step];
  const isLast = step === QUESTIONS.length - 1;

  const choose = (option: string) => {
    if (!current) return;
    const next = { ...answers, [current.id]: option };
    setAnswers(next);
    if (isLast) {
      setConclusion(getConclusion(next));
    } else {
      setStep((s) => s + 1);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setConclusion(null);
  };

  return (
    <section id="analyze-you" className="py-20 md:py-28 px-6 section-content">
      <div className="max-w-xl mx-auto">
        <motion.h2
          className="font-display text-2xl sm:text-3xl font-bold text-neon mb-2 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          LET AI ANALYZE YOU
        </motion.h2>
        <motion.p
          className="font-mono text-cyan/80 text-center text-xs uppercase tracking-widest mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Answer a few questions. AI will draw a conclusion.
        </motion.p>

        <motion.div
          className="border-2 border-neon/40 rounded-xl p-6 md:p-8 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <AnimatePresence mode="wait">
            {conclusion ? (
              <motion.div
                key="conclusion"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <p className="font-mono text-cyan text-xs uppercase mb-4">
                  AI conclusion:
                </p>
                <p className="font-mono text-white/90 text-sm md:text-base leading-relaxed mb-6">
                  {conclusion}
                </p>
                <button
                  onClick={reset}
                  className="font-mono text-sm border border-neon text-neon px-6 py-2 rounded hover:bg-neon hover:text-black transition-colors"
                >
                  Try again
                </button>
              </motion.div>
            ) : current ? (
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <p className="font-mono text-white text-sm md:text-base">
                  {current.text}
                </p>
                <div className="flex flex-wrap gap-3">
                  {current.options.map((opt) => {
                    const selected = answers[current.id] === opt;
                    return (
                      <motion.button
                        key={opt}
                        onClick={() => choose(opt)}
                        className={`px-4 py-2 font-mono text-sm border-2 rounded transition-colors ${
                          selected
                            ? "bg-neon text-black border-neon shadow-[0_0_12px_rgba(0,255,156,0.5)]"
                            : "border-neon/50 text-neon hover:bg-neon hover:text-black hover:border-neon"
                        }`}
                        whileHover={!selected ? { scale: 1.03 } : {}}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        {opt}
                      </motion.button>
                    );
                  })}
                </div>
                <p className="font-mono text-white/40 text-xs">
                  Question {step + 1} of {QUESTIONS.length}
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
