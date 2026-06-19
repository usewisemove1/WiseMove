import { cn } from "@/lib/utils";

interface WiseMoveIconProps {
  className?: string;
}

/** Green M + gold dashed house mark from brand SVG. */
export default function WiseMoveIcon({ className }: WiseMoveIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      role="img"
      aria-label="WiseMove"
      className={cn("h-9 w-9 shrink-0 sm:h-10 sm:w-10", className)}
    >
      <path
        d="M20 80 L35 30 L50 60 L65 30 L80 80"
        fill="none"
        stroke="#004d40"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M50 20 L80 45 L80 80 L20 80 L20 45 Z"
        fill="none"
        stroke="#ffb300"
        strokeWidth="3"
        strokeDasharray="4 2"
      />
    </svg>
  );
}
