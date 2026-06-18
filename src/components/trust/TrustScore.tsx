import { cn } from "@/lib/utils";

interface TrustScoreProps {
  score: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

type TrustTier = "high" | "mid" | "low";

const sizeConfig = {
  sm: {
    diameter: 52,
    stroke: 3,
    scoreText: "text-sm font-bold",
    labelText: "text-[10px]",
  },
  md: {
    diameter: 72,
    stroke: 4,
    scoreText: "text-lg font-bold",
    labelText: "text-xs",
  },
  lg: {
    diameter: 104,
    stroke: 5,
    scoreText: "text-2xl font-bold",
    labelText: "text-sm",
  },
} as const;

function getTrustTier(score: number): TrustTier {
  if (score >= 90) return "high";
  if (score >= 70) return "mid";
  return "low";
}

const tierColors: Record<TrustTier, string> = {
  high: "#1a5c38",
  mid: "#c9a84c",
  low: "#dc2626",
};

export default function TrustScore({
  score,
  size = "md",
  className,
}: TrustScoreProps) {
  const clampedScore = Math.min(100, Math.max(0, score));
  const tier = getTrustTier(clampedScore);
  const color = tierColors[tier];
  const config = sizeConfig[size];

  const radius = (config.diameter - config.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (clampedScore / 100) * circumference;
  const center = config.diameter / 2;

  return (
    <div
      className={cn("inline-flex flex-col items-center gap-1.5", className)}
      aria-label={`Trust score: ${clampedScore} out of 100`}
    >
      <div
        className="relative flex items-center justify-center rounded-full bg-white shadow-md"
        style={{
          width: config.diameter,
          height: config.diameter,
        }}
      >
        <svg
          className="absolute inset-0 -rotate-90"
          width={config.diameter}
          height={config.diameter}
          aria-hidden="true"
        >
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={config.stroke}
          />
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={config.stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            className="transition-[stroke-dashoffset] duration-500 ease-out"
          />
        </svg>
        <span className={cn(config.scoreText, "relative z-10")} style={{ color }}>
          {clampedScore}
        </span>
      </div>
      <span
        className={cn(
          config.labelText,
          "font-medium tracking-wide text-muted-foreground"
        )}
      >
        Trust Score
      </span>
    </div>
  );
}
