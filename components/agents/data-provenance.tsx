import type { DataProvenance } from "@/lib/data/types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link2, Database, Cpu, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataProvenanceBadgesProps {
  provenance: DataProvenance;
  /** Compact mode for agent cards (icons only) */
  compact?: boolean;
}

const PROVENANCE_ITEMS = [
  {
    key: "onChain" as const,
    label: "On-Chain Data",
    description: "Real blockchain tx counts, balances & transfers via Ankr RPC",
    icon: Link2,
    activeColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    key: "protocol" as const,
    label: "Protocol Registry",
    description: "Verified protocol metadata: maturity, audits, ecosystem size",
    icon: Database,
    activeColor: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  },
  {
    key: "performanceMetrics" as const,
    label: "Performance Metrics",
    description: "9 behavioral metrics: success rate, robustness, latency, safety & more",
    icon: Cpu,
    activeColor: "text-purple-500 bg-purple-500/10 border-purple-500/20",
  },
  {
    key: "uptimeMonitoring" as const,
    label: "Uptime Monitoring",
    description: "Live HTTP health checks against agent endpoints (HEAD/GET)",
    icon: Activity,
    activeColor: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  },
];

export function DataProvenanceBadges({
  provenance,
  compact = false,
}: DataProvenanceBadgesProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-0.5">
        {PROVENANCE_ITEMS.map((item) => {
          const isActive = provenance[item.key];
          return (
            <Tooltip key={item.key}>
              <TooltipTrigger asChild>
                <span
                  className={cn(
                    "inline-flex h-4 w-4 items-center justify-center rounded",
                    isActive
                      ? item.activeColor
                      : "text-muted-foreground/30 bg-muted/30"
                  )}
                >
                  <item.icon className="h-2.5 w-2.5" />
                </span>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-[200px]">
                <p className="text-xs font-medium">{item.label}</p>
                <p className="text-[10px] text-muted-foreground">
                  {isActive ? item.description : "Not available for this agent"}
                </p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-muted-foreground">Scored from</p>
      <div className="flex flex-wrap gap-1.5">
        {PROVENANCE_ITEMS.map((item) => {
          const isActive = provenance[item.key];
          return (
            <Tooltip key={item.key}>
              <TooltipTrigger asChild>
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium transition-colors",
                    isActive
                      ? item.activeColor
                      : "text-muted-foreground/40 bg-muted/20 border-border/30 line-through"
                  )}
                >
                  <item.icon className="h-3 w-3" />
                  {item.label}
                </span>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-[220px]">
                <p className="text-xs">
                  {isActive ? item.description : "Not available for this agent"}
                </p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}
