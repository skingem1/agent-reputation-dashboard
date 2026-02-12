import Link from "next/link";
import { getEcosystemStats, getTopAgents } from "@/lib/data/mock-agents";
import { CHAINS, CHAIN_MAP } from "@/lib/data/chains";
import { StatCard } from "@/components/dashboard/stat-card";
import { BarChart } from "@/components/dashboard/bar-chart";
import { AreaChart } from "@/components/dashboard/area-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReputationBadge } from "@/components/agents/reputation-badge";
import { ChainBadge } from "@/components/agents/chain-badge";
import { formatNumber, cn, getReputationBgColor } from "@/lib/utils";
import { Bot, Users, Activity, Shield, BarChart3 } from "lucide-react";

export const metadata = {
  title: "Dashboard | AgentRep",
  description: "Ecosystem analytics for the multi-chain AI agent reputation platform",
};

export default function DashboardPage() {
  const stats = getEcosystemStats();
  const topAgents = getTopAgents(10);

  const chainChartData = CHAINS.map((chain) => ({
    label: chain.name,
    value: stats.agentsByChain[chain.id] || 0,
    color: chain.color,
  })).sort((a, b) => b.value - a.value);

  const skillChartData = Object.entries(stats.agentsBySkill)
    .map(([skill, count]) => ({
      label: skill,
      value: count ?? 0,
      color: "#6366f1",
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Ecosystem Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Real-time overview of the multi-chain AI agent ecosystem
            </p>
          </div>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard
          title="Total Agents"
          value={stats.totalAgents}
          icon={Bot}
          trend="up"
          description="All registered agents"
        />
        <StatCard
          title="Active Agents"
          value={stats.activeAgents}
          icon={Users}
          trend="up"
          description="Currently operational"
        />
        <StatCard
          title="Total Transactions"
          value={formatNumber(stats.totalTransactions)}
          icon={Activity}
          trend="up"
          description="Across all chains"
        />
        <StatCard
          title="Avg Reputation"
          value={stats.averageReputation}
          icon={Shield}
          trend="stable"
          description="Ecosystem average"
        />
      </div>

      {/* Charts Row */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <BarChart data={chainChartData} title="Agents by Chain" />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <BarChart data={skillChartData} title="Agents by Skill" />
          </CardContent>
        </Card>
      </div>

      {/* Reputation Distribution & Daily Transactions */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold">Reputation Distribution</h3>
            <div className="mt-4 flex items-end gap-2">
              {stats.reputationDistribution.map((bucket) => {
                const maxCount = Math.max(...stats.reputationDistribution.map((b) => b.count), 1);
                const heightPercent = Math.max((bucket.count / maxCount) * 100, 5);
                const color =
                  bucket.range === "81-100"
                    ? "#10b981"
                    : bucket.range === "61-80"
                      ? "#eab308"
                      : bucket.range === "41-60"
                        ? "#f97316"
                        : bucket.range === "21-40"
                          ? "#ef4444"
                          : "#dc2626";
                return (
                  <div key={bucket.range} className="flex flex-1 flex-col items-center gap-1">
                    <span className="text-xs font-medium">{bucket.count}</span>
                    <div
                      className="w-full rounded-t-md transition-all"
                      style={{
                        height: `${heightPercent}px`,
                        minHeight: "8px",
                        maxHeight: "120px",
                        backgroundColor: color,
                      }}
                    />
                    <span className="text-[10px] text-muted-foreground">{bucket.range}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <AreaChart data={stats.dailyTransactions} title="Daily Transactions (30d)" />
          </CardContent>
        </Card>
      </div>

      {/* Top Agents Leaderboard */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Top Agents Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {topAgents.map((agent, i) => (
              <Link
                key={agent.id}
                href={`/agents/${agent.id}`}
                className="flex items-center gap-4 rounded-lg border p-3 transition-colors hover:bg-muted/50"
              >
                <span className="w-6 text-center text-sm font-bold text-muted-foreground">
                  {i + 1}
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={agent.avatar}
                  alt={agent.name}
                  className="h-8 w-8 rounded-full bg-muted"
                  width={32}
                  height={32}
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{agent.name}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    {agent.chains.slice(0, 3).map((chain) => (
                      <ChainBadge key={chain} chainId={chain} size="sm" />
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <ReputationBadge score={agent.reputation.overall} />
                </div>
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-medium">{formatNumber(agent.stats.totalTransactions)}</p>
                  <p className="text-[10px] text-muted-foreground">transactions</p>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
