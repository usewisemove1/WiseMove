import type { LucideIcon } from "lucide-react";

import { cardBaseStyles, cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  badge?: string;
  iconClassName?: string;
  badgeClassName?: string;
  className?: string;
}

export default function StatCard({
  icon: Icon,
  value,
  label,
  badge,
  iconClassName = "bg-primary/10 text-primary",
  badgeClassName = "bg-primary/10 text-primary",
  className,
}: StatCardProps) {
  return (
    <div className={cn(cardBaseStyles, "p-5", className)}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <div
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
            iconClassName
          )}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </div>
      </div>
      <p className="mt-3 text-3xl font-bold tabular-nums text-foreground">
        {value}
      </p>
      {badge ? (
        <span
          className={cn(
            "mt-2 inline-block rounded-md px-2 py-0.5 text-xs font-semibold",
            badgeClassName
          )}
        >
          {badge}
        </span>
      ) : null}
    </div>
  );
}
