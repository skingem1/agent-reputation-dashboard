"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Agent, AgentFilters, ChainId } from "@/lib/data/types";
import { AgentList } from "./agent-list";
import { AgentSearch } from "./agent-search";
import { AgentFiltersBar } from "./agent-filters";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 12;

interface AgentExplorerProps {
  agents: Agent[];
}

export function AgentExplorer({ agents }: AgentExplorerProps) {
  const searchParams = useSearchParams();
  const initialChain = searchParams.get("chain") as ChainId | null;

  const [filters, setFilters] = useState<AgentFilters>({
    search: "",
    chains: initialChain ? [initialChain] : [],
    skills: [],
    minReputation: 0,
    maxReputation: 100,
    status: "all",
    sortBy: "reputation",
    sortOrder: "desc",
  });
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = [...agents];

    // search
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.skills.some((s) => s.toLowerCase().includes(q)) ||
          a.chains.some((c) => c.toLowerCase().includes(q))
      );
    }

    // chains
    if (filters.chains.length > 0) {
      result = result.filter((a) =>
        filters.chains.some((c) => a.chains.includes(c))
      );
    }

    // skills
    if (filters.skills.length > 0) {
      result = result.filter((a) =>
        filters.skills.some((s) => a.skills.includes(s))
      );
    }

    // reputation
    result = result.filter(
      (a) =>
        a.reputation.overall >= filters.minReputation &&
        a.reputation.overall <= filters.maxReputation
    );

    // status
    if (filters.status !== "all") {
      result = result.filter((a) => a.status === filters.status);
    }

    // sort
    result.sort((a, b) => {
      let cmp = 0;
      switch (filters.sortBy) {
        case "reputation":
          cmp = a.reputation.overall - b.reputation.overall;
          break;
        case "transactions":
          cmp = a.stats.totalTransactions - b.stats.totalTransactions;
          break;
        case "recent":
          cmp =
            new Date(a.lastActiveAt).getTime() -
            new Date(b.lastActiveAt).getTime();
          break;
        case "name":
          cmp = a.name.localeCompare(b.name);
          break;
      }
      return filters.sortOrder === "desc" ? -cmp : cmp;
    });

    return result;
  }, [agents, filters]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleFiltersChange = (newFilters: AgentFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <AgentSearch
        value={filters.search}
        onChange={(search) => handleFiltersChange({ ...filters, search })}
      />

      <AgentFiltersBar filters={filters} onChange={handleFiltersChange} />

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <p>
          Showing {paginated.length} of {filtered.length} agents
        </p>
        {totalPages > 1 && (
          <p>
            Page {page} of {totalPages}
          </p>
        )}
      </div>

      <AgentList agents={paginated} />

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const pageNum =
                totalPages <= 5
                  ? i + 1
                  : page <= 3
                    ? i + 1
                    : page >= totalPages - 2
                      ? totalPages - 4 + i
                      : page - 2 + i;
              return (
                <Button
                  key={pageNum}
                  variant={page === pageNum ? "default" : "outline"}
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setPage(pageNum)}
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>
          <Button
            variant="outline"
            size="sm"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
