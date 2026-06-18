import Link from "next/link";
import { Eye, Heart, MessageCircle } from "lucide-react";

import {
  formatRelativeTime,
  MOCK_ACTIVITIES,
} from "@/lib/mockDashboardData";
import { cardBaseStyles, cn } from "@/lib/utils";
import type { ActivityType } from "@/types";

const ACTIVITY_CONFIG: Record<
  ActivityType,
  { icon: typeof Eye; label: (title: string) => string }
> = {
  viewed: {
    icon: Eye,
    label: (title) => `You viewed ${title}`,
  },
  saved: {
    icon: Heart,
    label: (title) => `You saved ${title}`,
  },
  contacted: {
    icon: MessageCircle,
    label: (title) => `You contacted an agent about ${title}`,
  },
};

export default function RecentActivity() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Recent Activity
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your latest property interactions
        </p>
      </div>

      <ul className="space-y-3">
        {MOCK_ACTIVITIES.map((activity) => {
          const config = ACTIVITY_CONFIG[activity.type];
          const Icon = config.icon;

          return (
            <li key={activity.id}>
              <Link
                href={`/property/${activity.propertyId}`}
                className={cn(
                  cardBaseStyles,
                  "flex items-start gap-4 p-4 transition-colors hover:bg-muted/30"
                )}
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {config.label(activity.propertyTitle)}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {formatRelativeTime(activity.timestamp)}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
