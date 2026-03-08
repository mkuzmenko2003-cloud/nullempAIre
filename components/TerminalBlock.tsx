"use client";

import { ReactNode } from "react";

/**
 * ACG / Fartcoin-style terminal block: title, dashed line, content.
 */
export default function TerminalBlock({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`terminal-block ${className}`}>
      <div className="terminal-block-title">{title}</div>
      <div className="terminal-block-dash">
        {"-".repeat(Math.min(title.length + 2, 60))}
      </div>
      {children}
    </div>
  );
}
