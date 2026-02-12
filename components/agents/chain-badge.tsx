import { ChainId } from "@/lib/data/types";
import { CHAIN_MAP } from "@/lib/data/chains";
import { cn } from "@/lib/utils";

interface ChainBadgeProps {
  chainId: ChainId;
  size?: "sm" | "md";
}

export function ChainBadge({ chainId, size = "sm" }: ChainBadgeProps) {
  const chain = CHAIN_MAP[chainId];
  if (!chain) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border font-medium",
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs"
      )}
      style={{
        borderColor: `${chain.color}40`,
        backgroundColor: `${chain.color}15`,
        color: chain.color,
      }}
    >
      <span
        className="inline-block rounded-full"
        style={{
          width: size === "sm" ? 6 : 8,
          height: size === "sm" ? 6 : 8,
          backgroundColor: chain.color,
        }}
      />
      {chain.name}
    </span>
  );
}
