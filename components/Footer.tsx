"use client";

const socials = [
  { name: "Twitter", href: "#", label: "X" },
  { name: "Telegram", href: "#", label: "TG" },
  { name: "Website", href: "#", label: "WEB" },
];

export default function Footer() {
  return (
    <footer className="py-12 px-4 section-content border-t border-neon/20">
      <div className="max-w-3xl mx-auto terminal-block">
        <div className="terminal-block-title">NULLEMPAIRE</div>
        <div className="terminal-block-dash">---------------------</div>
        <p className="font-mono text-xs text-white/60 uppercase tracking-widest mb-1">
          Humanity: Archived | AI: Active
        </p>
        <div className="flex gap-6 mt-4">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              className="font-mono text-xs text-neon/80 hover:text-neon transition-colors"
              aria-label={s.name}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
