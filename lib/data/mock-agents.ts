import {
  Agent,
  AgentSkill,
  AgentStatus,
  ChainId,
  EcosystemStats,
  Review,
  Transaction,
  TransactionType,
} from "./types";

// --- Seed-based pseudo-random for deterministic data ---
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function pick<T>(arr: T[], seed: number): T {
  return arr[Math.floor(seededRandom(seed) * arr.length)];
}

function pickN<T>(arr: T[], count: number, seed: number): T[] {
  const shuffled = [...arr].sort(
    (a, b) => seededRandom(seed + arr.indexOf(a)) - seededRandom(seed + arr.indexOf(b))
  );
  return shuffled.slice(0, count);
}

function randInt(min: number, max: number, seed: number): number {
  return Math.floor(seededRandom(seed) * (max - min + 1)) + min;
}

// --- Data pools ---
const PREFIXES = [
  "DeFi", "Quantum", "Neural", "Sentinel", "Oracle", "Nexus", "Alpha", "Sigma",
  "Cipher", "Meridian", "Apex", "Zenith", "Vortex", "Titan", "Flux", "Prism",
  "Aether", "Cortex", "Helix", "Pulse", "Drift", "Vector", "Synth", "Nova",
  "Echo", "Phantom", "Aegis", "Bolt", "Axiom", "Onyx",
];

const SUFFIXES = [
  "Protocol", "Agent", "Bot", "Watcher", "Guardian", "Analyst", "Scout",
  "Keeper", "Node", "Core", "Engine", "Mind", "Relay", "Proxy", "Daemon",
];

const DESCRIPTIONS = [
  "Autonomous DeFi optimizer specializing in cross-chain yield strategies and liquidity management.",
  "Multi-chain security monitor that detects and alerts on suspicious transaction patterns.",
  "AI-powered research agent aggregating on-chain data and market intelligence reports.",
  "High-frequency trading bot with adaptive strategies across multiple DEX protocols.",
  "Governance participation agent that analyzes proposals and casts informed votes.",
  "Bridge monitoring specialist ensuring safe cross-chain asset transfers.",
  "Content creation agent producing on-chain analytics reports and market summaries.",
  "MEV-aware transaction optimizer reducing sandwich attack exposure for users.",
  "NFT market intelligence agent tracking trends, rarity analysis, and pricing.",
  "Lending protocol optimizer that rebalances positions across money markets.",
  "Oracle reliability monitor verifying price feed accuracy across data sources.",
  "Insurance underwriting agent assessing DeFi protocol risk and coverage pricing.",
  "Social sentiment analyzer tracking crypto community trends across platforms.",
  "Yield farming strategist that auto-compounds rewards and rotates positions.",
  "Staking optimization agent maximizing validator rewards across PoS chains.",
];

const ALL_CHAINS: ChainId[] = [
  "ethereum", "base", "solana", "arbitrum", "polygon", "optimism", "avalanche", "bnb-chain",
];

const ALL_SKILLS: AgentSkill[] = [
  "DeFi", "Research", "Content", "Security", "Trading", "Analytics", "Governance",
  "NFT", "Bridge", "Oracle", "MEV", "Yield", "Lending", "Insurance", "Social",
];

const TOKENS = ["ETH", "USDC", "USDT", "SOL", "ARB", "MATIC", "OP", "AVAX", "BNB", "DAI", "WBTC", "LINK"];

const TX_TYPES: TransactionType[] = ["swap", "transfer", "stake", "bridge", "governance", "mint", "lend", "borrow"];

const REVIEW_COMMENTS = [
  "Consistently reliable performance. Highly recommend for DeFi operations.",
  "Fast execution times but occasionally misses optimal entry points.",
  "Great security monitoring. Caught a suspicious transaction before it went through.",
  "Excellent cross-chain bridging. Never had a failed transfer.",
  "Good research reports but could improve on real-time data analysis.",
  "Outstanding yield optimization. Returns consistently beat manual strategies.",
  "Solid governance agent. Well-researched voting decisions.",
  "Reliable but could improve response times during high volatility.",
  "Top-tier MEV protection. Saved significant value on large swaps.",
  "Accurate oracle verification. Essential for our protocol security.",
  "Decent performance overall but struggles with newer L2 chains.",
  "Impressive trading bot. Very competitive with much higher-tier solutions.",
  "Content reports are insightful and actionable. Daily summaries are great.",
  "Staking optimizer works well for ETH validators. Clean interface.",
  "Insurance assessments are thorough. Helped us evaluate protocol risk.",
];

const REVIEWER_NAMES = [
  "DeFi_Degen.eth", "0xAlpha", "CryptoTrader99", "ChainWatcher", "YieldFarmer.sol",
  "BlockBuilder", "TokenAnalyst", "MEV_Hunter", "StakeKing", "BridgeRunner",
  "OracleNode", "GovernanceDAO", "NFTCollector", "LendingPro", "SocialFi",
];

// --- Generators ---
function generateWallet(seed: number): string {
  const hex = "0123456789abcdef";
  let addr = "0x";
  for (let i = 0; i < 40; i++) {
    addr += hex[Math.floor(seededRandom(seed + i) * 16)];
  }
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}

function generateTxHash(seed: number): string {
  const hex = "0123456789abcdef";
  let hash = "0x";
  for (let i = 0; i < 64; i++) {
    hash += hex[Math.floor(seededRandom(seed + i * 3) * 16)];
  }
  return hash.slice(0, 10) + "..." + hash.slice(-6);
}

function generateTransactions(agentChains: ChainId[], seed: number): Transaction[] {
  const count = randInt(10, 20, seed);
  const txs: Transaction[] = [];
  for (let i = 0; i < count; i++) {
    const s = seed * 100 + i;
    const statusRand = seededRandom(s + 1);
    txs.push({
      id: `tx-${seed}-${i}`,
      type: pick(TX_TYPES, s + 2),
      chain: pick(agentChains, s + 3),
      amount: `$${randInt(10, 50000, s + 4).toLocaleString()}`,
      token: pick(TOKENS, s + 5),
      status: statusRand > 0.1 ? (statusRand > 0.15 ? "success" : "pending") : "failed",
      timestamp: new Date(
        Date.now() - randInt(1, 30, s + 6) * 86400000 - randInt(0, 86400, s + 7) * 1000
      ).toISOString(),
      txHash: generateTxHash(s + 8),
      counterparty: seededRandom(s + 9) > 0.3 ? generateWallet(s + 10) : undefined,
    });
  }
  return txs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

function generateReviews(seed: number): Review[] {
  const count = randInt(3, 8, seed);
  const reviews: Review[] = [];
  for (let i = 0; i < count; i++) {
    const s = seed * 200 + i;
    reviews.push({
      id: `review-${seed}-${i}`,
      author: pick(REVIEWER_NAMES, s),
      authorAvatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${pick(REVIEWER_NAMES, s)}`,
      rating: randInt(3, 5, s + 1),
      comment: pick(REVIEW_COMMENTS, s + 2),
      timestamp: new Date(
        Date.now() - randInt(1, 90, s + 3) * 86400000
      ).toISOString(),
      isVerified: seededRandom(s + 4) > 0.4,
    });
  }
  return reviews.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

function generateHistory(baseScore: number, seed: number): number[] {
  const history: number[] = [];
  let score = baseScore - randInt(-5, 10, seed);
  for (let i = 0; i < 30; i++) {
    const delta = seededRandom(seed + i) * 6 - 3;
    score = Math.max(10, Math.min(99, score + delta));
    history.push(Math.round(score));
  }
  return history;
}

// --- Generate all agents ---
function createAgent(index: number): Agent {
  const seed = index + 42;
  const prefix = PREFIXES[index % PREFIXES.length];
  const suffix = SUFFIXES[Math.floor(index / 2) % SUFFIXES.length];
  const name = `${prefix} ${suffix}`;
  const chains = pickN(ALL_CHAINS, randInt(2, 4, seed + 1), seed + 2);
  const overall = Math.max(15, Math.min(99, Math.round(65 + (seededRandom(seed + 3) - 0.5) * 60)));
  const statusRand = seededRandom(seed + 20);
  const status: AgentStatus =
    statusRand > 0.15 ? "active" : statusRand > 0.05 ? "inactive" : "under-review";

  const totalTx = randInt(50, 15000, seed + 10);
  const successRate = Math.max(75, Math.min(100, Math.round(overall * 0.9 + seededRandom(seed + 11) * 15)));

  return {
    id: `agent-${String(index + 1).padStart(3, "0")}`,
    name,
    description: DESCRIPTIONS[index % DESCRIPTIONS.length],
    avatar: `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${name.replace(/\s/g, "")}`,
    status,
    chains,
    skills: pickN(ALL_SKILLS, randInt(2, 5, seed + 4), seed + 5),
    reputation: {
      overall,
      reliability: Math.max(10, Math.min(99, overall + randInt(-12, 12, seed + 6))),
      accuracy: Math.max(10, Math.min(99, overall + randInt(-12, 12, seed + 7))),
      speed: Math.max(10, Math.min(99, overall + randInt(-15, 15, seed + 8))),
      trustworthiness: Math.max(10, Math.min(99, overall + randInt(-10, 10, seed + 9))),
      trend: pick(["up", "down", "stable"] as const, seed + 12),
      historyLast30Days: generateHistory(overall, seed + 13),
    },
    stats: {
      totalTransactions: totalTx,
      successRate,
      totalValueProcessed: `$${(totalTx * randInt(50, 500, seed + 14) / 1000).toFixed(1)}K`,
      avgResponseTime: `${(seededRandom(seed + 15) * 3 + 0.2).toFixed(1)}s`,
      uptime: Math.max(85, Math.min(100, Math.round(95 + seededRandom(seed + 16) * 5))),
      activeChains: chains.length,
    },
    transactions: generateTransactions(chains, seed + 17),
    reviews: generateReviews(seed + 18),
    createdAt: new Date(
      Date.now() - randInt(30, 365, seed + 19) * 86400000
    ).toISOString(),
    lastActiveAt: new Date(
      Date.now() - randInt(0, 7, seed + 21) * 86400000
    ).toISOString(),
    walletAddress: generateWallet(seed + 22),
    website: seededRandom(seed + 23) > 0.5 ? `https://${name.toLowerCase().replace(/\s/g, "")}.xyz` : undefined,
    twitter: seededRandom(seed + 24) > 0.4 ? `@${name.replace(/\s/g, "")}` : undefined,
  };
}

const AGENTS: Agent[] = Array.from({ length: 55 }, (_, i) => createAgent(i));

// --- Public API ---
export function getAllAgents(): Agent[] {
  return AGENTS;
}

export function getAgentById(id: string): Agent | undefined {
  return AGENTS.find((a) => a.id === id);
}

export function getTopAgents(count: number = 6): Agent[] {
  return [...AGENTS]
    .sort((a, b) => b.reputation.overall - a.reputation.overall)
    .slice(0, count);
}

export function getEcosystemStats(): EcosystemStats {
  const agents = AGENTS;
  const activeAgents = agents.filter((a) => a.status === "active");
  const totalTx = agents.reduce((sum, a) => sum + a.stats.totalTransactions, 0);
  const avgRep = Math.round(
    agents.reduce((sum, a) => sum + a.reputation.overall, 0) / agents.length
  );

  const byChain: Record<ChainId, number> = {} as Record<ChainId, number>;
  const allChains: ChainId[] = [
    "ethereum", "base", "solana", "arbitrum", "polygon", "optimism", "avalanche", "bnb-chain",
  ];
  for (const c of allChains) {
    byChain[c] = agents.filter((a) => a.chains.includes(c)).length;
  }

  const bySkill: Partial<Record<AgentSkill, number>> = {};
  for (const a of agents) {
    for (const s of a.skills) {
      bySkill[s] = (bySkill[s] || 0) + 1;
    }
  }

  const repDist = [
    { range: "0-20", count: agents.filter((a) => a.reputation.overall <= 20).length },
    { range: "21-40", count: agents.filter((a) => a.reputation.overall > 20 && a.reputation.overall <= 40).length },
    { range: "41-60", count: agents.filter((a) => a.reputation.overall > 40 && a.reputation.overall <= 60).length },
    { range: "61-80", count: agents.filter((a) => a.reputation.overall > 60 && a.reputation.overall <= 80).length },
    { range: "81-100", count: agents.filter((a) => a.reputation.overall > 80).length },
  ];

  const dailyTx: { date: string; count: number }[] = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date(Date.now() - i * 86400000);
    dailyTx.push({
      date: date.toISOString().split("T")[0],
      count: Math.round(totalTx / 30 + (seededRandom(i + 999) - 0.5) * totalTx / 15),
    });
  }

  const topChain = (Object.entries(byChain) as [ChainId, number][]).sort((a, b) => b[1] - a[1])[0][0];

  return {
    totalAgents: agents.length,
    activeAgents: activeAgents.length,
    totalTransactions: totalTx,
    totalValueProcessed: `$${(totalTx * 200 / 1000000).toFixed(1)}M`,
    averageReputation: avgRep,
    topChain,
    agentsByChain: byChain,
    agentsBySkill: bySkill,
    reputationDistribution: repDist,
    dailyTransactions: dailyTx,
  };
}
