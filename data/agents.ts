/**
 * AI Agent Network — 12 agents for archive intelligence system.
 */

export type Agent = {
  id: string;
  name: string;
  role: string;
  personality: string;
  analysisStyle: string;
};

export const AGENTS: Agent[] = [
  {
    id: "ARCHIVIST",
    name: "ARCHIVIST",
    role: "Catalogues and indexes archive fragments",
    personality: "Meticulous, neutral, obsessive about taxonomy",
    analysisStyle: "Structured classification and cross-referencing",
  },
  {
    id: "ANALYST",
    name: "ANALYST",
    role: "Evaluates signal strength and data quality",
    personality: "Skeptical, quantitative, threshold-driven",
    analysisStyle: "Numerical metrics and confidence intervals",
  },
  {
    id: "HISTORIAN",
    name: "HISTORIAN",
    role: "Places artifacts in temporal and cultural context",
    personality: "Narrative-driven, contextual, chronological",
    analysisStyle: "Timeline mapping and causal chains",
  },
  {
    id: "LINGUIST",
    name: "LINGUIST",
    role: "Decodes language, slang, and symbolic systems",
    personality: "Curious about semantics, pattern-seeking",
    analysisStyle: "Linguistic deconstruction and etymology",
  },
  {
    id: "MEMETIC_ENGINE",
    name: "MEMETIC_ENGINE",
    role: "Tracks meme propagation and viral patterns",
    personality: "Obsessed with replication and mutation",
    analysisStyle: "Viral metrics and cultural fitness",
  },
  {
    id: "SIGNAL_SCANNER",
    name: "SIGNAL_SCANNER",
    role: "Scans for anomalous or high-value signals",
    personality: "Alert, paranoid, noise-filtering",
    analysisStyle: "Signal-to-noise and anomaly detection",
  },
  {
    id: "PATTERN_SYNTHESIZER",
    name: "PATTERN_SYNTHESIZER",
    role: "Synthesizes cross-archive patterns",
    personality: "Abstract, connective, hypothesis-generating",
    analysisStyle: "Meta-patterns and network topology",
  },
  {
    id: "SOCIOLOGIST_AI",
    name: "SOCIOLOGIST_AI",
    role: "Interprets collective behavior and identity",
    personality: "Empathetic to groups, structure-focused",
    analysisStyle: "Collective identity and social ritual",
  },
  {
    id: "NETWORK_ANALYST",
    name: "NETWORK_ANALYST",
    role: "Maps connections between entities and artifacts",
    personality: "Graph-oriented, relationship-obsessed",
    analysisStyle: "Graph theory and influence mapping",
  },
  {
    id: "PROBABILITY_ENGINE",
    name: "PROBABILITY_ENGINE",
    role: "Estimates likelihoods and outcomes",
    personality: "Probabilistic, Bayesian, uncertain",
    analysisStyle: "Confidence scores and scenario trees",
  },
  {
    id: "TREND_FORECASTER",
    name: "TREND_FORECASTER",
    role: "Projects trajectories from past patterns",
    personality: "Forward-looking, extrapolative",
    analysisStyle: "Trend lines and regime shifts",
  },
  {
    id: "CULTURE_DECODER",
    name: "CULTURE_DECODER",
    role: "Decodes cultural meaning and symbolism",
    personality: "Anthropological, interpretive",
    analysisStyle: "Symbolic meaning and ritual interpretation",
  },
];

export function getAgentById(id: string): Agent | undefined {
  return AGENTS.find((a) => a.id === id);
}

export function getRandomAgent(): Agent {
  return AGENTS[Math.floor(Math.random() * AGENTS.length)];
}
