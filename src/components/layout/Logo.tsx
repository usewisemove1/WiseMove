import Link from "next/link";

import WiseMoveIcon from "@/components/layout/WiseMoveIcon";
import WiseMoveWordmark from "@/components/layout/WiseMoveWordmark";
import { cn } from "@/lib/utils";

type LogoVariant = "wordmark" | "icon";

interface LogoProps {
  variant?: LogoVariant;
  href?: string | null;
  className?: string;
}

export default function Logo({
  variant = "wordmark",
  href = "/",
  className,
}: LogoProps) {
  const mark =
    variant === "wordmark" ? <WiseMoveWordmark /> : <WiseMoveIcon />;

  if (href === null) {
    return <span className={cn("inline-flex shrink-0", className)}>{mark}</span>;
  }

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex shrink-0 transition-opacity hover:opacity-90",
        className
      )}
      aria-label="WiseMove home"
    >
      {mark}
    </Link>
  );
}
