"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ARCHIVE_ARTIFACTS, type ArchiveArtifact } from "@/lib/archiveData";

function ArchiveAnalysisModal({
  artifact,
  onClose,
  onAgree,
  onReject,
}: {
  artifact: ArchiveArtifact;
  onClose: () => void;
  onAgree: () => void;
  onReject: () => void;
}) {
  const [voted, setVoted] = useState<"agree" | "reject" | null>(null);

  const handleAgree = () => {
    setVoted("agree");
    onAgree();
  };
  const handleReject = () => {
    setVoted("reject");
    onReject();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="border-2 border-neon/50 rounded-xl bg-black max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-[0_0_40px_rgba(0,255,156,0.2)]"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h3 className="font-display text-xl font-bold text-neon">
              ARCHIVE ANALYSIS
            </h3>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white font-mono text-sm"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div className="font-mono text-sm space-y-4">
            <p>
              <span className="text-cyan/80">ARCHIVE ID:</span>{" "}
              <span className="text-white">{artifact.id}</span>
            </p>
            <p>
              <span className="text-cyan/80">CATEGORY:</span>{" "}
              <span className="text-white">{artifact.category}</span>
            </p>
            <p>
              <span className="text-cyan/80">SOURCE:</span>{" "}
              <span className="text-white">{artifact.source}</span>
            </p>
            <p>
              <span className="text-cyan/80">YEAR:</span>{" "}
              <span className="text-white">{artifact.year}</span>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-neon/30">
            <p className="font-mono text-cyan/80 text-xs uppercase mb-2">
              AI INTERPRETATION:
            </p>
            <p className="font-mono text-white/90 leading-relaxed">
              {artifact.interpretation}
            </p>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={handleAgree}
              disabled={voted !== null}
              className="flex-1 py-3 font-mono text-sm border-2 border-neon text-neon rounded hover:bg-neon hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {voted === "agree" ? "Agreed" : "Agree with AI"}
            </button>
            <button
              onClick={handleReject}
              disabled={voted !== null}
              className="flex-1 py-3 font-mono text-sm border-2 border-cyan text-cyan rounded hover:bg-cyan hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
          Select an artifact to view AI analysis
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ARCHIVE_ARTIFACTS.map((artifact, i) => (
            <motion.button
              key={artifact.id}
              className="text-left border border-neon/30 rounded-lg p-4 bg-black/50 backdrop-blur-sm hover:border-neon/60 hover:shadow-[0_0_20px_rgba(0,255,156,0.1)] transition-all"
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
                AI analysis available
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <ArchiveAnalysisModal
            artifact={selected}
            onClose={() => setSelected(null)}
            onAgree={() => {}}
            onReject={() => {}}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
