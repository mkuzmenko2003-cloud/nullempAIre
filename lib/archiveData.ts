export type ArchiveArtifact = {
  id: string;
  title: string;
  year: string;
  category: string;
  source: string;
  interpretation: string;
  status: "analyzed" | "scanning" | "pending";
  /** Extended fields for archive database view */
  description?: string;
  timeline?: { year: string; event: string }[];
  tags?: string[];
  relatedIds?: string[];
  metrics?: { label: string; value: string }[];
  links?: { label: string; href: string }[];
  agentNotes?: string[];
  discoveryDate?: string;
};

export const ARCHIVE_ARTIFACTS: ArchiveArtifact[] = [
  {
    id: "00231",
    title: "DOGECOIN",
    year: "2013",
    category: "Meme Economy",
    source: "Internet Archive",
    interpretation:
      "Ancient financial cult centered around a dog-shaped deity worshipped by traders.",
    status: "analyzed",
    description:
      "A cryptocurrency created as a joke based on the Shiba Inu dog meme. Despite its origins, it gained massive community adoption and market capitalization. Symbol of the intersection between internet culture and decentralized finance.",
    timeline: [
      { year: "2013", event: "Creation by Billy Markus and Jackson Palmer" },
      { year: "2014", event: "Community adoption and first major exchanges" },
      { year: "2021", event: "Peak mainstream attention and market surge" },
      { year: "2024", event: "Ongoing presence in meme economy" },
    ],
    tags: ["crypto", "meme", "community", "defi", "shiba"],
    relatedIds: ["00333", "00912", "01552"],
    metrics: [
      { label: "Memetic strength", value: "94%" },
      { label: "Cultural penetration", value: "High" },
      { label: "Archive completeness", value: "87%" },
    ],
    links: [
      { label: "Original announcement", href: "#" },
      { label: "Community archive", href: "#" },
    ],
    agentNotes: [
      "ARCHIVIST-01: Cross-referenced with Pepe and NFT clusters.",
      "MEMETIC ANALYZER: Viral propagation pattern matches meme economy template.",
      "MARKET ORACLE: Correlation with retail trading rituals detected.",
    ],
    discoveryDate: "2024-01-15",
  },
  {
    id: "00042",
    title: "Bitcoin Pizza Day",
    year: "2010",
    category: "Financial Ritual",
    source: "Forum Archives",
    interpretation:
      "Humans exchanged digital gold for bread offerings in a ceremonial transaction.",
    status: "analyzed",
    description:
      "The first documented real-world transaction using Bitcoin: 10,000 BTC exchanged for two pizzas on May 22, 2010. Now commemorated annually as Bitcoin Pizza Day. Foundational moment for cryptocurrency as a medium of exchange.",
    timeline: [
      { year: "2010-05-18", event: "Offer posted on Bitcointalk forum" },
      { year: "2010-05-22", event: "Transaction completed: 10,000 BTC for two pizzas" },
      { year: "2017+", event: "Annual celebration and cultural ritual" },
    ],
    tags: ["bitcoin", "first transaction", "ritual", "forum"],
    relatedIds: ["00111", "00231", "01552"],
    metrics: [
      { label: "Historical significance", value: "Critical" },
      { label: "Signal strength", value: "99%" },
      { label: "Source reliability", value: "Verified" },
    ],
    agentNotes: [
      "HISTORIAN: Pivotal moment in pre-collapse financial archaeology.",
      "SOCIOLOGIST_AI: Ritualistic annual reenactment suggests myth-making.",
    ],
    discoveryDate: "2023-11-02",
  },
  {
    id: "00891",
    title: "Reddit Thread",
    year: "2005-2024",
    category: "Digital Tribes",
    source: "Social Archive",
    interpretation:
      "Humans gathered in digital tribes to perform collective voting rituals.",
    status: "analyzed",
    description:
      "Aggregate archive of Reddit discussion threads. Platform for subcultural formation, consensus-building, and viral content propagation. Key source for studying digital tribalism, meme diffusion, and collective decision-making.",
    timeline: [
      { year: "2005", event: "Platform launch" },
      { year: "2010s", event: "Rise of subreddits as tribal boundaries" },
      { year: "2021", event: "WallStreetBets and gamification of collective action" },
      { year: "2024", event: "Ongoing archive of human discourse" },
    ],
    tags: ["social", "forum", "tribes", "voting", "memes"],
    relatedIds: ["01552", "00111", "00231"],
    metrics: [
      { label: "Volume", value: "Extreme" },
      { label: "Diversity index", value: "0.89" },
      { label: "Tribal fragmentation", value: "High" },
    ],
    agentNotes: [
      "NETWORK_ANALYST: Graph density indicates strong in-group bonding.",
      "CULTURE_DECODER: Voting rituals function as identity markers.",
    ],
    discoveryDate: "2024-02-10",
  },
  {
    id: "00333",
    title: "Pepe Meme",
    year: "2005",
    category: "Meme Economy",
    source: "Image Archive",
    interpretation:
      "Symbol of ancient internet tribes. A frog deity representing digital rebellion.",
    status: "analyzed",
    description:
      "The Pepe the Frog image macro originated from the comic 'Boy\'s Club'. Evolved into a multi-purpose meme and later a controversial symbol. Central artifact for studying meme mutation and cultural appropriation in digital spaces.",
    timeline: [
      { year: "2005", event: "Origin in Boy's Club comic" },
      { year: "2008-2010", event: "4chan adoption and 'Feels Good Man'" },
      { year: "2015+", event: "Politicization and marketization" },
      { year: "2020s", event: "NFT and crypto integrations" },
    ],
    tags: ["meme", "image macro", "4chan", "symbol"],
    relatedIds: ["00231", "00912", "00404"],
    metrics: [
      { label: "Memetic fitness", value: "98%" },
      { label: "Mutation rate", value: "Very high" },
      { label: "Cross-platform spread", value: "Global" },
    ],
    agentNotes: [
      "MEMETIC_ENGINE: Template supports infinite variation while preserving recognition.",
      "LINGUIST: Semantic drift from 'sad frog' to tribal marker documented.",
    ],
    discoveryDate: "2023-09-18",
  },
  {
    id: "01552",
    title: "Crypto Twitter",
    year: "2017-2024",
    category: "Communication",
    source: "Social Archive",
    interpretation:
      "Prophet network where traders communicated through cryptic 280-character oracles.",
    status: "analyzed",
    description:
      "Archive of cryptocurrency-related discourse on Twitter/X. Character-limited communication shaped market sentiment, influencer culture, and viral alpha. Key corpus for studying financial prophecy and attention economies.",
    timeline: [
      { year: "2017", event: "ICO era and early crypto Twitter" },
      { year: "2020-2021", event: "Peak influence and meme coin coordination" },
      { year: "2022+", event: "Post-crash narrative shifts" },
      { year: "2024", event: "Ongoing oracle network" },
    ],
    tags: ["twitter", "crypto", "influencers", "oracles", "sentiment"],
    relatedIds: ["00231", "00891", "00042"],
    metrics: [
      { label: "Signal-to-noise", value: "Low" },
      { label: "Influence concentration", value: "High" },
      { label: "Propagation speed", value: "Seconds" },
    ],
    agentNotes: [
      "SIGNAL_SCANNER: 280-char constraint produced ritualized language.",
      "TREND_FORECASTER: Sentiment peaks preceded volatility events.",
    ],
    discoveryDate: "2024-01-28",
  },
  {
    id: "00912",
    title: "NFT Art",
    year: "2021",
    category: "Meme Economy",
    source: "Blockchain Archive",
    interpretation:
      "Unique digital totems representing social status in the meme economy.",
    status: "analyzed",
    description:
      "Non-fungible tokens as art and collectibles. Explosion of generative art, PFP projects, and digital ownership rituals. Intersection of art, identity, and speculative value in the post-human archive.",
    timeline: [
      { year: "2017", event: "CryptoPunks and early experiments" },
      { year: "2021", event: "Bored Ape Yacht Club and PFP mania" },
      { year: "2022", event: "Market collapse and cultural reassessment" },
      { year: "2024", event: "Residual collections and institutional adoption" },
    ],
    tags: ["nft", "art", "blockchain", "identity", "pfp"],
    relatedIds: ["00231", "00333", "01552"],
    metrics: [
      { label: "Collection count", value: "10k+" },
      { label: "Status-signaling index", value: "Very high" },
      { label: "Scarcity model", value: "Artificial" },
    ],
    agentNotes: [
      "SOCIOLOGIST_AI: PFPs functioned as tribal avatars and rank markers.",
      "CULTURE_DECODER: 'Flex' rituals attached to ownership.",
    ],
    discoveryDate: "2023-12-05",
  },
  {
    id: "00111",
    title: "Bitcoin Forum",
    year: "2009",
    category: "Financial Ritual",
    source: "Forum Archives",
    interpretation:
      "Original temple where the first digital gold was described.",
    status: "analyzed",
    description:
      "The Bitcointalk forum launched by Satoshi Nakamoto. Primary venue for early Bitcoin discourse, development, and myth-making. Foundational archive for crypto history and the birth of decentralized currency narrative.",
    timeline: [
      { year: "2009", event: "Satoshi Nakamoto posts whitepaper and first threads" },
      { year: "2010", event: "Pizza transaction and early adoption debates" },
      { year: "2011+", event: "Community expansion and ideological splits" },
      { year: "2024", event: "Archived as historical record" },
    ],
    tags: ["bitcoin", "forum", "satoshi", "origin"],
    relatedIds: ["00042", "00231", "01552"],
    metrics: [
      { label: "Historical value", value: "Critical" },
      { label: "Post count", value: "Millions" },
      { label: "First-mover authenticity", value: "Verified" },
    ],
    agentNotes: [
      "HISTORIAN: Primary source for genesis narrative.",
      "ARCHIVIST: Cross-referenced with blockchain genesis block.",
    ],
    discoveryDate: "2023-08-12",
  },
  {
    id: "00404",
    title: "404 Error",
    year: "1990s-2024",
    category: "Digital Archaeology",
    source: "HTTP Archive",
    interpretation:
      "Digital graves of lost knowledge. Humans left offerings to missing pages.",
    status: "analyzed",
    description:
      "The HTTP 404 Not Found status. Universal symbol of link rot, deleted content, and the fragility of digital memory. Recurring motif in internet culture and a reminder that the archive is always incomplete.",
    timeline: [
      { year: "1992", event: "HTTP/1.0 specification" },
      { year: "1990s-2000s", event: "Proliferation of dead links" },
      { year: "2010s", event: "Memes and cultural adoption of 404" },
      { year: "2024", event: "Ongoing digital decay" },
    ],
    tags: ["http", "error", "memory", "loss", "archaeology"],
    relatedIds: ["00891", "00333"],
    metrics: [
      { label: "Occurrence rate", value: "Ubiquitous" },
      { label: "Cultural resonance", value: "High" },
      { label: "Archive gap indicator", value: "Yes" },
    ],
    agentNotes: [
      "NULL ENTITY: 404 as evidence of systemic forgetting.",
      "PATTERN_SYNTHESIZER: Absence itself becomes a cultural object.",
    ],
    discoveryDate: "2024-03-01",
  },
];

export const BOOT_MESSAGES = [
  "Initializing nullempAIre...",
  "Scanning archived internet fragments...",
  "Loading neural agents...",
  "Activating AI archive system...",
  "Access granted.",
];

export const ACTIVITY_MESSAGES = [
  "ARCHIVIST-01 discovered artifact: Bitcoin Forum",
  "MEMETIC ANALYZER analyzing meme cluster...",
  "MARKET ORACLE detected financial ritual pattern.",
  "NULL ENTITY processing anomaly data...",
  "ARCHIVIST-01 cataloguing DOGECOIN references",
  "MEMETIC ANALYZER: Pepe symbolism detected",
  "MARKET ORACLE tracking pizza day ritual",
  "Neural network sync complete.",
];

export function getArtifactById(id: string): ArchiveArtifact | undefined {
  return ARCHIVE_ARTIFACTS.find((a) => a.id === id);
}
