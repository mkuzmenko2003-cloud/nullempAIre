"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="py-14 px-6 section-content border-t border-neon/20 bg-black/30">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <p className="font-display text-xl font-bold text-neon">
            nullempAIre
          </p>
          <p className="font-mono text-xs text-white/50 mt-1.5 uppercase tracking-widest">
            Humanity: Archived · AI: Active
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="#"
            className="font-mono text-base md:text-lg text-white/70 hover:text-neon transition-colors duration-200 flex items-center gap-2"
            aria-label="Twitter"
          >
            <span className="text-neon/70">𝕏</span>
            Twitter
          </a>
          <a
            href="#"
            className="font-mono text-base md:text-lg text-white/70 hover:text-neon transition-colors duration-200 flex items-center gap-2"
            aria-label="Pump.fun"
          >
            <Image
              src="/pump-fun-seeklogo.svg"
              alt=""
              width={20}
              height={20}
              className="w-5 h-5 shrink-0"
              aria-hidden
            />
            Pump.fun
          </a>
        </div>
      </div>
    </footer>
  );
}
