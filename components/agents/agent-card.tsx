import Link from "next/link";
import { Agent } from "@/lib/data/types";
import { Card, CardContent } from "@/components/ui/card";
import { ReputationBadge } from "./reputation-badge";
import { ChainBadge } from "./chain-badge";
import { SkillBadge } from "./skill-badge";
import { DataProvenanceBadges } from "./data-provenance";
import { Activity, CheckCircle, Clock } from "lucide-react";
import { cn, formatNumber } from "@/lib/utils";

interface AgentCardProps {
  agent: Agent;
}

export function AgentCard({ agent }: AgentCardProps) {
  const statusColor =
    agent.status === "active"
      ? "bg-emerald-500"
      : agent.status === "inactive"
        ? "bg-gray-400"
        : "bg-yellow-500";

  return (
    <Link href={`/agents/${agent.id}`}>
      <Card className="group h-full cyber-card hover:-translate-y-1">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="relative shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={agent.avatar}
                alt={agent.name}
                className="h-10 w-10 rounded-full bg-muted"
                width={40}
                height={40}
              />
              <span
                className={cn(
                  "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card",
                  statusColor
                )}
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h3 className="truncate text-sm font-semibold group-hover:text-cyan-400 transition-colors">
                  {agent.name}
                </h3>
                {agent.source === "user-submitted" && (
                  <span className="shrink-0 rounded-full bg-pink-500/10 px-1.5 py-0.5 text-[9px] font-medium text-pink-400 border border-pink-500/20">
                    Community
                  </span>
                )}
              </div>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                {agent.description}
              </p>
            </div>
            <ReputationBadge score={agent.reputation.overall} />
          </div>

          <div className="mt-3 flex flex-wrap gap-1">
            {agent.chains.map((chain) => (
              <ChainBadge key={chain} chainId={chain} size="sm" />
            ))}
          </div>

          <div className="mt-2 flex flex-wrap gap-1">
            {agent.skills.slice(0, 3).map((skill) => (
              <SkillBadge key={skill} skill={skill} />
            ))}
            {agent.skills.length > 3 && (
              <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                +{agent.skills.length - 3}
              </span>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-cyan-500/10 pt-3 text-[11px] text-muted-foreground">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Activity className="h-3 w-3" />
                {formatNumber(agent.stats.totalTransactions)} txns
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                {agent.stats.successRate}%
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {agent.stats.avgResponseTime}
              </span>
            </div>
            <DataProvenanceBadges provenance={agent.dataProvenance} compact />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
