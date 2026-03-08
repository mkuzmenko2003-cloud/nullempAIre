"use client";

function PumpFunIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M6 6 L18 6 A6 6 0 0 1 18 18 L6 18 A6 6 0 0 1 6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

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
            className="font-mono text-sm text-white/60 hover:text-neon transition-colors duration-200 flex items-center gap-2"
            aria-label="Twitter"
          >
            <span className="text-neon/70">𝕏</span>
            Twitter
          </a>
          <a
            href="#"
            className="font-mono text-sm text-white/60 hover:text-neon transition-colors duration-200 flex items-center gap-2"
            aria-label="Pump.fun"
          >
            <PumpFunIcon className="w-5 h-5 text-neon/80 shrink-0" />
            Pump.fun
          </a>
        </div>
      </div>
    </footer>
  );
}
