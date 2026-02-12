import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchX } from "lucide-react";

export default function AgentNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <SearchX className="h-16 w-16 text-muted-foreground/40" />
      <h2 className="mt-4 text-2xl font-bold">Agent Not Found</h2>
      <p className="mt-2 text-muted-foreground">
        The agent you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
      <Button asChild className="mt-6">
        <Link href="/agents">Browse All Agents</Link>
      </Button>
    </div>
  );
}
