"use client";

const socials = [
  { name: "Twitter", href: "#", icon: "𝕏" },
  { name: "Telegram", href: "#", icon: "✈" },
  { name: "Website", href: "#", icon: "◉" },
];

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

        <div className="flex gap-6">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              className="font-mono text-sm text-white/60 hover:text-neon transition-colors duration-200 flex items-center gap-2"
              aria-label={s.name}
            >
              <span className="text-neon/70">{s.icon}</span>
              {s.name}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
