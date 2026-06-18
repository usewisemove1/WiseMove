import Link from "next/link";
import { Download, MessageCircle } from "lucide-react";

import PageShell from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

export default function TrustGuideCTA() {
  return (
    <section data-component="trust-guide-cta" className="py-14 sm:py-16 lg:py-20">
      <PageShell dataComponent="trust-guide-cta">
        <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2
              className={cn(
                typography.h2,
                "text-white sm:text-3xl lg:text-4xl"
              )}
            >
              Invest with Intelligence. Download the Trust Guide.
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">
              Learn how WiseMove Trust Scores are calculated — from ownership
              verification and agent checks to market pricing signals — so you
              can invest with clarity.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                className="h-11 rounded-full bg-accent px-6 font-semibold text-white hover:bg-accent-light hover:text-foreground"
              >
                <Link href="#">
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download Guide
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-11 rounded-full border-white/40 bg-transparent px-6 font-semibold text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="#">
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Speak with an Expert
                </Link>
              </Button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-sm rounded-xl border border-white/20 bg-white/95 p-6 shadow-2xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Trust Score Breakdown
              </p>
              <div className="mt-4 space-y-3">
                {[
                  { label: "Ownership verified", score: 95 },
                  { label: "Agent verified", score: 92 },
                  { label: "Address verified", score: 88 },
                  { label: "Photo integrity", score: 97 },
                ].map(({ label, score }) => (
                  <div key={label}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="text-foreground">{label}</span>
                      <span className="font-semibold text-primary">{score}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-center text-2xl font-bold text-primary">
                96<span className="text-base font-normal text-muted-foreground">/100</span>
              </p>
            </div>
          </div>
        </div>
        </div>
      </PageShell>
    </section>
  );
}
