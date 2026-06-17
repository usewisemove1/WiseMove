import { Building2, ShieldCheck, Users } from "lucide-react";

import PageShell from "@/components/layout/PageShell";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

const stats = [
  {
    icon: Building2,
    value: "12,000+",
    label: "Verified listings",
  },
  {
    icon: Users,
    value: "800+",
    label: "Verified agents",
  },
  {
    icon: ShieldCheck,
    value: "100,000+",
    label: "Nigerians trust WiseMove",
  },
];

export default function TrustStatsBar() {
  return (
    <section data-component="trust-stats" className="border-y border-border bg-muted/30">
      <PageShell dataComponent="trust-stats" innerClassName="grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {stats.map(({ icon: Icon, value, label }) => (
          <div
            key={label}
            className="flex items-center justify-center gap-3 px-6 py-5 sm:py-6"
          >
            <Icon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <p className={cn(typography.body, "text-sm sm:text-base")}>
              <span className="font-bold text-foreground">{value}</span>{" "}
              <span className="text-muted-foreground">{label}</span>
            </p>
          </div>
        ))}
      </PageShell>
    </section>
  );
}
