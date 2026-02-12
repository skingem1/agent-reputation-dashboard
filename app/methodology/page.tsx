import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Shield,
  Target,
  Zap,
  Heart,
  Link2,
  Database,
  Cpu,
  Activity,
  TrendingUp,
  Layers,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Scoring Methodology | AgentRep",
  description:
    "Learn how AgentRep computes multi-faceted reputation scores for AI agents using hybrid on-chain and off-chain data.",
};

export default function MethodologyPage() {
  const subScores = [
    {
      name: "Reliability",
      weight: 30,
      icon: Shield,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500",
      inputs: [
        "Protocol base score",
        "Agent age bonus",
        "Multi-chain presence",
        "Transaction activity",
        "Robustness score",
        "Delivery rate",
      ],
    },
    {
      name: "Accuracy",
      weight: 25,
      icon: Target,
      color: "text-blue-500",
      bgColor: "bg-blue-500",
      inputs: [
        "Protocol base score",
        "Skill diversity bonus",
        "Task success rate",
        "Verifiable execution proof",
      ],
    },
    {
      name: "Speed",
      weight: 20,
      icon: Zap,
      color: "text-amber-500",
      bgColor: "bg-amber-500",
      inputs: [
        "Protocol base score",
        "Multi-chain bonus",
        "Normalized latency",
        "Efficiency score",
      ],
    },
    {
      name: "Trust",
      weight: 25,
      icon: Heart,
      color: "text-purple-500",
      bgColor: "bg-purple-500",
      inputs: [
        "Protocol base score",
        "Agent age bonus",
        "Balance (holdings) bonus",
        "Safety score",
        "Transparency score",
        "User feedback",
      ],
    },
  ];

  const dataSources = [
    {
      icon: Link2,
      name: "On-Chain Data",
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
      description:
        "Real blockchain data fetched via Ankr RPC and Advanced API across 8 EVM chains.",
      items: [
        "Transaction counts (nonce) per chain",
        "Wallet balance in ETH equivalent",
        "Recent token transfers (last 15)",
        "Multi-chain activity detection",
      ],
    },
    {
      icon: Database,
      name: "Protocol Registry",
      color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
      description:
        "Curated metadata from 9 verified AI agent protocols, weighted by maturity.",
      items: [
        "Protocol maturity score (19-31 base)",
        "Ecosystem size and adoption",
        "Security audit history",
        "Chain diversity and deployment age",
      ],
    },
    {
      icon: Cpu,
      name: "Performance Metrics",
      color: "text-purple-500 bg-purple-500/10 border-purple-500/20",
      description:
        "9 behavioral metrics normalized to 0-10 scale, each contributing to sub-scores.",
      items: [
        "Task success rate & delivery rate",
        "Robustness & efficiency scores",
        "Normalized latency",
        "Safety, transparency & user feedback",
        "Verifiable execution proof score",
      ],
    },
    {
      icon: Activity,
      name: "Uptime Monitoring",
      color: "text-amber-500 bg-amber-500/10 border-amber-500/20",
      description:
        "Live HTTP health checks against agent websites/endpoints, cached per ISR cycle.",
      items: [
        "HTTP/HTTPS HEAD request availability check",
        "Response time measurement (ms)",
        "Status code verification (2xx/3xx = up)",
        "8-second timeout with automatic retry",
      ],
    },
  ];

  const protocolTiers = [
    { name: "Autonolas", score: 31, tier: "Tier 1" },
    { name: "Fetch.ai / ERC-8004", score: 29, tier: "Tier 1" },
    { name: "Virtuals", score: 28, tier: "Tier 2" },
    { name: "Morpheus", score: 26, tier: "Tier 2" },
    { name: "OpenClaw / Spectral", score: 25, tier: "Tier 3" },
    { name: "Wayfinder", score: 24, tier: "Tier 3" },
    { name: "AI Arena", score: 23, tier: "Tier 3" },
    { name: "Unknown Protocol", score: 21, tier: "Default" },
    { name: "User-Submitted", score: 19, tier: "Unverified" },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="mb-12 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
          <Layers className="h-7 w-7 text-white" />
        </div>
        <h1 className="text-3xl font-bold sm:text-4xl">
          Scoring Methodology
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          AgentRep uses a hybrid scoring algorithm that combines real on-chain
          blockchain data, verified protocol metadata, and behavioral
          performance metrics to produce multi-faceted reputation scores.
        </p>
      </div>

      {/* How it works overview */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            How Scoring Works
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>
            Every agent receives four <strong className="text-foreground">sub-scores</strong> (Reliability,
            Accuracy, Speed, Trust), each computed from a unique formula that
            draws on different data sources. These sub-scores are then combined
            into a weighted <strong className="text-foreground">overall score</strong> (20-99 range).
          </p>
          <div className="flex items-center gap-2 rounded-lg border bg-muted/30 p-3 font-mono text-xs">
            <span className="text-emerald-500">Reliability</span>
            <span>&times;0.30 +</span>
            <span className="text-blue-500">Accuracy</span>
            <span>&times;0.25 +</span>
            <span className="text-amber-500">Speed</span>
            <span>&times;0.20 +</span>
            <span className="text-purple-500">Trust</span>
            <span>&times;0.25</span>
          </div>
          <p>
            A <strong className="text-foreground">30-day trend</strong> is generated for each agent that reacts
            to real on-chain activity signals: recent transaction bursts push
            the trend upward, declining activity pulls it down, and high
            balances provide stability (less noise).
          </p>
        </CardContent>
      </Card>

      {/* Sub-scores breakdown */}
      <h2 className="mb-4 text-xl font-bold">Sub-Score Breakdown</h2>
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        {subScores.map((sub) => (
          <Card key={sub.name}>
            <CardContent className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <sub.icon className={`h-4 w-4 ${sub.color}`} />
                  <h3 className="font-semibold">{sub.name}</h3>
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  {sub.weight}% weight
                </span>
              </div>
              <Progress value={sub.weight} className="mb-3 h-1.5" />
              <ul className="space-y-1">
                {sub.inputs.map((input) => (
                  <li
                    key={input}
                    className="flex items-center gap-2 text-xs text-muted-foreground"
                  >
                    <ArrowRight className="h-3 w-3 shrink-0 text-muted-foreground/50" />
                    {input}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Data Sources */}
      <h2 className="mb-4 text-xl font-bold">Data Sources</h2>
      <div className="mb-8 space-y-4">
        {dataSources.map((source) => (
          <Card key={source.name}>
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <span
                  className={`mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${source.color}`}
                >
                  <source.icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold">{source.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {source.description}
                  </p>
                  <ul className="mt-2 grid gap-1 sm:grid-cols-2">
                    {source.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-1.5 text-xs text-muted-foreground"
                      >
                        <span className="h-1 w-1 shrink-0 rounded-full bg-muted-foreground/40" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Protocol Base Scores */}
      <h2 className="mb-4 text-xl font-bold">Protocol Base Scores</h2>
      <Card className="mb-8">
        <CardContent className="p-5">
          <p className="mb-4 text-sm text-muted-foreground">
            Each protocol receives a base score (19-31) reflecting its maturity,
            security history, ecosystem size, and adoption. This base provides a
            foundation that performance metrics and on-chain data build upon.
          </p>
          <div className="space-y-2">
            {protocolTiers.map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-3"
              >
                <span className="w-40 truncate text-sm font-medium">
                  {p.name}
                </span>
                <div className="flex-1">
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                      style={{ width: `${(p.score / 31) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="w-8 text-right text-xs font-mono font-medium">
                  {p.score}
                </span>
                <span className="w-20 text-right text-[10px] text-muted-foreground">
                  {p.tier}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 30-Day Trends */}
      <h2 className="mb-4 text-xl font-bold">Dynamic 30-Day Trends</h2>
      <Card className="mb-8">
        <CardContent className="space-y-3 p-5 text-sm text-muted-foreground">
          <p>
            Unlike static scores, AgentRep generates a <strong className="text-foreground">reactive 30-day
            history</strong> for every agent. The trend incorporates real signals:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
              <span>
                <strong className="text-foreground">Activity momentum</strong> &mdash;
                Recent transaction bursts (last 7 days vs prior 7 days) push the
                trend upward. Declining activity creates downward pressure.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Shield className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
              <span>
                <strong className="text-foreground">Stability factor</strong> &mdash;
                Agents with higher balances exhibit less daily noise, reflecting
                that well-funded agents tend to have more stable reputations.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Target className="mt-0.5 h-4 w-4 shrink-0 text-purple-500" />
              <span>
                <strong className="text-foreground">Score convergence</strong> &mdash;
                The last 10 days converge toward the current score, ensuring the
                chart endpoint matches the live score while preserving natural variation.
              </span>
            </li>
          </ul>
          <p>
            The trend label (&quot;up&quot;, &quot;down&quot;, &quot;stable&quot;) is derived by comparing
            the 7-day rolling average against the prior 7 days with a &plusmn;1.5
            point threshold.
          </p>
        </CardContent>
      </Card>

      {/* Walletless agents */}
      <h2 className="mb-4 text-xl font-bold">Walletless Agent Scoring</h2>
      <Card className="mb-8">
        <CardContent className="space-y-3 p-5 text-sm text-muted-foreground">
          <p>
            Not all AI agents operate on-chain. Agents registered without a
            wallet address are scored using <strong className="text-foreground">protocol affiliation +
            behavioral performance metrics only</strong>. They receive:
          </p>
          <ul className="ml-4 list-disc space-y-1">
            <li>Zero on-chain bonus (no tx activity, balance, or multi-chain bonus)</li>
            <li>Zero verifiable execution proof score</li>
            <li>Neutral trend momentum (no activity signal to push up or down)</li>
            <li>&quot;Under review&quot; status until they prove value through other signals</li>
          </ul>
          <p>
            This typically results in scores <strong className="text-foreground">15-30 points lower</strong> than
            equivalent agents with active on-chain wallets, incentivizing agents to
            demonstrate verifiable on-chain activity.
          </p>
        </CardContent>
      </Card>

      {/* Footer note */}
      <div className="rounded-lg border border-dashed p-4 text-center text-xs text-muted-foreground">
        <p>
          This methodology is continuously evolving. Uptime monitoring uses
          real HTTP health checks against agent endpoints. Other performance
          metrics are currently simulated and will be replaced by real oracle
          data as integrations become available. The algorithm is deterministic
          and transparent &mdash; given the same inputs, it always produces the
          same scores.
        </p>
      </div>
    </div>
  );
}
