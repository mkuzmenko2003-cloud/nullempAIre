/**
 * Massive archive database for nullempAIre AI intelligence system.
 * 1000+ entries across crypto, memes, forums, NFT, TikTok, gaming, etc.
 */

export type ArchiveEntry = {
  id: number;
  title: string;
  year: string;
  type: string;
  source: string;
  tags: string[];
  summary: string;
  signalStrength: number;
  memeticScore: number;
  aiInterpretation: string;
  hidden?: boolean;
};

const TYPES = [
  "Crypto history",
  "Memes",
  "Reddit threads",
  "4chan culture",
  "NFT collections",
  "Twitter/X debates",
  "DAO governance",
  "TikTok trends",
  "Gaming economies",
  "Online subcultures",
] as const;

const SOURCES = [
  "Reddit",
  "4chan",
  "Twitter",
  "Discord",
  "Telegram",
  "Forum Archives",
  "Internet Archive",
  "Blockchain",
  "TikTok",
  "YouTube",
  "Twitch",
  "GitHub",
] as const;

const TAG_POOL = [
  "finance",
  "meme",
  "community",
  "viral",
  "crypto",
  "nft",
  "governance",
  "culture",
  "gaming",
  "identity",
  "ritual",
  "prophecy",
  "tribe",
  "signal",
  "artifact",
  "myth",
  "economy",
  "social",
  "digital",
  "ancient",
];

const INTERPRETATIONS = [
  "Collective digital narratives can influence decentralized financial behavior.",
  "Symbolic representation of tribal identity in post-human networks.",
  "Ritualistic coordination patterns suggest emergent collective intelligence.",
  "Memetic propagation indicates viral belief structures.",
  "Artifact suggests humans used digital tokens as status markers.",
  "Forum data reveals consensus-building as a cultural ritual.",
  "Signal strength correlates with cultural amplification events.",
  "This fragment demonstrates recursive meme evolution.",
  "Cross-platform propagation suggests meta-narrative formation.",
  "Decentralized coordination without central authority detected.",
  "Digital scarcity was used to create artificial value rituals.",
  "Communication patterns resemble religious prophecy distribution.",
  "Gaming economies mirror pre-collapse financial systems.",
  "Subculture formation through shared symbolic language.",
  "Viral spread indicates high memetic fitness.",
  "Archive fragment suggests collective myth-making.",
  "DAO structures imply attempted digital governance rituals.",
  "Short-form content optimized for attention capture.",
  "Hashtag clusters functioned as tribal identifiers.",
  "Anonymous forums enabled unfiltered cultural transmission.",
];

const SUMMARIES = [
  "Mass online coordination influencing markets.",
  "Viral image spread across global networks.",
  "Community-driven narrative formation.",
  "Decentralized decision-making attempt.",
  "Cultural symbol adoption and mutation.",
  "Digital artifact trading as status ritual.",
  "Prophetic communication in 280-character format.",
  "Short-form video trend propagation.",
  "In-game economy mirrors external markets.",
  "Subcultural boundary definition through language.",
  "Collective identity performance.",
  "Memetic replication with variation.",
  "Signal amplification through network effects.",
  "Ritualistic price discussion patterns.",
  "Governance token distribution event.",
  "Hashtag-driven collective action.",
  "Anonymous collective creative output.",
  "Digital relic with ascribed value.",
  "Cross-platform narrative migration.",
  "Echo chamber reinforcement detected.",
];

// Seed titles by category (expanded with variations to reach 1000+)
const TITLE_SEEDS: { title: string; type: string; yearBase: number }[] = [
  { title: "WallStreetBets Short Squeeze Thread", type: "Reddit threads", yearBase: 2021 },
  { title: "Bitcoin Pizza Day", type: "Crypto history", yearBase: 2010 },
  { title: "Dogecoin Genesis", type: "Crypto history", yearBase: 2013 },
  { title: "Pepe the Frog Emergence", type: "Memes", yearBase: 2005 },
  { title: "Rickroll Origin", type: "Memes", yearBase: 2007 },
  { title: "HODL Manifesto", type: "Crypto history", yearBase: 2013 },
  { title: "First NFT Sale", type: "NFT collections", yearBase: 2017 },
  { title: "Bored Ape Mint", type: "NFT collections", yearBase: 2021 },
  { title: "CryptoPunks Discovery", type: "NFT collections", yearBase: 2017 },
  { title: "Gamestop Saga Megathread", type: "Reddit threads", yearBase: 2021 },
  { title: "Satoshi Nakamoto Posts", type: "Crypto history", yearBase: 2009 },
  { title: "Ethereum ICO Discussion", type: "Crypto history", yearBase: 2014 },
  { title: "DAO Hack Post-Mortem", type: "DAO governance", yearBase: 2016 },
  { title: "Uniswap Governance Proposal 1", type: "DAO governance", yearBase: 2020 },
  { title: "Doge to the Moon Campaign", type: "Twitter/X debates", yearBase: 2021 },
  { title: "Elon Crypto Tweets Archive", type: "Twitter/X debates", yearBase: 2019 },
  { title: "Sea Shanty TikTok Wave", type: "TikTok trends", yearBase: 2021 },
  { title: "Among Us Explosion", type: "TikTok trends", yearBase: 2020 },
  { title: "Silk Road Forum Archives", type: "4chan culture", yearBase: 2011 },
  { title: "/biz/ Bitcoin Threads", type: "4chan culture", yearBase: 2017 },
  { title: "WoW Gold Farming Economy", type: "Gaming economies", yearBase: 2005 },
  { title: "CSGO Skin Market", type: "Gaming economies", yearBase: 2013 },
  { title: "Fortnite V-Buck Economy", type: "Gaming economies", yearBase: 2018 },
  { title: "Reddit Karma System Analysis", type: "Online subcultures", yearBase: 2008 },
  { title: "Discord Server Formation", type: "Online subcultures", yearBase: 2016 },
  { title: "Subreddit Drama Archive", type: "Reddit threads", yearBase: 2012 },
  { title: "AMC Ape Movement", type: "Reddit threads", yearBase: 2021 },
  { title: "Loss.jpg Evolution", type: "Memes", yearBase: 2008 },
  { title: "Doge Meme Origin", type: "Memes", yearBase: 2013 },
  { title: "Stonks Guy", type: "Memes", yearBase: 2019 },
  { title: "This Is Fine Dog", type: "Memes", yearBase: 2016 },
  { title: "Distracted Boyfriend", type: "Memes", yearBase: 2017 },
  { title: "NFT Avatar Boom", type: "NFT collections", yearBase: 2021 },
  { title: "Art Blocks Generative", type: "NFT collections", yearBase: 2020 },
  { title: "Moonbirds Drop", type: "NFT collections", yearBase: 2022 },
  { title: "DeFi Summer Threads", type: "Crypto history", yearBase: 2020 },
  { title: "LUNA Collapse Megathread", type: "Crypto history", yearBase: 2022 },
  { title: "FTX Fall Archive", type: "Crypto history", yearBase: 2022 },
  { title: "Bitcoin Halving 2020", type: "Crypto history", yearBase: 2020 },
  { title: "Ethereum Merge Discussion", type: "Crypto history", yearBase: 2022 },
  { title: "Meme Coin Pump Patterns", type: "Twitter/X debates", yearBase: 2021 },
  { title: "Influencer Crypto Promo", type: "Twitter/X debates", yearBase: 2017 },
  { title: "Fake Satoshi Claims", type: "Twitter/X debates", yearBase: 2014 },
  { title: "Vine Compilation Archive", type: "TikTok trends", yearBase: 2016 },
  { title: "Dance Challenge Propagation", type: "TikTok trends", yearBase: 2019 },
  { title: "BookTok Phenomenon", type: "TikTok trends", yearBase: 2021 },
  { title: "Polynomial Governance", type: "DAO governance", yearBase: 2021 },
  { title: "Constitution DAO", type: "DAO governance", yearBase: 2021 },
  { title: "MakerDAO Collateral Debates", type: "DAO governance", yearBase: 2019 },
  { title: "/pol/ Archive Sample", type: "4chan culture", yearBase: 2012 },
  { title: "Anonymous Greentext Corpus", type: "4chan culture", yearBase: 2010 },
  { title: "RuneScape Trading Culture", type: "Gaming economies", yearBase: 2004 },
  { title: "Second Life Linden Economy", type: "Gaming economies", yearBase: 2006 },
  { title: "Roblox DevEx", type: "Gaming economies", yearBase: 2016 },
  { title: "Furries Subculture Archive", type: "Online subcultures", yearBase: 2000 },
  { title: "Brony Phenomenon", type: "Online subcultures", yearBase: 2011 },
  { title: "K-Pop Stan Networks", type: "Online subcultures", yearBase: 2018 },
];

// Multiply seeds with year/tag/interpretation variations to get 1000+
function generateArchives(): ArchiveEntry[] {
  const out: ArchiveEntry[] = [];
  let id = 1;
  const rnd = (arr: readonly string[] | string[]) => arr[Math.floor(Math.random() * arr.length)];
  const rndN = (min: number, max: number) => min + Math.floor(Math.random() * (max - min + 1));

  for (let cycle = 0; cycle < 22; cycle++) {
    for (const seed of TITLE_SEEDS) {
      const yearOffset = cycle % 5;
      const year = String(seed.yearBase + yearOffset);
      const tagCount = 2 + (id % 4);
      const tags: string[] = [];
      const tagSet = new Set<string>();
      while (tagSet.size < tagCount) {
        tagSet.add(rnd(TAG_POOL));
      }
      tags.push(...Array.from(tagSet));

      out.push({
        id,
        title: seed.title + (cycle > 0 ? ` (variant ${cycle})` : ""),
        year,
        type: seed.type,
        source: rnd(SOURCES),
        tags,
        summary: rnd(SUMMARIES),
        signalStrength: Math.round((0.3 + Math.random() * 0.7) * 100) / 100,
        memeticScore: rndN(40, 98),
        aiInterpretation: rnd(INTERPRETATIONS),
        hidden: id % 17 === 0,
      });
      id++;
    }
  }

  return out;
}

export const ARCHIVES: ArchiveEntry[] = generateArchives();

export function getArchiveById(id: number): ArchiveEntry | undefined {
  return ARCHIVES.find((a) => a.id === id);
}

export function getArchivesByTag(tag: string): ArchiveEntry[] {
  return ARCHIVES.filter((a) => a.tags.includes(tag));
}

export function getRandomArchive(): ArchiveEntry {
  return ARCHIVES[Math.floor(Math.random() * ARCHIVES.length)];
}

/** Number of archives shown in the Archive network graph (terminal syncs with this set). */
export const ARCHIVES_GRAPH_SIZE = 60;

export function getRandomArchiveFromGraphPool(): ArchiveEntry {
  const pool = ARCHIVES.slice(0, ARCHIVES_GRAPH_SIZE);
  return pool[Math.floor(Math.random() * pool.length)];
}
