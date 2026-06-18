import PageShell from "@/components/layout/PageShell";
import RegisterInfoPanel from "@/components/auth/RegisterInfoPanel";
import { cn } from "@/lib/utils";

interface RegisterShellProps {
  children: React.ReactNode;
}

export default function RegisterShell({ children }: RegisterShellProps) {
  return (
    <div
      data-component="register"
      className={cn(
        "relative flex flex-1 py-6 sm:py-8 lg:py-8",
        "bg-[radial-gradient(circle_at_1px_1px,hsl(0_0%_82%)_1px,transparent_0)]",
        "bg-[length:22px_22px] bg-muted/20"
      )}
    >
      <PageShell dataComponent="register" className="w-full">
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-8 xl:gap-10">
          <RegisterInfoPanel />
          <div
            data-component="register-form-card"
            className="rounded-2xl border border-border/60 bg-white p-5 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.12)] sm:p-6 lg:p-7"
          >
            {children}
          </div>
        </div>
      </PageShell>
    </div>
  );
}
