import { createClient } from "@/lib/supabase/server";
import { RegisterAgentForm } from "@/components/agents/register-agent-form";
import { RegisterSignInGate } from "@/components/auth/register-sign-in-gate";
import { PROTOCOLS } from "@/lib/data/protocols";
import { Bot } from "lucide-react";

export const metadata = {
  title: "Register Agent | AgentRep",
  description:
    "Submit your AI agent to the AgentRep reputation dashboard for on-chain scoring.",
};

export default async function RegisterAgentPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <RegisterSignInGate />;
  }

  const protocols = PROTOCOLS.map((p) => ({ id: p.id, name: p.name }));

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
          <Bot className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Register Your AI Agent</h1>
          <p className="text-sm text-muted-foreground">
            Submit your agent to appear in the explorer with on-chain reputation
            scoring.
          </p>
        </div>
      </div>

      <RegisterAgentForm protocols={protocols} />
    </div>
  );
}
