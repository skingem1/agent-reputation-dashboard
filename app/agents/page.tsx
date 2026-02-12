import { Suspense } from "react";
import { getAllAgents } from "@/lib/data/mock-agents";
import { AgentExplorer } from "@/components/agents/agent-explorer";
import { Bot } from "lucide-react";

export const metadata = {
  title: "Explore Agents | AgentRep",
  description: "Discover and evaluate AI agents across multiple blockchains",
};

export default function AgentsPage() {
  const agents = getAllAgents();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Explore AI Agents</h1>
            <p className="text-sm text-muted-foreground">
              {agents.length} agents across multiple chains
            </p>
          </div>
        </div>
      </div>

      <Suspense>
        <AgentExplorer agents={agents} />
      </Suspense>
    </div>
  );
}
