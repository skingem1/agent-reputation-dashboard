import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-cyan-500/10 bg-background/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="AgentRep Logo"
              width={24}
              height={24}
            />
            <span className="text-sm font-display">AgentRep</span>
            <span className="text-xs text-muted-foreground">
              Multi-Chain AI Agent Reputation
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs text-muted-foreground hover:text-cyan-400 transition-colors">
              Home
            </Link>
            <Link href="/agents" className="text-xs text-muted-foreground hover:text-cyan-400 transition-colors">
              Agents
            </Link>
            <Link href="/dashboard" className="text-xs text-muted-foreground hover:text-cyan-400 transition-colors">
              Dashboard
            </Link>
            <Link href="/methodology" className="text-xs text-muted-foreground hover:text-cyan-400 transition-colors">
              Methodology
            </Link>
          </div>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} AgentRep. Cyberpunk AI Network.
          </p>
        </div>
      </div>
    </footer>
  );
}
