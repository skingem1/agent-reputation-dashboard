"use client";

import { AgentFilters as Filters, AgentSkill, ChainId } from "@/lib/data/types";
import { CHAINS } from "@/lib/data/chains";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { RotateCcw } from "lucide-react";

const ALL_SKILLS: AgentSkill[] = [
  "DeFi", "Research", "Content", "Security", "Trading", "Analytics",
  "Governance", "NFT", "Bridge", "Oracle", "MEV", "Yield", "Lending",
  "Insurance", "Social",
];

interface AgentFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

export function AgentFiltersBar({ filters, onChange }: AgentFiltersProps) {
  const toggleChain = (chainId: ChainId) => {
    const chains = filters.chains.includes(chainId)
      ? filters.chains.filter((c) => c !== chainId)
      : [...filters.chains, chainId];
    onChange({ ...filters, chains });
  };

  const toggleSkill = (skill: AgentSkill) => {
    const skills = filters.skills.includes(skill)
      ? filters.skills.filter((s) => s !== skill)
      : [...filters.skills, skill];
    onChange({ ...filters, skills });
  };

  const resetFilters = () => {
    onChange({
      search: filters.search,
      chains: [],
      skills: [],
      minReputation: 0,
      maxReputation: 100,
      status: "all",
      sortBy: "reputation",
      sortOrder: "desc",
    });
  };

  const hasActiveFilters =
    filters.chains.length > 0 ||
    filters.skills.length > 0 ||
    filters.status !== "all" ||
    filters.minReputation > 0 ||
    filters.maxReputation < 100;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5">
        {CHAINS.map((chain) => (
          <button
            key={chain.id}
            onClick={() => toggleChain(chain.id)}
            className={cn(
              "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium transition-all",
              filters.chains.includes(chain.id)
                ? "border-transparent text-white"
                : "border-border text-muted-foreground hover:border-border/80 hover:text-foreground"
            )}
            style={
              filters.chains.includes(chain.id)
                ? { backgroundColor: chain.color }
                : {}
            }
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: chain.color }}
            />
            {chain.name}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Select
          value={filters.sortBy}
          onValueChange={(val) =>
            onChange({ ...filters, sortBy: val as Filters["sortBy"] })
          }
        >
          <SelectTrigger className="h-8 w-[140px] text-xs">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="reputation">Reputation</SelectItem>
            <SelectItem value="transactions">Transactions</SelectItem>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="name">Name</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.sortOrder}
          onValueChange={(val) =>
            onChange({ ...filters, sortOrder: val as "asc" | "desc" })
          }
        >
          <SelectTrigger className="h-8 w-[100px] text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">Desc</SelectItem>
            <SelectItem value="asc">Asc</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.status}
          onValueChange={(val) =>
            onChange({
              ...filters,
              status: val as Filters["status"],
            })
          }
        >
          <SelectTrigger className="h-8 w-[120px] text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="under-review">Under Review</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex flex-wrap gap-1">
          {ALL_SKILLS.slice(0, 8).map((skill) => (
            <button
              key={skill}
              onClick={() => toggleSkill(skill)}
              className={cn(
                "rounded-full border px-2 py-0.5 text-[10px] font-medium transition-colors",
                filters.skills.includes(skill)
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
              )}
            >
              {skill}
            </button>
          ))}
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilters}
            className="h-8 gap-1 text-xs text-muted-foreground"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </Button>
        )}
      </div>
    </div>
  );
}
