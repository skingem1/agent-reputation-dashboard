import { Transaction } from "@/lib/data/types";
import { ChainBadge } from "./chain-badge";
import { timeAgo, cn } from "@/lib/utils";
import {
  ArrowLeftRight,
  ArrowUpDown,
  Coins,
  GitBranch,
  Vote,
  Paintbrush,
  Landmark,
  HandCoins,
} from "lucide-react";

const TX_ICONS: Record<string, React.ElementType> = {
  swap: ArrowLeftRight,
  transfer: ArrowUpDown,
  stake: Coins,
  bridge: GitBranch,
  governance: Vote,
  mint: Paintbrush,
  lend: Landmark,
  borrow: HandCoins,
};

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="space-y-2">
      {transactions.map((tx) => {
        const Icon = TX_ICONS[tx.type] || ArrowLeftRight;
        return (
          <div
            key={tx.id}
            className="flex items-center gap-3 rounded-lg border p-3 text-sm"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
              <Icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium capitalize">{tx.type}</span>
                <ChainBadge chainId={tx.chain} size="sm" />
              </div>
              <p className="mt-0.5 truncate text-xs text-muted-foreground font-mono">
                {tx.txHash}
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium">
                {tx.amount} {tx.token}
              </p>
              <div className="flex items-center justify-end gap-2 mt-0.5">
                <span
                  className={cn(
                    "inline-flex h-1.5 w-1.5 rounded-full",
                    tx.status === "success"
                      ? "bg-emerald-500"
                      : tx.status === "pending"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  )}
                />
                <span className="text-xs text-muted-foreground">
                  {timeAgo(tx.timestamp)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
