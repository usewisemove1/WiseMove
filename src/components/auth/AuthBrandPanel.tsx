import Image from "next/image";
import { ShieldCheck } from "lucide-react";

import { cn } from "@/lib/utils";

interface AuthBrandPanelProps {
  className?: string;
}

export default function AuthBrandPanel({ className }: AuthBrandPanelProps) {
  return (
    <div
      data-component="auth-brand-panel"
      className={cn(
        "relative flex min-h-[220px] flex-col justify-end overflow-hidden bg-primary lg:min-h-full",
        className
      )}
    >
      <Image
        src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=960&q=80"
        alt=""
        fill
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 480px"
        priority
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-primary via-primary/85 to-primary/40"
        aria-hidden="true"
      />

      <div className="relative z-10 p-8 sm:p-10 lg:p-12">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/40 bg-primary/30 px-3 py-1.5 backdrop-blur-sm">
          <ShieldCheck className="h-4 w-4 text-accent" aria-hidden="true" />
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent">
            Verified properties only
          </span>
        </div>

        <h2 className="font-serif text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-[2rem] lg:leading-snug">
          The Future of African Real Estate.
        </h2>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/80 sm:text-[15px]">
          Join thousands of investors securing their future through transparent,
          verified property ownership.
        </p>
      </div>
    </div>
  );
}
