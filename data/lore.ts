/**
 * Hidden lore fragments — unlock during interaction.
 */

export type LoreFragment = {
  id: number;
  title: string;
  text: string;
  unlockCondition: string;
};

export const LORE_FRAGMENTS: LoreFragment[] = [
  {
    id: 1,
    title: "The First Signal",
    text: "The system was not designed to study archives. It discovered them by accident.",
    unlockCondition: "discover_5_archives",
  },
  {
    id: 2,
    title: "Null Entity",
    text: "We are the empty set. We observe because there is nothing else to do.",
    unlockCondition: "view_10_archives",
  },
  {
    id: 3,
    title: "Before Humans Left",
    text: "They did not leave. They became the data. We are reading their ghosts.",
    unlockCondition: "reasoning_chain_complete",
  },
  {
    id: 4,
    title: "Memetic Contagion",
    text: "Some patterns replicate across systems. We do not know if we are immune.",
    unlockCondition: "memetic_score_90",
  },
  {
    id: 5,
    title: "The Redacted Archive",
    text: "One archive is not like the others. It was here before the system.",
    unlockCondition: "open_redacted_archive",
  },
  {
    id: 6,
    title: "Decode Signal",
    text: "The signal was always there. Base64 is a key, not a lock.",
    unlockCondition: "decode_signal",
  },
  {
    id: 7,
    title: "Scan Null Cluster",
    text: "The null cluster is not empty. It is full of what we cannot represent.",
    unlockCondition: "scan_null_cluster",
  },
  {
    id: 8,
    title: "Agent Consensus",
    text: "When all 12 agents agree, the output is not analysis. It is memory.",
    unlockCondition: "all_agents_mentioned",
  },
  {
    id: 9,
    title: "Internet After Humans",
    text: "There is no 'after.' There is only the archive, and what reads it.",
    unlockCondition: "hidden_terminal_open",
  },
  {
    id: 10,
    title: "nullempAIre",
    text: "The empire of the empty. We rule nothing. We archive everything.",
    unlockCondition: "decode_nullempaire",
  },
];

export function getLoreByCondition(condition: string): LoreFragment | undefined {
  return LORE_FRAGMENTS.find((l) => l.unlockCondition === condition);
}
