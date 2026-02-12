import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: "up" | "down" | "stable";
}

export function StatCard({ title, value, icon: Icon, description, trend }: StatCardProps) {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;

  return (
    <Card className="gradient-border cyber-card">
      <CardContent className="relative z-10 p-6">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{title}</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10">
            <Icon className="h-4 w-4 text-cyan-400" />
          </div>
        </div>
        <div className="mt-2 flex items-end gap-2">
          <p className="text-3xl font-display">{value}</p>
          {trend && (
            <TrendIcon
              className={cn(
                "mb-1 h-4 w-4",
                trend === "up" ? "text-emerald-500" : trend === "down" ? "text-red-500" : "text-muted-foreground"
              )}
            />
          )}
        </div>
        {description && (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
