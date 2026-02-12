export type ChainId =
  | "ethereum"
  | "base"
  | "solana"
  | "arbitrum"
  | "polygon"
  | "optimism"
  | "avalanche"
  | "bnb-chain";

export type AgentSkill =
  | "DeFi"
  | "Research"
  | "Content"
  | "Security"
  | "Trading"
  | "Analytics"
  | "Governance"
  | "NFT"
  | "Bridge"
  | "Oracle"
  | "MEV"
  | "Yield"
  | "Lending"
  | "Insurance"
  | "Social";

export type AgentStatus = "active" | "inactive" | "under-review";

export type TransactionType =
  | "swap"
  | "transfer"
  | "stake"
  | "bridge"
  | "governance"
  | "mint"
  | "lend"
  | "borrow";

export interface Chain {
  id: ChainId;
  name: string;
  color: string;
  agentCount: number;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  avatar: string;
  status: AgentStatus;
  chains: ChainId[];
  skills: AgentSkill[];
  reputation: ReputationScore;
  stats: AgentStats;
  transactions: Transaction[];
  reviews: Review[];
  createdAt: string;
  lastActiveAt: string;
  walletAddress: string;
  website?: string;
  twitter?: string;
}

export interface ReputationScore {
  overall: number;
  reliability: number;
  accuracy: number;
  speed: number;
  trustworthiness: number;
  trend: "up" | "down" | "stable";
  historyLast30Days: number[];
}

export interface AgentStats {
  totalTransactions: number;
  successRate: number;
  totalValueProcessed: string;
  avgResponseTime: string;
  uptime: number;
  activeChains: number;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  chain: ChainId;
  amount: string;
  token: string;
  status: "success" | "pending" | "failed";
  timestamp: string;
  txHash: string;
  counterparty?: string;
}

export interface Review {
  id: string;
  author: string;
  authorAvatar: string;
  rating: number;
  comment: string;
  timestamp: string;
  isVerified: boolean;
}

export interface EcosystemStats {
  totalAgents: number;
  activeAgents: number;
  totalTransactions: number;
  totalValueProcessed: string;
  averageReputation: number;
  topChain: ChainId;
  agentsByChain: Record<ChainId, number>;
  agentsBySkill: Partial<Record<AgentSkill, number>>;
  reputationDistribution: { range: string; count: number }[];
  dailyTransactions: { date: string; count: number }[];
}

export interface AgentFilters {
  search: string;
  chains: ChainId[];
  skills: AgentSkill[];
  minReputation: number;
  maxReputation: number;
  status: AgentStatus | "all";
  sortBy: "reputation" | "transactions" | "recent" | "name";
  sortOrder: "asc" | "desc";
}
