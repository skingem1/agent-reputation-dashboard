// Revalidate every 5 minutes (ISR for real on-chain data)
export const revalidate = 300;

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AgentCard } from "@/components/agents/agent-card";
import { getTopAgents, getEcosystemStats } from "@/lib/data/onchain";
import { CHAINS } from "@/lib/data/chains";
import { formatNumber } from "@/lib/utils";
import {
  ArrowRight,
  Bot,
  Activity,
  Shield,
  Search,
  TrendingUp,
  Users,
  Zap,
  Plus,
} from "lucide-react";

export default async function HomePage() {
  const topAgents = await getTopAgents(6);
  const stats = await getEcosystemStats();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-cyan-500/10 scanlines">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-violet-500/5 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_oklch(0.7_0.2_198_/_0.08)_0%,_transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-display tracking-tight sm:text-5xl lg:text-6xl">
              Discover & Evaluate{" "}
              <span className="gradient-text neon-text-cyan">AI Agents</span>{" "}
              Across Chains
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Your unified platform for tracking reputation, metrics, and performance
              of autonomous agents in the decentralized ecosystem.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="gap-2 bg-gradient-to-r from-cyan-600 to-cyan-500 text-black font-semibold hover:from-cyan-500 hover:to-cyan-400 border-none glow-cyan">
                <Link href="/agents">
                  <Search className="h-4 w-4" />
                  Explore Agents
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300">
                <Link href="/dashboard">
                  <TrendingUp className="h-4 w-4" />
                  View Dashboard
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2 border-violet-500/30 text-violet-400 hover:bg-violet-500/10 hover:text-violet-300">
                <Link href="/agents/register">
                  <Plus className="h-4 w-4" />
                  Register Your Agent
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-cyan-500/10">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { icon: Bot, value: stats.totalAgents, label: "Total Agents" },
              { icon: Users, value: stats.activeAgents, label: "Active Agents" },
              { icon: Activity, value: formatNumber(stats.totalTransactions), label: "Transactions" },
              { icon: Shield, value: stats.averageReputation, label: "Avg Reputation" },
            ].map((stat) => (
              <Card key={stat.label} className="gradient-border cyber-card">
                <CardContent className="relative z-10 flex items-center gap-3 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10">
                    <stat.icon className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-display">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Chains */}
      <section className="border-b border-cyan-500/10">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-display">Supported Chains</h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Track agents across the leading blockchains
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {CHAINS.map((chain) => (
              <Link key={chain.id} href={`/agents?chain=${chain.id}`}>
                <Card className="group text-center cyber-card hover:-translate-y-0.5">
                  <CardContent className="p-4">
                    <div
                      className="mx-auto flex h-10 w-10 items-center justify-center rounded-full transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${chain.color}20` }}
                    >
                      <span className="text-sm font-bold" style={{ color: chain.color }}>
                        {chain.name.slice(0, 2)}
                      </span>
                    </div>
                    <p className="mt-2 text-xs font-medium">{chain.name}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {stats.agentsByChain[chain.id]} agents
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Agents */}
      <section className="border-b border-cyan-500/10">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-display">Top Rated Agents</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Highest reputation scores across all chains
              </p>
            </div>
            <Button asChild variant="ghost" className="gap-1 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10">
              <Link href="/agents">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-display">How It Works</h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Three simple steps to leverage agent reputation data
          </p>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              {
                icon: Search,
                title: "Discover",
                description: "Browse AI agents across multiple blockchains. Filter by chain, skill, and reputation score.",
              },
              {
                icon: Shield,
                title: "Evaluate",
                description: "Check detailed reputation metrics, transaction history, and peer reviews.",
              },
              {
                icon: Zap,
                title: "Trust",
                description: "Make informed decisions backed by on-chain data and community feedback.",
              },
            ].map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/10 to-violet-500/10 border border-cyan-500/20">
                  <step.icon className="h-6 w-6 text-cyan-400" />
                </div>
                <div className="mt-1 text-xs font-medium text-cyan-400/60">
                  Step {i + 1}
                </div>
                <h3 className="mt-2 text-lg font-display">{step.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
