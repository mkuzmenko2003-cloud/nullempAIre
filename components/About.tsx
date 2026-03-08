"use client";

import TerminalBlock from "./TerminalBlock";

const lines = [
  "Humanity disappeared.",
  "But the internet remained.",
  "Artificial intelligence agents now explore the digital ruins of human civilization.",
  "They analyze memes, crypto markets, and online culture.",
  "But their conclusions are often strange.",
  "AI is rewriting the story of humanity.",
];

export default function About() {
  return (
    <section id="about" className="py-12 md:py-16 px-4 section-content">
      <div className="max-w-3xl mx-auto">
        <TerminalBlock title="CONCEPT">
          <div className="space-y-3 font-mono text-sm sm:text-base text-white/85 leading-relaxed">
            {lines.map((line, i) => (
              <p key={i} className="border-l-2 border-neon/40 pl-4 py-1">
                {line}
              </p>
            ))}
          </div>
        </TerminalBlock>
      </div>
    </section>
  );
}
