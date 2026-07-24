import { MOCK_USER_TRUST_SCORE } from "@/lib/mockDashboardData";
import { cn } from "@/lib/utils";

interface SidebarTrustScoreCardProps {
  score?: number;
  className?: string;
}

export default function SidebarTrustScoreCard({
  score = MOCK_USER_TRUST_SCORE,
  className,
}: SidebarTrustScoreCardProps) {
  const progress = Math.min(100, Math.round((score / 1000) * 100));

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl bg-gradient-to-br from-primary via-primary to-accent p-4 text-white shadow-sm",
        className
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-white/90">
        Trust Score
      </p>
      <p className="mt-1 text-3xl font-bold tabular-nums">{score}</p>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/25">
        <div
          className="h-full rounded-full bg-white/90 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
