import { FileBarChart, ShieldCheck, UserCheck } from "lucide-react";

import PageShell from "@/components/layout/PageShell";
import { cardBaseStyles } from "@/lib/utils";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Listings",
    description:
      "Every property is checked for ownership documents, accurate location data, and photo integrity before it goes live.",
  },
  {
    icon: UserCheck,
    title: "Verified Agents",
    description:
      "Agents complete KYC verification so you know exactly who you are dealing with before you make contact.",
  },
  {
    icon: FileBarChart,
    title: "Trust Score",
    description:
      "A data-backed score from 0–100 that combines verification signals, market pricing, and listing quality.",
  },
];

export default function TrustGuaranteeSection() {
  return (
    <section data-component="trust-guarantee" className="bg-muted/20 py-14 sm:py-16 lg:py-20">
      <PageShell dataComponent="trust-guarantee">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <h2 className={typography.h2}>The WiseMove Trust Guarantee</h2>
          <p className={cn(typography.body, "mt-3 text-muted-foreground")}>
            We built verification into every step — so you can search, compare,
            and decide with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <article
              key={title}
              className={cn(cardBaseStyles, "p-6 sm:p-8")}
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/15">
                <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
              </div>
              <h3 className={cn(typography.h3, "text-lg")}>{title}</h3>
              <p className={cn(typography.body, "mt-3 text-sm text-muted-foreground")}>
                {description}
              </p>
            </article>
          ))}
        </div>
      </PageShell>
    </section>
  );
}
