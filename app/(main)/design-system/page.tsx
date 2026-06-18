import TrustScore from "@/components/trust/TrustScore";
import VerifiedBadge from "@/components/trust/VerifiedBadge";
import { cardBaseStyles } from "@/lib/utils";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

const typographySamples = [
  {
    variant: "display" as const,
    label: "Display",
    sample: "Find Your Next Home with Total Trust",
  },
  {
    variant: "h1" as const,
    label: "H1",
    sample: "The Emerald Courtyard Duplex",
  },
  {
    variant: "h2" as const,
    label: "H2",
    sample: "Featured Listings",
  },
  {
    variant: "h3" as const,
    label: "H3",
    sample: "Property Amenities",
  },
  {
    variant: "body" as const,
    label: "Body",
    sample:
      "A stunning 4-bedroom duplex in the heart of Lekki Phase 1, featuring modern finishes and 24-hour power supply.",
  },
  {
    variant: "caption" as const,
    label: "Caption",
    sample: "4 beds • 5 baths • 1,200 sqft • Lekki, Lagos",
  },
];

const trustScoreTiers = [
  { score: 95, label: "High (90–100)" },
  { score: 80, label: "Mid (70–89)" },
  { score: 50, label: "Low (below 70)" },
];

const trustScoreSizes = ["sm", "md", "lg"] as const;

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen bg-muted/40 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-12">
        <header className="space-y-2">
          <p className={typography.caption}>Temporary — delete before launch</p>
          <h1 className={typography.h1}>WiseMove Design System</h1>
          <p className={typography.body}>
            Visual QA for typography, trust indicators, and shared card styles.
          </p>
        </header>

        {/* Typography */}
        <section className="space-y-6">
          <h2 className={typography.h2}>Typography</h2>
          <div className="grid gap-4">
            {typographySamples.map(({ variant, label, sample }) => (
              <div key={variant} className={cn(cardBaseStyles, "p-6")}>
                <p className={cn(typography.caption, "mb-3 font-medium uppercase tracking-wider")}>
                  {label}
                </p>
                <p className={typography[variant]}>{sample}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Trust Score */}
        <section className="space-y-6">
          <h2 className={typography.h2}>Trust Score</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {trustScoreTiers.map(({ score, label }) => (
              <div key={score} className={cn(cardBaseStyles, "p-6")}>
                <p className={cn(typography.caption, "mb-6 font-medium")}>{label}</p>
                <div className="flex flex-wrap items-end justify-center gap-8">
                  {trustScoreSizes.map((size) => (
                    <div key={size} className="flex flex-col items-center gap-2">
                      <TrustScore score={score} size={size} />
                      <span className={typography.caption}>{size}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Verified Badge */}
        <section className="space-y-6">
          <h2 className={typography.h2}>Verified Badge</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className={cn(cardBaseStyles, "flex flex-col gap-4 p-6")}>
              <p className={typography.caption}>verified=true</p>
              <div className="flex flex-wrap items-center gap-4">
                <VerifiedBadge verified size="sm" />
                <VerifiedBadge verified size="md" />
              </div>
            </div>
            <div className={cn(cardBaseStyles, "flex flex-col gap-4 p-6")}>
              <p className={typography.caption}>verified=false</p>
              <p className={typography.body}>
                Renders nothing —{" "}
                <VerifiedBadge verified={false} />
                <span className="text-muted-foreground">(empty)</span>
              </p>
            </div>
          </div>
        </section>

        {/* Card base styles preview */}
        <section className="space-y-6">
          <h2 className={typography.h2}>Card Base Styles</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className={cn(cardBaseStyles, "p-6")}>
                <p className={typography.h3}>Card {n}</p>
                <p className={cn(typography.caption, "mt-2")}>
                  rounded-xl, subtle border, hover shadow
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Color palette */}
        <section className="space-y-6">
          <h2 className={typography.h2}>Color Palette</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
            {[
              { name: "Primary", className: "bg-primary" },
              { name: "Primary Light", className: "bg-primary-light" },
              { name: "Accent", className: "bg-accent" },
              { name: "Accent Light", className: "bg-accent-light" },
              { name: "Trust High", className: "bg-trust-high" },
              { name: "Trust Mid", className: "bg-trust-mid" },
              { name: "Trust Low", className: "bg-trust-low" },
            ].map(({ name, className }) => (
              <div key={name} className="space-y-2">
                <div className={cn("h-16 rounded-lg shadow-sm", className)} />
                <p className={typography.caption}>{name}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
