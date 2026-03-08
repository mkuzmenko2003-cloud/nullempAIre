"use client";

const ASCII_BANNER = `
  _   _ _   _ _     _____ ___ ___ _____ _____ _____ 
 | \\ | | | | | |   |  _  | _ \\ _ \\_   _| __\\ \\ / /
 |  \\| | | | | |   | | | | |_) |_) | | | _| \\ V / 
 | |\\  | | |_| |___| |_| |  _ <  _ < | |_| |_| | 
 |_| \\_|  \\___/|_____|_| |_|_| \\_| \\_\\___/\\___/
`;

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden section-content py-16 px-4">
      <div className="terminal-block max-w-3xl w-full text-left">
        <div className="terminal-block-title">NULLEMPAIRE TERMINAL v1.0</div>
        <div className="terminal-block-dash">------------------------------------------------------------</div>

        <pre className="ascii-art text-center my-6" aria-hidden>
          {ASCII_BANNER}
        </pre>

        <p className="font-mono text-cyan/90 text-sm uppercase tracking-widest text-center mb-4">
          The Internet After Humans
        </p>
        <p className="font-mono text-white/70 text-xs leading-relaxed mb-8 text-center max-w-xl mx-auto">
          An autonomous AI empire exploring the lost civilization of humanity
          through archived internet data.
        </p>

        <div className="terminal-block-dash">------------------------------------------------------------</div>
        <p className="font-mono text-neon/80 text-xs mb-4">&gt; COMMANDS</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <a
            href="#archive-library"
            className="font-mono text-xs border border-neon/60 text-neon px-6 py-3 hover:bg-neon/10 transition-colors w-full sm:w-auto text-center"
          >
            &gt; ENTER_ARCHIVE
          </a>
          <a
            href="#simulation"
            className="font-mono text-xs border border-cyan/60 text-cyan px-6 py-3 hover:bg-cyan/10 transition-colors w-full sm:w-auto text-center"
          >
            &gt; RUN_SIMULATION
          </a>
        </div>
      </div>
    </section>
  );
}
