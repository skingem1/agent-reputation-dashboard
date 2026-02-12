// Revalidate every 5 minutes (ISR for real on-chain data)
export const revalidate = 300;
export const dynamicParams = true;

import { notFound } from "next/navigation";
import Link from "next/link";
import { getAgentById, getAllAgents } from "@/lib/data/onchain";
import { ReputationBadge } from "@/components/agents/reputation-badge";
import { ReputationChart } from "@/components/agents/reputation-chart";
import { ChainBadge } from "@/components/agents/chain-badge";
import { SkillBadge } from "@/components/agents/skill-badge";
import { TransactionList } from "@/components/agents/transaction-list";
import { ReviewList } from "@/components/agents/review-list";
import { DataProvenanceBadges } from "@/components/agents/data-provenance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn, getReputationColor, formatNumber } from "@/lib/utils";
import {
  ArrowLeft,
  Activity,
  CheckCircle,
  DollarSign,
  Clock,
  Wifi,
  Globe,
  ExternalLink,
  Copy,
} from "lucide-react";

export async function generateStaticParams() {
  const agents = await getAllAgents();
  return agents.map((agent) => ({ id: agent.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const agent = await getAgentById(id);
  if (!agent) return { title: "Agent Not Found | AgentRep" };
  return {
    title: `${agent.name} | AgentRep`,
    description: agent.description,
  };
}

export default async function AgentProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const agent = await getAgentById(id);
  if (!agent) notFound();

  const statusColor =
    agent.status === "active"
      ? "bg-emerald-500"
      : agent.status === "inactive"
        ? "bg-gray-400"
        : "bg-yellow-500";

  const subScores = [
    { label: "Reliability", value: agent.reputation.reliability },
    { label: "Accuracy", value: agent.reputation.accuracy },
    { label: "Speed", value: agent.reputation.speed },
    { label: "Trustworthiness", value: agent.reputation.trustworthiness },
  ];

  const statItems = [
    { icon: Activity, label: "Total Transactions", value: formatNumber(agent.stats.totalTransactions) },
    { icon: CheckCircle, label: "Success Rate", value: `${agent.stats.successRate}%` },
    { icon: DollarSign, label: "Value Processed", value: agent.stats.totalValueProcessed },
    { icon: Clock, label: "Avg Response", value: agent.stats.avgResponseTime },
    { icon: Wifi, label: "Uptime", value: `${agent.stats.uptime}%` },
    { icon: Globe, label: "Active Chains", value: agent.stats.activeChains.toString() },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Button asChild variant="ghost" size="sm" className="mb-6 gap-1">
        <Link href="/agents">
          <ArrowLeft className="h-4 w-4" />
          Back to Agents
        </Link>
      </Button>

      {/* Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={agent.avatar}
              alt={agent.name}
              className="h-16 w-16 rounded-xl bg-muted"
              width={64}
              height={64}
            />
            <span className={cn("absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-background", statusColor)} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{agent.name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{agent.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {agent.chains.map((chain) => (
                <ChainBadge key={chain} chainId={chain} size="md" />
              ))}
            </div>
            <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="font-mono">{agent.walletAddress}</span>
              {agent.website && (
                <a href={agent.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-foreground">
                  <ExternalLink className="h-3 w-3" /> Website
                </a>
              )}
              {agent.twitter && (
                <span className="flex items-center gap-1">
                  {agent.twitter}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left column — Reputation */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Reputation Score</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <ReputationBadge
                score={agent.reputation.overall}
                trend={agent.reputation.trend}
                size="lg"
              />
              <div className="w-full space-y-3">
                {subScores.map((sub) => (
                  <div key={sub.label}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{sub.label}</span>
                      <span className={cn("font-medium", getReputationColor(sub.value))}>
                        {sub.value}
                      </span>
                    </div>
                    <Progress value={sub.value} className="mt-1 h-1.5" />
                  </div>
                ))}
              </div>
              <div className="w-full border-t pt-3">
                <DataProvenanceBadges provenance={agent.dataProvenance} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">30-Day Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ReputationChart data={agent.reputation.historyLast30Days} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Skills</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-1.5">
              {agent.skills.map((skill) => (
                <SkillBadge key={skill} skill={skill} />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right column — Stats, Transactions, Reviews */}
        <div className="space-y-6 lg:col-span-2">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {statItems.map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{stat.label}</span>
                  </div>
                  <p className="mt-1 text-xl font-bold">{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabs */}
          <Tabs defaultValue="transactions">
            <TabsList>
              <TabsTrigger value="transactions">
                Transactions ({agent.transactions.length})
              </TabsTrigger>
              <TabsTrigger value="reviews">
                Reviews ({agent.reviews.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="transactions" className="mt-4">
              <TransactionList transactions={agent.transactions} />
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
              <ReviewList reviews={agent.reviews} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
