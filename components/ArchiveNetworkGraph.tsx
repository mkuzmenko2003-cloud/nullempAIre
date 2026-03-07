"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { ARCHIVES, type ArchiveEntry } from "@/data/archives";

const NODE_COUNT = 60;
const RADIUS = 200;

type Node = { id: number; archive: ArchiveEntry; x: number; y: number };
type Edge = { a: number; b: number };

function buildGraph(archives: ArchiveEntry[]): { nodes: Node[]; edges: Edge[] } {
  const subset = archives.slice(0, NODE_COUNT);
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const tagToIds = new Map<string, number[]>();

  subset.forEach((a, i) => {
    a.tags.forEach((t) => {
      if (!tagToIds.has(t)) tagToIds.set(t, []);
      tagToIds.get(t)!.push(a.id);
    });
  });

  tagToIds.forEach((ids) => {
    for (let i = 0; i < ids.length; i++) {
      for (let j = i + 1; j < ids.length; j++) {
        if (ids[i] !== ids[j]) {
          edges.push({ a: ids[i], b: ids[j] });
        }
      }
    }
  });

  const edgeSet = new Set(edges.map((e) => `${e.a}-${e.b}`));
  const uniqueEdges = Array.from(edgeSet).map((k) => {
    const [a, b] = k.split("-").map(Number);
    return { a, b };
  });

  subset.forEach((archive, i) => {
    const angle = (i / subset.length) * 2 * Math.PI - Math.PI / 2;
    nodes.push({
      id: archive.id,
      archive,
      x: RADIUS + RADIUS * Math.cos(angle),
      y: RADIUS + RADIUS * Math.sin(angle),
    });
  });

  return { nodes, edges: uniqueEdges };
}

export default function ArchiveNetworkGraph({
  highlightedArchiveId = null,
}: {
  highlightedArchiveId?: number | null;
}) {
  const [currentId, setCurrentId] = useState<number | null>(highlightedArchiveId);
  // Stable layout: build once from ARCHIVES, no dependency on currentId so graph doesn't move
  const { nodes, edges } = useMemo(() => buildGraph(ARCHIVES), []);

  useEffect(() => {
    setCurrentId(highlightedArchiveId);
  }, [highlightedArchiveId]);

  return (
    <section className="py-12 px-4 section-content">
      <div className="max-w-4xl mx-auto">
        <motion.h3
          className="font-display text-xl font-bold text-neon mb-4 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Archive network
        </motion.h3>
        <p className="font-mono text-cyan/80 text-center text-xs uppercase tracking-widest mb-6">
          Nodes = archives · Edges = shared tags
        </p>
        <motion.div
          className="relative border-2 border-neon/40 rounded-none overflow-hidden bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ height: 420 }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${RADIUS * 2 + 80} ${RADIUS * 2 + 80}`}
            className="block"
          >
            <g transform="translate(40, 40)">
              {edges.slice(0, 200).map((e, i) => {
                const na = nodes.find((n) => n.id === e.a);
                const nb = nodes.find((n) => n.id === e.b);
                if (!na || !nb) return null;
                const highlight =
                  currentId !== null && (e.a === currentId || e.b === currentId);
                return (
                  <line
                    key={`${e.a}-${e.b}-${i}`}
                    x1={na.x}
                    y1={na.y}
                    x2={nb.x}
                    y2={nb.y}
                    stroke={highlight ? "#00ff9c" : "rgba(0, 234, 255, 0.15)"}
                    strokeWidth={highlight ? 1.5 : 0.5}
                  />
                );
              })}
              {nodes.map((node) => {
                const isHighlighted = node.id === currentId;
                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      setCurrentId((prev) => (prev === node.id ? null : node.id))
                    }
                  >
                    <circle
                      r={isHighlighted ? 8 : 4}
                      fill={isHighlighted ? "#00ff9c" : "rgba(0, 234, 255, 0.5)"}
                      stroke={isHighlighted ? "#00ff9c" : "rgba(0, 234, 255, 0.3)"}
                      strokeWidth={isHighlighted ? 2 : 1}
                    />
                  </g>
                );
              })}
            </g>
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
