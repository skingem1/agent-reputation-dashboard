import { Chain, ChainId } from "./types";

export const CHAINS: Chain[] = [
  { id: "ethereum", name: "Ethereum", color: "#627EEA", agentCount: 0 },
  { id: "base", name: "Base", color: "#0052FF", agentCount: 0 },
  { id: "solana", name: "Solana", color: "#9945FF", agentCount: 0 },
  { id: "arbitrum", name: "Arbitrum", color: "#28A0F0", agentCount: 0 },
  { id: "polygon", name: "Polygon", color: "#8247E5", agentCount: 0 },
  { id: "optimism", name: "Optimism", color: "#FF0420", agentCount: 0 },
  { id: "avalanche", name: "Avalanche", color: "#E84142", agentCount: 0 },
  { id: "bnb-chain", name: "BNB Chain", color: "#F3BA2F", agentCount: 0 },
];

export const CHAIN_MAP: Record<ChainId, Chain> = Object.fromEntries(
  CHAINS.map((c) => [c.id, c])
) as Record<ChainId, Chain>;
