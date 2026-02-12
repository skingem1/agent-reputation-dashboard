/**
 * Fetches user-submitted agents from Supabase and maps them
 * to the KnownAgent format so they go through the same
 * buildAgent() → computeReputation() pipeline as hardcoded agents.
 */

import { createClient } from "@supabase/supabase-js";
import type { KnownAgent } from "./protocols";
import type { ChainId, AgentSkill } from "./types";

// Server-side Supabase client for data fetching (uses anon key — SELECT is open via RLS)
function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function getSubmittedAgents(): Promise<KnownAgent[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("submitted_agents")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) {
    console.error("Failed to fetch submitted agents:", error?.message);
    return [];
  }

  return data.map((row) => ({
    id: row.slug as string,
    name: row.name as string,
    description: row.description as string,
    protocol: row.protocol as string,
    walletAddress: row.wallet_address as string,
    chains: row.chains as ChainId[],
    skills: row.skills as AgentSkill[],
    website: (row.website as string) ?? undefined,
    twitter: (row.twitter as string) ?? undefined,
    createdAt: row.created_at as string,
    source: "user-submitted" as const,
  }));
}
