/**
 * Generates live AI agent messages: random archive + random agent → message.
 */

import { getRandomArchive, type ArchiveEntry } from "@/data/archives";
import { getRandomAgent, type Agent } from "@/data/agents";

export type AgentMessage = {
  id: string;
  agent: Agent;
  archive: ArchiveEntry;
  text: string;
  timestamp: number;
};

const ARCHIVIST_PHRASES = [
  "Archive discovered:",
  "Cataloguing fragment:",
  "Index entry added:",
  "Cross-reference:",
];

const ANALYST_PHRASES = [
  "Signal strength above threshold.",
  "Data quality within parameters.",
  "Confidence interval acceptable.",
  "Metrics aligned.",
];

const HISTORIAN_PHRASES = [
  "Temporal context established.",
  "Chronological placement confirmed.",
  "Historical sequence noted.",
];

const LINGUIST_PHRASES = [
  "Linguistic pattern decoded.",
  "Semantic analysis complete.",
  "Symbolic system mapped.",
];

const MEMETIC_PHRASES = [
  "Memetic propagation detected.",
  "Viral spread pattern identified.",
  "Cultural fitness: high.",
  "Replication vector traced.",
];

const SIGNAL_PHRASES = [
  "Anomaly flagged.",
  "Signal detected.",
  "Noise filter applied.",
];

const PATTERN_PHRASES = [
  "Meta-pattern emerging.",
  "Cross-archive correlation.",
  "Synthesis in progress.",
];

const SOCIOLOGIST_PHRASES = [
  "This artifact suggests collective digital identity formation.",
  "Group behavior pattern identified.",
  "Social ritual detected.",
];

const NETWORK_PHRASES = [
  "Node connection mapped.",
  "Graph update.",
  "Influence edge added.",
];

const PROBABILITY_PHRASES = [
  "Probability estimate updated.",
  "Bayesian prior applied.",
  "Scenario tree extended.",
];

const TREND_PHRASES = [
  "Trend line projected.",
  "Trajectory extrapolated.",
  "Regime shift possible.",
];

const CULTURE_PHRASES = [
  "Cultural symbolism decoded.",
  "Ritual interpretation updated.",
  "Meaning layer extracted.",
];

function getPhrasesForAgent(agentId: string): string[] {
  const map: Record<string, string[]> = {
    ARCHIVIST: ARCHIVIST_PHRASES,
    ANALYST: ANALYST_PHRASES,
    HISTORIAN: HISTORIAN_PHRASES,
    LINGUIST: LINGUIST_PHRASES,
    MEMETIC_ENGINE: MEMETIC_PHRASES,
    SIGNAL_SCANNER: SIGNAL_PHRASES,
    PATTERN_SYNTHESIZER: PATTERN_PHRASES,
    SOCIOLOGIST_AI: SOCIOLOGIST_PHRASES,
    NETWORK_ANALYST: NETWORK_PHRASES,
    PROBABILITY_ENGINE: PROBABILITY_PHRASES,
    TREND_FORECASTER: TREND_PHRASES,
    CULTURE_DECODER: CULTURE_PHRASES,
  };
  return map[agentId] || ["Processing..."];
}

export function generateAgentMessage(archive?: ArchiveEntry): AgentMessage {
  const arch = archive ?? getRandomArchive();
  const agent = getRandomAgent();
  const phrases = getPhrasesForAgent(agent.id);
  const phrase = phrases[Math.floor(Math.random() * phrases.length)];

  let text: string;
  if (agent.id === "ARCHIVIST") {
    text = `${phrase} ${arch.title} (${arch.year})`;
  } else if (agent.id === "ANALYST" || agent.id === "SIGNAL_SCANNER" || agent.id === "MEMETIC_ENGINE") {
    text = `${phrase} [${arch.title}]`;
  } else {
    text = `${phrase} [${arch.title}]`;
  }

  return {
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    agent,
    archive: arch,
    text,
    timestamp: Date.now(),
  };
}
