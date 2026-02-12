import { cn, getReputationColor, getReputationLabel } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface ReputationBadgeProps {
  score: number;
  trend?: "up" | "down" | "stable";
  size?: "sm" | "lg";
}

export function ReputationBadge({ score, trend, size = "sm" }: ReputationBadgeProps) {
  const r = size === "lg" ? 44 : 22;
  const stroke = size === "lg" ? 5 : 3;
  const circumference = 2 * Math.PI * r;
  const progress = (score / 100) * circumference;
  const viewBox = size === "lg" ? 100 : 50;
  const center = viewBox / 2;

  const strokeColor =
    score >= 80
      ? "#10b981"
      : score >= 60
        ? "#eab308"
        : score >= 40
          ? "#f97316"
          : "#ef4444";

  const TrendIcon =
    trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative">
        <svg
          width={viewBox}
          height={viewBox}
          viewBox={`0 0 ${viewBox} ${viewBox}`}
          className="-rotate-90"
        >
          <circle
            cx={center}
            cy={center}
            r={r}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            className="text-muted/30"
          />
          <circle
            cx={center}
            cy={center}
            r={r}
            fill="none"
            stroke={strokeColor}
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            className="transition-all duration-700"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={cn(
              "font-bold",
              getReputationColor(score),
              size === "lg" ? "text-2xl" : "text-xs"
            )}
          >
            {score}
          </span>
        </div>
      </div>
      {size === "lg" && (
        <div className="flex items-center gap-1">
          <span className={cn("text-sm font-medium", getReputationColor(score))}>
            {getReputationLabel(score)}
          </span>
          {trend && (
            <TrendIcon
              className={cn(
                "h-3 w-3",
                trend === "up"
                  ? "text-emerald-500"
                  : trend === "down"
                    ? "text-red-500"
                    : "text-muted-foreground"
              )}
            />
          )}
        </div>
      )}
    </div>
  );
}
