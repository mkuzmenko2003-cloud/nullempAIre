export type ArchiveArtifact = {
  id: string;
  title: string;
  year: string;
  category: string;
  source: string;
  interpretation: string;
  status: "analyzed" | "scanning" | "pending";
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
