import { AgentSkill } from "@/lib/data/types";
import { cn } from "@/lib/utils";

const SKILL_COLORS: Record<AgentSkill, string> = {
  DeFi: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  Research: "bg-green-500/10 text-green-500 border-green-500/20",
  Content: "bg-pink-500/10 text-pink-500 border-pink-500/20",
  Security: "bg-red-500/10 text-red-500 border-red-500/20",
  Trading: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  Analytics: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
  Governance: "bg-violet-500/10 text-violet-500 border-violet-500/20",
  NFT: "bg-fuchsia-500/10 text-fuchsia-500 border-fuchsia-500/20",
  Bridge: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
  Oracle: "bg-teal-500/10 text-teal-500 border-teal-500/20",
  MEV: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  Yield: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  Lending: "bg-sky-500/10 text-sky-500 border-sky-500/20",
  Insurance: "bg-rose-500/10 text-rose-500 border-rose-500/20",
  Social: "bg-purple-500/10 text-purple-500 border-purple-500/20",
};

interface SkillBadgeProps {
  skill: AgentSkill;
}

export function SkillBadge({ skill }: SkillBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium transition-all hover:shadow-sm",
        SKILL_COLORS[skill]
      )}
    >
      {skill}
    </span>
  );
}
