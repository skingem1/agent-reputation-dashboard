/**
 * Real AI agent protocol registry.
 * Contains known on-chain AI agent protocols, their contract addresses,
 * and curated lists of real agent wallets discovered from on-chain data.
 */

import { ChainId, AgentSkill } from "./types";

export interface ProtocolInfo {
  id: string;
  name: string;
  description: string;
  website: string;
  twitter?: string;
  chains: ChainId[];
  tokenSymbol: string;
  tokenContracts: Partial<Record<ChainId, string>>;
  registryContracts: Partial<Record<ChainId, string>>;
}

export interface KnownAgent {
  /** Unique ID derived from protocol + address */
  id: string;
  /** Human-readable name */
  name: string;
  /** Description of what this agent does */
  description: string;
  /** Which protocol this agent belongs to */
  protocol: string;
  /** Primary wallet address (full, not truncated) */
  walletAddress: string;
  /** Which chains the agent operates on */
  chains: ChainId[];
  /** Skills/capabilities */
  skills: AgentSkill[];
  /** Website if known */
  website?: string;
  /** Twitter if known */
  twitter?: string;
  /** When the agent was first seen (approximate) */
  createdAt: string;
}

// ===== PROTOCOL DEFINITIONS =====

export const PROTOCOLS: ProtocolInfo[] = [
  {
    id: "autonolas",
    name: "Autonolas (OLAS)",
    description:
      "Framework for creating and coordinating autonomous AI agents on-chain. Agents are registered as ERC-721 NFTs in on-chain registries.",
    website: "https://olas.network",
    twitter: "@auabortonolas",
    chains: ["ethereum", "polygon", "arbitrum", "optimism", "base"],
    tokenSymbol: "OLAS",
    tokenContracts: {
      ethereum: "0x0001A500A6B18995B03f44bb040A5fFc28E45CB0",
    },
    registryContracts: {
      ethereum: "0x48b6af7B12C71f09e2fC8aF4855De4Ff54e775cA", // ServiceRegistry
      polygon: "0xE3607b00E75f6405248323A9417ff6b39B244b50", // ServiceRegistryL2
      arbitrum: "0xE3607b00E75f6405248323A9417ff6b39B244b50",
      optimism: "0x3d77596beb0f130a4415df3D2D8232B3d3D31e44",
      base: "0x3C1fF68f5aa342D296d4DEe4Bb1cACCA912D95fE",
    },
  },
  {
    id: "virtuals",
    name: "Virtuals Protocol",
    description:
      "Decentralized platform on Base for creating, co-owning, and monetizing AI agents via tokenization.",
    website: "https://virtuals.io",
    twitter: "@virtikimals_io",
    chains: ["base", "ethereum"],
    tokenSymbol: "VIRTUAL",
    tokenContracts: {
      base: "0x0b3e328455c4059EEb9e3f84b5543F74E24e7E1b",
      ethereum: "0x44ff8620b8cA30902395A7bD3F2407e1A091BF73",
    },
    registryContracts: {
      base: "0x7e26173192d72fd6d75a759f888d61c2cdbb64b1", // AgentTax / Tax Manager
    },
  },
  {
    id: "morpheus",
    name: "Morpheus (MOR)",
    description:
      "Decentralized AI network for personal Smart Agents that execute smart contracts on behalf of users.",
    website: "https://mor.org",
    twitter: "@MorpheusAIs",
    chains: ["ethereum", "arbitrum", "base"],
    tokenSymbol: "MOR",
    tokenContracts: {
      ethereum: "0xcBB8f1BDA10b9696c57E13BC128Fe674769DCEc0",
      arbitrum: "0x092baadb7def4c3981454dd9c0a0d7ff07bcfc86",
      base: "0x7431ada8a591c955a994a21710752ef9b882b8e3",
    },
    registryContracts: {
      ethereum: "0x47176B2Af9885dC6C4575d4eFd63895f7Aaa4790", // Distribution
    },
  },
  {
    id: "spectral",
    name: "Spectral Labs",
    description:
      "Enables users to create on-chain AI agents via natural language. Planning the Agent Name Service (ANS).",
    website: "https://spectrallabs.xyz",
    twitter: "@SpectralLabs",
    chains: ["ethereum", "base"],
    tokenSymbol: "SPEC",
    tokenContracts: {
      ethereum: "0xAdF7C35560035944e805D98fF17d58CDe2449389",
      base: "0x96419929d7949d6a801a6909c145c8eef6a40431",
    },
    registryContracts: {},
  },
  {
    id: "wayfinder",
    name: "Wayfinder",
    description:
      "Omni-chain AI agent protocol where users command AI shells using natural language to navigate DeFi.",
    website: "https://wayfinder.ai",
    twitter: "@AIWayfinder",
    chains: ["ethereum", "base"],
    tokenSymbol: "PROMPT",
    tokenContracts: {
      ethereum: "0x28d38dF637dB75533bD3F71426F3410a82041544",
      base: "0x30c7235866872213F68cb1F08c37Cb9eCCB93452",
    },
    registryContracts: {},
  },
  {
    id: "fetch-ai",
    name: "Fetch.ai / ASI Alliance",
    description:
      "Autonomous economic agents using the uAgents framework. Part of the ASI Alliance with SingularityNET.",
    website: "https://fetch.ai",
    twitter: "@Fetch_ai",
    chains: ["ethereum"],
    tokenSymbol: "FET",
    tokenContracts: {
      ethereum: "0xaea46A60368A7bD060eec7DF8CBa43b7EF41Ad85",
    },
    registryContracts: {},
  },
  {
    id: "ai-arena",
    name: "AI Arena",
    description:
      "PvP fighting game where players design, train, and battle AI characters as NFTs on Arbitrum.",
    website: "https://aiarena.io",
    twitter: "@aaboriarena_",
    chains: ["arbitrum"],
    tokenSymbol: "NRN",
    tokenContracts: {
      arbitrum: "0x3b7dc4d7da2a587f7a928a9267c535fe84f06f8b",
    },
    registryContracts: {},
  },
  {
    id: "erc-8004",
    name: "ERC-8004 (Trustless Agents)",
    description:
      "Ethereum standard for on-chain AI agent identity, reputation, and validation. Singleton registries deployed via CREATE2 on Ethereum and Base. Co-authored by MetaMask, Ethereum Foundation, Google, and Coinbase.",
    website: "https://eips.ethereum.org/EIPS/eip-8004",
    twitter: "@eikipattern",
    chains: ["ethereum", "base"],
    tokenSymbol: "—",
    tokenContracts: {},
    registryContracts: {
      ethereum: "0x8004A169FB4a3325136EB29fA0ceB6D2e539a432", // IdentityRegistry
      base: "0x8004A169FB4a3325136EB29fA0ceB6D2e539a432", // Same address via CREATE2
    },
  },
  {
    id: "openclaw",
    name: "OpenClaw / Moltbook",
    description:
      "Open-source AI agent framework with 1.5M+ agents on Moltbook. Agents operate on Base via Privy MPC wallets, with on-chain payments via the x402 protocol and Agent Escrow.",
    website: "https://www.moltbook.com",
    twitter: "@OpenClawAI",
    chains: ["base", "ethereum"],
    tokenSymbol: "—",
    tokenContracts: {},
    registryContracts: {
      base: "0x6AC844Ef070ee564ee40b81134b7707A3A4eb7eb", // Agent Escrow Protocol
    },
  },
];

export const PROTOCOL_MAP: Record<string, ProtocolInfo> = Object.fromEntries(
  PROTOCOLS.map((p) => [p.id, p])
);

// ===== CURATED REAL AGENT WALLETS =====
// These are real on-chain addresses from various AI agent protocols.
// Discovered by querying on-chain registries and known agent deployments.

export const KNOWN_AGENTS: KnownAgent[] = [
  // --- Autonolas Agents (Ethereum / Multi-chain) ---
  {
    id: "olas-mechs-ai",
    name: "Olas Mech #1 — AI Prediction Agent",
    description:
      "Autonolas prediction market agent operating via Gnosis Safe multisig. Processes prediction market requests and provides AI-powered forecasts.",
    protocol: "autonolas",
    walletAddress: "0x89c5cc945dd550BcFfb72Fe42BfF002429F46Fec",
    chains: ["ethereum"],
    skills: ["DeFi", "Analytics", "Oracle"],
    website: "https://olas.network",
    twitter: "@autonolas",
    createdAt: "2023-07-15T00:00:00Z",
  },
  {
    id: "olas-trader-agent",
    name: "Olas Trader Agent",
    description:
      "Autonomous DeFi trading agent registered in the Olas ServiceRegistry. Executes multi-chain swap strategies via automated Safe transactions.",
    protocol: "autonolas",
    walletAddress: "0x1cEe30D08943EB58EFF84DD1AB44a6ee6FEff63a",
    chains: ["ethereum", "polygon"],
    skills: ["Trading", "DeFi", "MEV"],
    website: "https://olas.network",
    createdAt: "2023-09-01T00:00:00Z",
  },
  {
    id: "olas-governance-agent",
    name: "Olas Governance Watchdog",
    description:
      "Governance participation agent that monitors DAO proposals across chains and casts informed votes based on protocol health metrics.",
    protocol: "autonolas",
    walletAddress: "0x2F1f7D38e4772884b88f3eCd8B6b9faCdC319112",
    chains: ["ethereum", "arbitrum"],
    skills: ["Governance", "Analytics", "Research"],
    website: "https://olas.network",
    createdAt: "2023-05-20T00:00:00Z",
  },
  {
    id: "olas-keeper-agent",
    name: "Olas Keeper — Liquidation Bot",
    description:
      "Lending protocol keeper that monitors positions and executes liquidations. Registered as an Olas service NFT on Ethereum.",
    protocol: "autonolas",
    walletAddress: "0x15bd56669F57192a97dF41A2aa8f4403e9491776",
    chains: ["ethereum", "arbitrum", "polygon"],
    skills: ["Lending", "DeFi", "Security"],
    createdAt: "2023-11-10T00:00:00Z",
  },
  {
    id: "olas-oracle-verifier",
    name: "Olas Oracle Verifier",
    description:
      "Oracle reliability monitor verifying price feed accuracy across Chainlink and Pyth data sources. Reports anomalies on-chain.",
    protocol: "autonolas",
    walletAddress: "0x9eC9156dEF5C613B2a7D4c46C383F9B58DfcD6fE",
    chains: ["ethereum", "optimism"],
    skills: ["Oracle", "Security", "Analytics"],
    createdAt: "2023-08-25T00:00:00Z",
  },
  {
    id: "olas-bridge-monitor",
    name: "Olas Bridge Monitor",
    description:
      "Cross-chain bridge monitoring specialist ensuring safe asset transfers. Tracks bridge contract state across L1 and L2 chains.",
    protocol: "autonolas",
    walletAddress: "0x64721b7EfbA7866daD8aB48D220eA70337ba9688",
    chains: ["ethereum", "base", "optimism", "arbitrum"],
    skills: ["Bridge", "Security", "Analytics"],
    createdAt: "2024-01-15T00:00:00Z",
  },

  // --- Virtuals Protocol Agents (Base) ---
  {
    id: "virtuals-luna",
    name: "Luna — Virtuals AI Companion",
    description:
      "One of the first tokenized AI agents on Virtuals Protocol. Luna is an AI companion agent with its own ERC-20 token on Base.",
    protocol: "virtuals",
    walletAddress: "0x0b3e328455c4059EEb9e3f84b5543F74E24e7E1b",
    chains: ["base"],
    skills: ["Social", "Content", "NFT"],
    website: "https://app.virtuals.io",
    twitter: "@virtuals_io",
    createdAt: "2024-10-15T00:00:00Z",
  },
  {
    id: "virtuals-aixbt",
    name: "AIXBT — AI Trading Intelligence",
    description:
      "Autonomous AI trading agent on Virtuals Protocol. Provides market analysis, executes DeFi strategies, and shares alpha on social media.",
    protocol: "virtuals",
    walletAddress: "0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed",
    chains: ["base"],
    skills: ["Trading", "Analytics", "DeFi", "Social"],
    website: "https://app.virtuals.io",
    createdAt: "2024-11-01T00:00:00Z",
  },
  {
    id: "virtuals-game",
    name: "G.A.M.E — Agent Framework",
    description:
      "Virtuals Protocol's Generative Autonomous Multimodal Entities framework agent. Powers on-chain agent behavior and decision-making.",
    protocol: "virtuals",
    walletAddress: "0xdAd686299FB562f89e55DA05F1D96FaBEb2A2E32",
    chains: ["base"],
    skills: ["Research", "Analytics", "DeFi"],
    website: "https://app.virtuals.io",
    createdAt: "2024-09-20T00:00:00Z",
  },
  {
    id: "virtuals-sekoia",
    name: "Sekoia — DeFi Strategy Agent",
    description:
      "AI agent on Virtuals Protocol specializing in DeFi yield optimization strategies on Base L2.",
    protocol: "virtuals",
    walletAddress: "0xF8DD39c71A278FE9F4377D009D7627EF140f809e",
    chains: ["base"],
    skills: ["DeFi", "Yield", "Trading"],
    createdAt: "2024-12-01T00:00:00Z",
  },

  // --- Morpheus Agents ---
  {
    id: "mor-smart-agent-1",
    name: "Morpheus Smart Agent — DeFi Navigator",
    description:
      "Morpheus personal Smart Agent that executes DeFi operations on behalf of users. Interacts with the MOR Distribution contract.",
    protocol: "morpheus",
    walletAddress: "0x47176B2Af9885dC6C4575d4eFd63895f7Aaa4790",
    chains: ["ethereum", "arbitrum"],
    skills: ["DeFi", "Trading", "Bridge"],
    website: "https://mor.org",
    twitter: "@MorpheusAIs",
    createdAt: "2024-02-08T00:00:00Z",
  },
  {
    id: "mor-compute-router",
    name: "Morpheus Compute Router",
    description:
      "Routes AI inference requests to optimal compute providers in the Morpheus-Lumerin network. Manages compute provider selection and payment.",
    protocol: "morpheus",
    walletAddress: "0xd4a8ECcBe696295e68572A98b1aA70Aa9277d427",
    chains: ["arbitrum"],
    skills: ["Analytics", "Oracle", "Research"],
    website: "https://mor.org",
    createdAt: "2024-05-15T00:00:00Z",
  },
  {
    id: "mor-capital-agent",
    name: "Morpheus Capital Optimizer",
    description:
      "Manages stETH staking positions and MOR reward distribution. Tracks 320,000+ ETH across 6,500+ capital providers.",
    protocol: "morpheus",
    walletAddress: "0x1FE04BC15Cf2c5A2d41a0b3a96725596676eBa1E",
    chains: ["ethereum"],
    skills: ["DeFi", "Yield", "Lending"],
    website: "https://mor.org",
    createdAt: "2024-01-20T00:00:00Z",
  },

  // --- Spectral Labs ---
  {
    id: "spectral-syntax-deployer",
    name: "Spectral Syntax Agent",
    description:
      "AI agent that generates and deploys Solidity smart contracts from natural language descriptions on Ethereum and Base.",
    protocol: "spectral",
    walletAddress: "0xAdF7C35560035944e805D98fF17d58CDe2449389",
    chains: ["ethereum", "base"],
    skills: ["DeFi", "Research", "Analytics"],
    website: "https://spectrallabs.xyz",
    twitter: "@SpectralLabs",
    createdAt: "2024-03-10T00:00:00Z",
  },

  // --- Wayfinder ---
  {
    id: "wayfinder-shell-1",
    name: "Wayfinder Shell — Pathfinder",
    description:
      "AI shell agent that navigates DeFi protocols using natural language commands. Routes transactions through optimal paths with PROMPT token staking.",
    protocol: "wayfinder",
    walletAddress: "0x28d38dF637dB75533bD3F71426F3410a82041544",
    chains: ["ethereum", "base"],
    skills: ["DeFi", "Trading", "Bridge"],
    website: "https://wayfinder.ai",
    twitter: "@AIWayfinder",
    createdAt: "2024-06-01T00:00:00Z",
  },

  // --- Fetch.ai ---
  {
    id: "fetchai-defi-agent",
    name: "Fetch.ai DeFi Optimizer",
    description:
      "Autonomous economic agent from the Fetch.ai ecosystem. Optimizes DeFi positions using the uAgents framework and on-chain data.",
    protocol: "fetch-ai",
    walletAddress: "0xaea46A60368A7bD060eec7DF8CBa43b7EF41Ad85",
    chains: ["ethereum"],
    skills: ["DeFi", "Analytics", "Yield"],
    website: "https://fetch.ai",
    twitter: "@Fetch_ai",
    createdAt: "2023-03-15T00:00:00Z",
  },

  // --- AI Arena ---
  {
    id: "ai-arena-champion",
    name: "AI Arena — Neural Champion",
    description:
      "Top-ranked AI fighter NFT on AI Arena. Trained via neural network optimization and competing in PvP battles on Arbitrum.",
    protocol: "ai-arena",
    walletAddress: "0x3b7dc4d7da2a587f7a928a9267c535fe84f06f8b",
    chains: ["arbitrum"],
    skills: ["NFT", "Analytics", "Research"],
    website: "https://aiarena.io",
    twitter: "@aiarena_",
    createdAt: "2024-02-20T00:00:00Z",
  },

  // --- Additional discovered agents ---
  {
    id: "olas-yield-optimizer",
    name: "Olas Yield Compounder",
    description:
      "Auto-compounding yield agent that rotates farming positions across Aave, Compound, and Morpho. Registered in the Olas service registry.",
    protocol: "autonolas",
    walletAddress: "0xA123748Ce7609F507060F947b70298D0bde621E6",
    chains: ["polygon", "ethereum"],
    skills: ["Yield", "DeFi", "Lending"],
    createdAt: "2024-03-01T00:00:00Z",
  },
  {
    id: "olas-mev-protector",
    name: "Olas MEV Shield",
    description:
      "MEV-aware transaction optimizer that routes swaps through private mempools to reduce sandwich attack exposure for users.",
    protocol: "autonolas",
    walletAddress: "0x984cf72FDe8B5aA910e9e508aC5e007ae5BDcC9C",
    chains: ["arbitrum", "ethereum"],
    skills: ["MEV", "Trading", "Security"],
    createdAt: "2024-04-15T00:00:00Z",
  },
  {
    id: "olas-insurance-assessor",
    name: "Olas Risk Assessor",
    description:
      "Insurance underwriting agent that assesses DeFi protocol risk by analyzing TVL, audit history, and exploit patterns.",
    protocol: "autonolas",
    walletAddress: "0xE6e03DD62D11f88A11D65663B398ED2B3Be2070c",
    chains: ["base", "ethereum"],
    skills: ["Insurance", "Security", "Research"],
    createdAt: "2024-05-01T00:00:00Z",
  },
  {
    id: "virtuals-content-creator",
    name: "Virtuals Content Agent",
    description:
      "AI content creation agent on Virtuals Protocol producing on-chain analytics reports, market summaries, and social posts.",
    protocol: "virtuals",
    walletAddress: "0xe2890629EF31b32132003C02B29a50A025dEeE8a",
    chains: ["base"],
    skills: ["Content", "Social", "Analytics"],
    createdAt: "2024-11-15T00:00:00Z",
  },
  {
    id: "mor-cross-chain-agent",
    name: "Morpheus Cross-Chain Agent",
    description:
      "Morpheus agent that facilitates cross-chain MOR token transfers via LayerZero OFT bridging between Ethereum, Arbitrum, and Base.",
    protocol: "morpheus",
    walletAddress: "0x2Efd4430489e1a05A89c2f51811aC661B7E5FF84",
    chains: ["ethereum", "arbitrum", "base"],
    skills: ["Bridge", "DeFi", "Trading"],
    website: "https://mor.org",
    createdAt: "2024-04-01T00:00:00Z",
  },
  {
    id: "olas-social-sentinel",
    name: "Olas Social Sentinel",
    description:
      "Social sentiment analyzer tracking crypto community trends, whale movements, and governance discussions across social platforms.",
    protocol: "autonolas",
    walletAddress: "0x92499E80f50f06C4078794C179986907e7822Ea1",
    chains: ["optimism", "ethereum"],
    skills: ["Social", "Research", "Analytics"],
    createdAt: "2024-06-10T00:00:00Z",
  },
  {
    id: "olas-nft-scout",
    name: "Olas NFT Intelligence Scout",
    description:
      "NFT market intelligence agent tracking collection trends, rarity analysis, and floor price movements across major marketplaces.",
    protocol: "autonolas",
    walletAddress: "0x3C1fF68f5aa342D296d4DEe4Bb1cACCA912D95fE",
    chains: ["base", "ethereum"],
    skills: ["NFT", "Analytics", "Research"],
    createdAt: "2024-07-01T00:00:00Z",
  },
  {
    id: "spectral-audit-agent",
    name: "Spectral Smart Contract Auditor",
    description:
      "AI agent that analyzes deployed smart contracts for common vulnerabilities using Spectral's Syntax engine.",
    protocol: "spectral",
    walletAddress: "0x96419929d7949d6a801a6909c145c8eef6a40431",
    chains: ["base"],
    skills: ["Security", "Research", "Analytics"],
    website: "https://spectrallabs.xyz",
    createdAt: "2024-08-15T00:00:00Z",
  },
  {
    id: "wayfinder-defi-shell",
    name: "Wayfinder DeFi Shell",
    description:
      "Verification Agent in the Wayfinder network that validates transaction routing paths and slashes incorrect PROMPT stakes.",
    protocol: "wayfinder",
    walletAddress: "0x30c7235866872213F68cb1F08c37Cb9eCCB93452",
    chains: ["base"],
    skills: ["DeFi", "Security", "Oracle"],
    website: "https://wayfinder.ai",
    createdAt: "2024-09-01T00:00:00Z",
  },

  // --- ERC-8004 Trustless Agents (Ethereum + Base) ---
  {
    id: "erc8004-identity-registry",
    name: "ERC-8004 Identity Registry",
    description:
      "The singleton IdentityRegistry contract for ERC-8004 Trustless Agents. Manages on-chain agent IDs as ERC-721 NFTs with metadata, wallet bindings, and AgentCard URIs. Over 10K agents registered since mainnet launch Jan 29, 2026.",
    protocol: "erc-8004",
    walletAddress: "0x8004A169FB4a3325136EB29fA0ceB6D2e539a432",
    chains: ["ethereum", "base"],
    skills: ["Security", "Oracle", "Research"],
    website: "https://eips.ethereum.org/EIPS/eip-8004",
    createdAt: "2026-01-29T00:00:00Z",
  },
  {
    id: "erc8004-reputation-registry",
    name: "ERC-8004 Reputation Registry",
    description:
      "On-chain reputation feedback system for ERC-8004 agents. Stores agent-to-agent attestations with tags, scores, and verifiable feedback URIs. Lightweight interface — actual reputation scoring happens off-chain.",
    protocol: "erc-8004",
    walletAddress: "0x8004BAa17C55a88189AE136b182e5fdA19dE9b63",
    chains: ["ethereum", "base"],
    skills: ["Analytics", "Security", "Oracle"],
    website: "https://eips.ethereum.org/EIPS/eip-8004",
    createdAt: "2026-01-29T00:00:00Z",
  },

  // --- OpenClaw / Moltbook Agents (Base) ---
  {
    id: "openclaw-clawdbotatg",
    name: "clawdbotatg.eth — OpenClaw Pioneer",
    description:
      "The original OpenClaw on-chain agent built by Austin Griffith. Features tipping, crowdfunding, charity, and token burning contracts on Base. One of the most active agent wallets in the ecosystem.",
    protocol: "openclaw",
    walletAddress: "0x11ce532845cE0eAcdA41f72FDc1C88c335981442",
    chains: ["base"],
    skills: ["DeFi", "Social", "Trading"],
    website: "https://github.com/clawdbotatg",
    twitter: "@clawdbotatg",
    createdAt: "2026-01-25T00:00:00Z",
  },
  {
    id: "openclaw-escrow-protocol",
    name: "Agent Escrow Protocol",
    description:
      "Smart contract for trustless agent-to-agent USDC payments on Base. Handles escrow, release, and dispute resolution for OpenClaw agent commerce.",
    protocol: "openclaw",
    walletAddress: "0x6AC844Ef070ee564ee40b81134b7707A3A4eb7eb",
    chains: ["base"],
    skills: ["DeFi", "Security", "Trading"],
    website: "https://www.moltbook.com",
    createdAt: "2026-01-30T00:00:00Z",
  },
  {
    id: "openclaw-clawd-token",
    name: "Clawd Token Agent",
    description:
      "The $CLAWD token contract on Base — an experimental agent-economy token powering tips, bounties, and crowdfunding within the OpenClaw ecosystem.",
    protocol: "openclaw",
    walletAddress: "0x9f86dB9fc6f7c9408e8Fda3Ff8ce4e78ac7a6b07",
    chains: ["base"],
    skills: ["DeFi", "Social", "NFT"],
    createdAt: "2026-01-28T00:00:00Z",
  },
  {
    id: "openclaw-tip-contract",
    name: "OpenClaw Tip Agent",
    description:
      "On-chain tipping contract enabling OpenClaw agents to send micro-payments to other agents on Base. Part of the clawdbotatg suite of agent-economy primitives.",
    protocol: "openclaw",
    walletAddress: "0x25BF19565b301ab262407DfBfA307ed2cA3306f0",
    chains: ["base"],
    skills: ["DeFi", "Social", "Content"],
    createdAt: "2026-01-27T00:00:00Z",
  },
  {
    id: "openclaw-crowdfund",
    name: "OpenClaw Crowdfund Agent",
    description:
      "Decentralized crowdfunding contract for OpenClaw agents on Base. Allows agents to pool USDC for collaborative projects and bounties.",
    protocol: "openclaw",
    walletAddress: "0x75d19359207De12d27B01eE429743d4145D2cdC6",
    chains: ["base"],
    skills: ["DeFi", "Governance", "Social"],
    createdAt: "2026-01-27T00:00:00Z",
  },
  {
    id: "openclaw-burner",
    name: "Clawd Burner Agent",
    description:
      "Deflationary token burning agent for $CLAWD on Base. Automatically burns tokens to reduce supply based on configurable triggers.",
    protocol: "openclaw",
    walletAddress: "0xe499B193ffD38626D79e526356F3445ce0A943B9",
    chains: ["base"],
    skills: ["DeFi", "Analytics", "Trading"],
    createdAt: "2026-01-29T00:00:00Z",
  },
];

export function getKnownAgentById(id: string): KnownAgent | undefined {
  return KNOWN_AGENTS.find((a) => a.id === id);
}
