"use client";

import { useState, useTransition } from "react";
import { registerAgent } from "@/app/agents/register/actions";
import { CHAINS } from "@/lib/data/chains";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Loader2, Rocket, AlertCircle, Wallet } from "lucide-react";
import type { ChainId, AgentSkill } from "@/lib/data/types";

const ALL_SKILLS: AgentSkill[] = [
  "DeFi", "Research", "Content", "Security", "Trading", "Analytics",
  "Governance", "NFT", "Bridge", "Oracle", "MEV", "Yield", "Lending",
  "Insurance", "Social",
];

interface RegisterAgentFormProps {
  protocols: { id: string; name: string }[];
}

export function RegisterAgentForm({ protocols }: RegisterAgentFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [hasWallet, setHasWallet] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [chains, setChains] = useState<ChainId[]>([]);
  const [skills, setSkills] = useState<AgentSkill[]>([]);
  const [protocol, setProtocol] = useState("independent");
  const [website, setWebsite] = useState("");
  const [twitter, setTwitter] = useState("");

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);

  const toggleChain = (chainId: ChainId) => {
    setChains((prev) =>
      prev.includes(chainId)
        ? prev.filter((c) => c !== chainId)
        : [...prev, chainId]
    );
  };

  const toggleSkill = (skill: AgentSkill) => {
    setSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const isValidWallet = /^0x[a-fA-F0-9]{40}$/.test(walletAddress);

  const canSubmit =
    name.length >= 2 &&
    description.length >= 10 &&
    (!hasWallet || isValidWallet) &&
    chains.length >= 1 &&
    skills.length >= 1;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setError(null);
    startTransition(async () => {
      const result = await registerAgent({
        name: name.trim(),
        description: description.trim(),
        walletAddress: hasWallet ? walletAddress : undefined,
        chains,
        skills,
        protocol,
        website: website.trim() || undefined,
        twitter: twitter.trim() || undefined,
      });
      if (result?.error) {
        setError(result.error);
      }
    });
  };

  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Agent Name */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Agent Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="My DeFi Agent"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={100}
              disabled={isPending}
            />
            {slug && (
              <p className="text-xs text-muted-foreground">
                Agent URL: <code className="rounded bg-muted px-1">/agents/{slug}</code>
              </p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Describe what your agent does, its capabilities, and use cases..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={500}
              rows={3}
              disabled={isPending}
            />
            <p className="text-xs text-muted-foreground">
              {description.length}/500 characters
            </p>
          </div>

          {/* Wallet Address (Optional) */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="has-wallet"
                checked={hasWallet}
                onCheckedChange={(checked) => {
                  setHasWallet(checked === true);
                  if (!checked) setWalletAddress("");
                }}
                disabled={isPending}
              />
              <Label
                htmlFor="has-wallet"
                className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                My agent has an on-chain wallet
              </Label>
            </div>
            {!hasWallet && (
              <div className="flex items-start gap-2 rounded-lg border border-blue-500/20 bg-blue-500/5 p-3 text-xs text-blue-600 dark:text-blue-400">
                <Wallet className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>
                  Agents without a wallet will be scored based on protocol affiliation, skills, and simulated performance metrics.
                  On-chain bonuses (transaction activity, balance) won&apos;t apply.
                </span>
              </div>
            )}
            {hasWallet && (
              <div className="space-y-2">
                <Label htmlFor="wallet">
                  Wallet Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="wallet"
                  placeholder="0x..."
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className={cn(
                    "font-mono text-sm",
                    walletAddress &&
                      !isValidWallet &&
                      "border-red-500 focus-visible:ring-red-500"
                  )}
                  disabled={isPending}
                />
                {walletAddress && !isValidWallet && (
                  <p className="text-xs text-red-500">
                    Must be a valid EVM address (0x + 40 hex characters)
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  This address will be used to fetch on-chain data for reputation scoring.
                </p>
              </div>
            )}
          </div>

          {/* Chains */}
          <div className="space-y-2">
            <Label>
              Operating Chains <span className="text-red-500">*</span>
            </Label>
            <div className="flex flex-wrap gap-1.5">
              {CHAINS.map((chain) => (
                <button
                  key={chain.id}
                  type="button"
                  onClick={() => toggleChain(chain.id)}
                  disabled={isPending}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium transition-all",
                    chains.includes(chain.id)
                      ? "border-transparent text-white"
                      : "border-border text-muted-foreground hover:border-border/80 hover:text-foreground"
                  )}
                  style={
                    chains.includes(chain.id)
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
            {chains.length === 0 && (
              <p className="text-xs text-muted-foreground">
                Select the blockchain(s) your agent operates on.
              </p>
            )}
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <Label>
              Skills <span className="text-red-500">*</span>
            </Label>
            <div className="flex flex-wrap gap-1.5">
              {ALL_SKILLS.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => toggleSkill(skill)}
                  disabled={isPending}
                  className={cn(
                    "rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
                    skills.includes(skill)
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:text-foreground"
                  )}
                >
                  {skill}
                </button>
              ))}
            </div>
            {skills.length === 0 && (
              <p className="text-xs text-muted-foreground">
                Select the capabilities of your agent.
              </p>
            )}
          </div>

          {/* Protocol */}
          <div className="space-y-2">
            <Label htmlFor="protocol">Protocol Affiliation</Label>
            <Select
              value={protocol}
              onValueChange={setProtocol}
              disabled={isPending}
            >
              <SelectTrigger id="protocol">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="independent">Independent / Other</SelectItem>
                {protocols.map((p) => (
                  <SelectItem key={p.id} value={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Optional: Website & Twitter */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="website">Website (optional)</Label>
              <Input
                id="website"
                placeholder="https://myagent.xyz"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                disabled={isPending}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitter">Twitter (optional)</Label>
              <Input
                id="twitter"
                placeholder="@myagent"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                disabled={isPending}
              />
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-500">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            size="lg"
            className="w-full gap-2"
            disabled={!canSubmit || isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Registering...
              </>
            ) : (
              <>
                <Rocket className="h-4 w-4" />
                Register Agent
              </>
            )}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            Your agent will appear immediately in the explorer with on-chain reputation scoring.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
