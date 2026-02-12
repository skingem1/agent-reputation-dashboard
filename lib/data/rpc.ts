/**
 * Ankr RPC configuration — free public endpoints (no API key required)
 * and Advanced Multichain API for indexed blockchain data.
 */

import { ChainId } from "./types";

// Ankr public RPC endpoints (rate-limited but free, no key)
export const ANKR_RPC: Record<ChainId, string> = {
  ethereum: "https://rpc.ankr.com/eth",
  base: "https://rpc.ankr.com/base",
  solana: "https://rpc.ankr.com/solana",
  arbitrum: "https://rpc.ankr.com/arbitrum",
  polygon: "https://rpc.ankr.com/polygon",
  optimism: "https://rpc.ankr.com/optimism",
  avalanche: "https://rpc.ankr.com/avalanche",
  "bnb-chain": "https://rpc.ankr.com/bsc",
};

// Ankr Advanced API endpoint (multichain queries)
export const ANKR_ADVANCED_API = "https://rpc.ankr.com/multichain";

// Ankr chain names for Advanced API requests
export const ANKR_CHAIN_NAMES: Record<ChainId, string> = {
  ethereum: "eth",
  base: "base",
  solana: "solana",
  arbitrum: "arbitrum",
  polygon: "polygon",
  optimism: "optimism",
  avalanche: "avalanche",
  "bnb-chain": "bsc",
};

// --- JSON-RPC helper ---
export async function rpcCall(
  endpoint: string,
  method: string,
  params: unknown[]
): Promise<unknown> {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
  });
  if (!res.ok) throw new Error(`RPC error ${res.status}: ${res.statusText}`);
  const json = await res.json();
  if (json.error) throw new Error(`RPC error: ${json.error.message}`);
  return json.result;
}

// --- Ankr Advanced API helper ---
export async function ankrAdvancedCall(
  method: string,
  params: Record<string, unknown>
): Promise<unknown> {
  const res = await fetch(ANKR_ADVANCED_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
  });
  if (!res.ok) throw new Error(`Ankr API error ${res.status}: ${res.statusText}`);
  const json = await res.json();
  if (json.error) throw new Error(`Ankr API error: ${json.error.message}`);
  return json.result;
}

// --- EVM contract call helper ---
export async function ethCall(
  chain: ChainId,
  to: string,
  data: string
): Promise<string> {
  const result = await rpcCall(ANKR_RPC[chain], "eth_call", [
    { to, data },
    "latest",
  ]);
  return result as string;
}

// --- Get ETH/native balance ---
export async function getBalance(
  chain: ChainId,
  address: string
): Promise<bigint> {
  const result = await rpcCall(ANKR_RPC[chain], "eth_getBalance", [
    address,
    "latest",
  ]);
  return BigInt(result as string);
}

// --- Get transaction count (nonce = proxy for # of transactions) ---
export async function getTransactionCount(
  chain: ChainId,
  address: string
): Promise<number> {
  const result = await rpcCall(ANKR_RPC[chain], "eth_getTransactionCount", [
    address,
    "latest",
  ]);
  return Number(BigInt(result as string));
}

// --- ABI encoding helpers ---
export function encodeUint256(n: number): string {
  return n.toString(16).padStart(64, "0");
}

export function encodeFunctionCall(selector: string, ...args: string[]): string {
  return selector + args.join("");
}

// Common function selectors (first 4 bytes of keccak256 of function signature)
export const SELECTORS = {
  // ERC-721
  totalSupply: "0x18160ddd",
  ownerOf: "0x6352211e",       // ownerOf(uint256)
  tokenURI: "0xc87b56dd",     // tokenURI(uint256)
  // Autonolas ServiceRegistry
  getService: "0x29e94130",    // getService(uint256)
  getAgentInstances: "0x1f51c821", // getAgentInstances(uint256)
} as const;
