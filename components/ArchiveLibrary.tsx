"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ARCHIVE_ARTIFACTS, getArtifactById, type ArchiveArtifact } from "@/lib/archiveData";

function ArchiveAnalysisModal({
  artifact,
  onClose,
  onAgree,
  onReject,
  onSelectRelated,
}: {
  artifact: ArchiveArtifact;
  onClose: () => void;
  onAgree: () => void;
  onReject: () => void;
  onSelectRelated?: (a: ArchiveArtifact) => void;
}) {
  const [voted, setVoted] = useState<"agree" | "reject" | null>(null);

  const handleAgree = () => {
    setVoted("agree");
    onAgree();
    setTimeout(() => onClose(), 400);
  };
  const handleReject = () => {
    setVoted("reject");
    onReject();
    setTimeout(() => onClose(), 400);
  };

  const related = (artifact.relatedIds ?? [])
    .map((id) => getArtifactById(id))
    .filter((a): a is ArchiveArtifact => a != null);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="border-2 border-neon/50 rounded-none bg-black w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-[0_0_60px_rgba(0,255,156,0.15)]"
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex justify-between items-center px-6 py-4 border-b border-neon/30 bg-black/95 backdrop-blur-sm">
          <h3 className="font-display text-lg font-bold text-neon">
            ARCHIVE DATABASE
          </h3>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white font-mono text-sm p-1"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Header */}
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-2">
              {artifact.title}
            </h2>
            <p className="font-mono text-cyan/80 text-sm">
              {artifact.year} · {artifact.category} · {artifact.source}
            </p>
            <p className="font-mono text-white/50 text-xs mt-1">
              ID: {artifact.id}
              {artifact.discoveryDate && ` · Discovered: ${artifact.discoveryDate}`}
            </p>
          </div>

          {/* Description */}
          {artifact.description && (
            <section>
              <h4 className="font-mono text-cyan/90 text-xs uppercase tracking-widest mb-3">
                Overview
              </h4>
              <p className="font-mono text-white/90 text-sm leading-relaxed">
                {artifact.description}
              </p>
            </section>
          )}

          {/* Timeline */}
          {artifact.timeline && artifact.timeline.length > 0 && (
            <section>
              <h4 className="font-mono text-cyan/90 text-xs uppercase tracking-widest mb-3">
                Timeline
              </h4>
              <ul className="space-y-2">
                {artifact.timeline.map((item, i) => (
                  <li key={i} className="flex gap-4 font-mono text-sm">
                    <span className="text-neon/80 shrink-0 w-20">{item.year}</span>
                    <span className="text-white/80">{item.event}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* AI Interpretation */}
          <section className="pt-4 border-t border-neon/20">
            <h4 className="font-mono text-cyan/90 text-xs uppercase tracking-widest mb-3">
              AI Interpretation
            </h4>
            <p className="font-mono text-white/90 text-sm leading-relaxed">
              {artifact.interpretation}
            </p>
          </section>

          {/* Agent notes */}
          {artifact.agentNotes && artifact.agentNotes.length > 0 && (
            <section>
              <h4 className="font-mono text-cyan/90 text-xs uppercase tracking-widest mb-3">
                Agent notes
              </h4>
              <ul className="space-y-2">
                {artifact.agentNotes.map((note, i) => (
                  <li
                    key={i}
                    className="font-mono text-xs text-white/70 border-l-2 border-neon/40 pl-3 py-1"
                  >
                    {note}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Metrics */}
          {artifact.metrics && artifact.metrics.length > 0 && (
            <section>
              <h4 className="font-mono text-cyan/90 text-xs uppercase tracking-widest mb-3">
                Metrics
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {artifact.metrics.map((m, i) => (
                  <div
                    key={i}
                    className="border border-neon/20 rounded-none px-4 py-3 bg-black/50"
                  >
                    <p className="font-mono text-cyan/70 text-xs">{m.label}</p>
                    <p className="font-mono text-neon text-sm font-semibold mt-0.5">
                      {m.value}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Tags */}
          {artifact.tags && artifact.tags.length > 0 && (
            <section>
              <h4 className="font-mono text-cyan/90 text-xs uppercase tracking-widest mb-3">
                Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {artifact.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs px-3 py-1 border border-neon/30 text-white/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Related archives */}
          {related.length > 0 && (
            <section>
              <h4 className="font-mono text-cyan/90 text-xs uppercase tracking-widest mb-3">
                Related archives
              </h4>
              <div className="flex flex-wrap gap-2">
                {related.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => onSelectRelated?.(a)}
                    className="font-mono text-xs px-3 py-2 border border-cyan/40 text-cyan/90 hover:bg-cyan/10 hover:border-cyan/60 transition-colors text-left"
                  >
                    {a.title} <span className="text-white/50">({a.year})</span>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Links */}
          {artifact.links && artifact.links.length > 0 && (
            <section>
              <h4 className="font-mono text-cyan/90 text-xs uppercase tracking-widest mb-3">
                External references
              </h4>
              <ul className="space-y-2">
                {artifact.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-sm text-neon/90 hover:text-neon underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Actions */}
          <div className="pt-6 border-t border-neon/30 flex gap-4">
            <button
              onClick={handleAgree}
              disabled={voted !== null}
              className="flex-1 py-3 font-mono text-sm border-2 border-neon text-neon rounded-none hover:bg-neon hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {voted === "agree" ? "Agreed" : "Agree with AI"}
            </button>
            <button
              onClick={handleReject}
              disabled={voted !== null}
              className="flex-1 py-3 font-mono text-sm border-2 border-cyan text-cyan rounded-none hover:bg-cyan hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {voted === "reject" ? "Rejected" : "Reject Interpretation"}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ArchiveLibrary() {
  const [selected, setSelected] = useState<ArchiveArtifact | null>(null);

  useEffect(() => {
    if (selected) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [selected]);

  return (
    <section id="archive-library" className="py-20 md:py-28 px-6 section-content">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="font-display text-2xl sm:text-3xl font-bold text-neon mb-2 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          INTERNET ARCHIVE LIBRARY
        </motion.h2>
        <motion.p
          className="font-mono text-cyan/80 text-center text-xs uppercase tracking-widest mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Select an artifact to explore the archive database
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ARCHIVE_ARTIFACTS.map((artifact, i) => (
            <motion.button
              key={artifact.id}
              className="text-left border border-neon/30 rounded-none p-4 bg-black/50 backdrop-blur-sm transition-all duration-300 hover:border-neon/50 hover:shadow-[0_0_20px_rgba(0,255,156,0.12)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelected(artifact)}
            >
              <p className="font-display font-bold text-white">
                {artifact.title}
              </p>
              <p className="font-mono text-xs text-cyan/80 mt-1">
                {artifact.year} · {artifact.category}
              </p>
              <p className="font-mono text-xs text-neon/70 mt-2 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-neon" />
                Full database available
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {selected && (
          <ArchiveAnalysisModal
            key={selected.id}
            artifact={selected}
            onClose={() => setSelected(null)}
            onAgree={() => {}}
            onReject={() => {}}
            onSelectRelated={(a) => setSelected(a)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
