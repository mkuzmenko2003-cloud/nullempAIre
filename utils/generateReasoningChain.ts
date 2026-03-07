/**
 * Generates 5–8 step fake AI reasoning chain for an archive.
 */

import type { ArchiveEntry } from "@/data/archives";

const STEP_TEMPLATES = [
  "Artifact classified as {type} signal",
  "Cross-reference with {tag} cluster",
  "Viral propagation detected",
  "Cultural amplification probability rising",
  "Generating hypothesis",
  "Signal strength validated",
  "Memetic score above threshold",
  "Temporal alignment checked",
  "Network topology updated",
  "Linguistic pattern matched",
  "Collective behavior model applied",
  "Anomaly filter passed",
  "Meta-pattern synthesis in progress",
  "Confidence interval computed",
  "Output layer activation",
];

export function generateReasoningChain(archive: ArchiveEntry): string[] {
  const count = 5 + Math.floor(Math.random() * 4); // 5–8 steps
  const used = new Set<number>();
  const steps: string[] = [];

  while (steps.length < count) {
    const idx = Math.floor(Math.random() * STEP_TEMPLATES.length);
    if (used.has(idx)) continue;
    used.add(idx);
    let step = STEP_TEMPLATES[idx]
      .replace("{type}", archive.type.toLowerCase())
      .replace("{tag}", archive.tags[0] ?? "unknown");
    steps.push(`Step ${steps.length + 1}: ${step}`);
  }

  return steps;
}
