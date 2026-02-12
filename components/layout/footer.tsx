import Link from "next/link";
import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-purple-600">
              <Zap className="h-3 w-3 text-white" />
            </div>
            <span className="text-sm font-semibold">AgentRep</span>
            <span className="text-xs text-muted-foreground">
              Multi-Chain AI Agent Reputation
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/agents" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Agents
            </Link>
            <Link href="/dashboard" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} AgentRep. Built with Next.js.
          </p>
        </div>
      </div>
    </footer>
  );
}
