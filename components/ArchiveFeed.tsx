"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export type FeedDiscovery = {
  id: string;
  title: string;
  aiInterpretation: string;
  timestamp: Date;
  sequence: number;
};

type ArchiveFeedProps = {
  items: FeedDiscovery[];
};

const MAX_ITEMS = 10;

function formatTime(d: Date) {
  return d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

export default function ArchiveFeed({ items }: ArchiveFeedProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const displayItems = items.slice(0, MAX_ITEMS);

  useEffect(() => {
    if (items.length > 0 && scrollContainerRef.current) {
      const el = scrollContainerRef.current;
      el.scrollTop = el.scrollHeight;
    }
  }, [items.length]);

  return (
    <div className="border-2 border-cyan/40 rounded-none overflow-hidden bg-black/80 backdrop-blur-sm h-full min-h-[280px] flex flex-col">
      <div className="px-4 py-3 border-b border-cyan/30 bg-cyan/5 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan" />
        <span className="font-mono text-xs text-cyan/90 uppercase tracking-wider">
          Discovery feed
        </span>
      </div>
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-sm scroll-smooth"
      >
        {displayItems.length === 0 ? (
          <p className="text-white/40 text-xs py-4">
            No discoveries yet. Start the AI simulation.
          </p>
        ) : (
          displayItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="border-l-2 border-neon/50 pl-3 py-2 space-y-1"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-neon font-bold text-xs uppercase tracking-wider">
                  {item.title}
                </span>
                <span className="text-cyan/70 text-xs shrink-0">
                  #{item.sequence}
                </span>
              </div>
              <p className="text-white/80 text-xs leading-relaxed">
                {item.aiInterpretation}
              </p>
              <p className="text-white/40 text-[10px]">
                {formatTime(item.timestamp)}
              </p>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
