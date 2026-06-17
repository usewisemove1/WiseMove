import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

interface VerifiedBadgeProps {
  verified: boolean;
  label?: string;
  size?: "sm" | "md";
  className?: string;
}

const sizeConfig = {
  sm: {
    container: "gap-1 px-2 py-0.5 text-xs",
    icon: "h-3 w-3",
  },
  md: {
    container: "gap-1.5 px-3 py-1 text-sm",
    icon: "h-3.5 w-3.5",
  },
} as const;

export default function VerifiedBadge({
  verified,
  label = "Verified",
  size = "md",
  className,
}: VerifiedBadgeProps) {
  if (!verified) return null;

  const config = sizeConfig[size];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-accent font-semibold text-white shadow-sm",
        config.container,
        className
      )}
    >
      <Check className={config.icon} strokeWidth={2.5} aria-hidden="true" />
      {label}
    </span>
  );
}
