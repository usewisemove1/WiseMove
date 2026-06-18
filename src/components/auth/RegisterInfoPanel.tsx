import Image from "next/image";
import { Briefcase, Lock, ShieldCheck } from "lucide-react";

import { typography } from "@/lib/typography";
import { cardBaseStyles, cn } from "@/lib/utils";

const features = [
  {
    icon: ShieldCheck,
    iconClassName: "text-accent",
    iconBgClassName: "bg-accent/15",
    title: "100% Secure & Verified",
    description: "Every listing is vetted for ownership.",
  },
  {
    icon: Lock,
    iconClassName: "text-sky-600",
    iconBgClassName: "bg-sky-50",
    title: "Data Privacy SSL Encrypted",
    description: "Your personal data is always protected.",
  },
  {
    icon: Briefcase,
    iconClassName: "text-primary",
    iconBgClassName: "bg-primary/10",
    title: "Licensed Agent Network",
    description: "Transact only with verified professionals.",
  },
] as const;

export default function RegisterInfoPanel() {
  return (
    <div data-component="register-info" className="flex flex-col gap-5 lg:gap-4">
      <div>
        <h1 className={cn(typography.h1, "text-2xl leading-tight sm:text-3xl lg:text-[1.75rem]")}>
          Secure Your Future with Verified Property.
        </h1>
        <p className={cn(typography.caption, "mt-2 max-w-lg text-sm sm:text-base")}>
          A transparent real estate marketplace built for Nigeria — discover,
          compare, and invest with confidence.
        </p>
      </div>

      <div className="space-y-2">
        {features.map(({ icon: Icon, iconClassName, iconBgClassName, title, description }) => (
          <div
            key={title}
            className={cn(cardBaseStyles, "flex items-center gap-3 bg-muted/30 p-3 shadow-none")}
          >
            <span
              className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                iconBgClassName
              )}
            >
              <Icon className={cn("h-4 w-4", iconClassName)} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-snug text-foreground">{title}</p>
              <p className="text-xs leading-snug text-muted-foreground">{description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="relative hidden h-28 overflow-hidden rounded-xl xl:block">
        <Image
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=960&q=80"
          alt="Modern apartment building at sunset"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 480px"
        />
      </div>
    </div>
  );
}
