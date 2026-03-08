"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ARCHIVES, type ArchiveEntry } from "@/data/archives";

const NODE_COUNT = 60;
const RADIUS = 200;
const NODE_R = 4;
const NODE_R_HOVER = 6;
const NODE_R_SELECTED = 9;

type Node = { id: number; archive: ArchiveEntry; x: number; y: number };
type Edge = { a: number; b: number };

function buildGraph(archives: ArchiveEntry[]): { nodes: Node[]; edges: Edge[] } {
  const subset = archives.slice(0, NODE_COUNT);
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const tagToIds = new Map<string, number[]>();

  subset.forEach((a) => {
    a.tags.forEach((t) => {
      if (!tagToIds.has(t)) tagToIds.set(t, []);
      tagToIds.get(t)!.push(a.id);
    });
  });

  tagToIds.forEach((ids) => {
    for (let i = 0; i < ids.length; i++) {
      for (let j = i + 1; j < ids.length; j++) {
        if (ids[i] !== ids[j]) edges.push({ a: ids[i], b: ids[j] });
      }
    }
  });

  const edgeSet = new Set(edges.map((e) => `${Math.min(e.a, e.b)}-${Math.max(e.a, e.b)}`));
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
  const [selectedId, setSelectedId] = useState<number | null>(highlightedArchiveId);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const { nodes, edges } = useMemo(() => buildGraph(ARCHIVES), []);

  useEffect(() => {
    setSelectedId(highlightedArchiveId);
  }, [highlightedArchiveId]);

  const selectedArchive = selectedId != null ? nodes.find((n) => n.id === selectedId)?.archive : null;

  const isHighlighted = (nodeId: number) => nodeId === selectedId || nodeId === hoveredId;
  const isSelected = (nodeId: number) => nodeId === selectedId;
  const isHovered = (nodeId: number) => nodeId === hoveredId && nodeId !== selectedId;

  const getNodeRadius = (nodeId: number) => {
    if (isSelected(nodeId)) return NODE_R_SELECTED;
    if (isHovered(nodeId)) return NODE_R_HOVER;
    return NODE_R;
  };

  const getNodeFill = (nodeId: number) => {
    if (isSelected(nodeId)) return "#00ff9c";
    if (isHovered(nodeId)) return "rgba(0, 234, 255, 0.9)";
    return "rgba(0, 234, 255, 0.5)";
  };

  const getNodeStroke = (nodeId: number) => {
    if (isSelected(nodeId)) return "#00ff9c";
    if (isHovered(nodeId)) return "#00eaff";
    return "rgba(0, 234, 255, 0.35)";
  };

  const getEdgeHighlight = (e: Edge) =>
    selectedId !== null && (e.a === selectedId || e.b === selectedId);

  return (
    <section className="py-12 px-4 section-content">
      <div className="max-w-4xl mx-auto">
        <h3 className="font-display text-xl font-bold text-neon mb-4 text-center">
          Archive network
        </h3>
        <p className="font-mono text-cyan/80 text-center text-xs uppercase tracking-widest mb-6">
          Nodes = archives · Edges = shared tags
        </p>

        <div
          className="relative border-2 border-neon/40 rounded-none overflow-hidden bg-black/80 backdrop-blur-sm"
          style={{ height: 420 }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${RADIUS * 2 + 80} ${RADIUS * 2 + 80}`}
            className="block"
          >
            <defs>
              <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="node-glow-strong" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g transform="translate(40, 40)">
              {/* Edges — smooth transition via stroke */}
              {edges.slice(0, 200).map((e, i) => {
                const na = nodes.find((n) => n.id === e.a);
                const nb = nodes.find((n) => n.id === e.b);
                if (!na || !nb) return null;
                const highlight = getEdgeHighlight(e);
                return (
                  <line
                    key={`${e.a}-${e.b}-${i}`}
                    x1={na.x}
                    y1={na.y}
                    x2={nb.x}
                    y2={nb.y}
                    stroke={highlight ? "#00ff9c" : "rgba(0, 234, 255, 0.12)"}
                    strokeWidth={highlight ? 1.8 : 0.5}
                    style={{
                      transition: "stroke 0.25s ease-out, stroke-width 0.25s ease-out",
                    }}
                  />
                );
              })}
              {/* Nodes — circles with smooth hover/click */}
              {nodes.map((node) => {
                const r = getNodeRadius(node.id);
                const fill = getNodeFill(node.id);
                const stroke = getNodeStroke(node.id);
                const selected = isSelected(node.id);
                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() => setHoveredId(node.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => setSelectedId((prev) => (prev === node.id ? null : node.id))}
                  >
                    <circle
                      r={r}
                      fill={fill}
                      stroke={stroke}
                      strokeWidth={selected ? 2.5 : 1}
                      filter={selected ? "url(#node-glow-strong)" : "url(#node-glow)"}
                      style={{
                        transition: "r 0.2s ease-out, fill 0.2s ease-out, stroke 0.2s ease-out, stroke-width 0.2s ease-out",
                      }}
                    />
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* Selected archive info — smooth appear */}
        <AnimatePresence mode="wait">
          {selectedArchive ? (
            <motion.div
              key={selectedArchive.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="mt-4 p-4 border border-neon/30 rounded-none bg-black/60 font-mono text-sm"
            >
              <p className="text-neon/90 font-semibold">{selectedArchive.title}</p>
              <p className="text-white/70 text-xs mt-1">
                {selectedArchive.year} · {selectedArchive.type}
              </p>
              <p className="text-white/50 text-xs mt-1 truncate">
                {selectedArchive.tags.join(", ")}
              </p>
            </motion.div>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="mt-4 font-mono text-xs text-cyan/60 text-center"
            >
              Click a node to view archive
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
