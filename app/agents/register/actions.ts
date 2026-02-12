"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { KNOWN_AGENTS } from "@/lib/data/protocols";
import type { ChainId, AgentSkill } from "@/lib/data/types";

interface RegisterAgentInput {
  name: string;
  description: string;
  walletAddress: string;
  chains: ChainId[];
  skills: AgentSkill[];
  protocol: string;
  website?: string;
  twitter?: string;
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

export async function registerAgent(
  input: RegisterAgentInput
): Promise<{ error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in to register an agent." };
  }

  // Validate input
  if (!input.name || input.name.length < 2 || input.name.length > 100) {
    return { error: "Agent name must be between 2 and 100 characters." };
  }
  if (
    !input.description ||
    input.description.length < 10 ||
    input.description.length > 500
  ) {
    return {
      error: "Description must be between 10 and 500 characters.",
    };
  }
  if (!/^0x[a-fA-F0-9]{40}$/.test(input.walletAddress)) {
    return { error: "Invalid EVM wallet address (must be 0x + 40 hex chars)." };
  }
  if (!input.chains || input.chains.length === 0) {
    return { error: "Select at least one blockchain." };
  }
  if (!input.skills || input.skills.length === 0) {
    return { error: "Select at least one skill." };
  }

  const slug = generateSlug(input.name);
  if (!slug) {
    return { error: "Agent name must contain at least one alphanumeric character." };
  }

  // Check against hardcoded agents (wallet address)
  const existingHardcoded = KNOWN_AGENTS.find(
    (a) =>
      a.walletAddress.toLowerCase() === input.walletAddress.toLowerCase() ||
      a.id === slug
  );
  if (existingHardcoded) {
    return {
      error: "An agent with this wallet address or name already exists in our registry.",
    };
  }

  // Check against Supabase for duplicates (slug or wallet)
  const { data: existing } = await supabase
    .from("submitted_agents")
    .select("id, slug, wallet_address")
    .or(
      `slug.eq.${slug},wallet_address.ilike.${input.walletAddress}`
    )
    .limit(1);

  if (existing && existing.length > 0) {
    return {
      error: "An agent with this name or wallet address has already been registered.",
    };
  }

  // Insert
  const { error } = await supabase.from("submitted_agents").insert({
    user_id: user.id,
    slug,
    name: input.name.trim(),
    description: input.description.trim(),
    wallet_address: input.walletAddress,
    chains: input.chains,
    skills: input.skills,
    protocol: input.protocol || "independent",
    website: input.website?.trim() || null,
    twitter: input.twitter?.trim() || null,
  });

  if (error) {
    console.error("Supabase insert error:", error);
    if (error.code === "23505") {
      return {
        error: "An agent with this name or wallet address already exists.",
      };
    }
    return { error: "Failed to register agent. Please try again." };
  }

  // Invalidate ISR caches
  revalidatePath("/", "page");
  revalidatePath("/agents", "page");
  revalidatePath("/dashboard", "page");

  redirect(`/agents/${slug}`);
}
