import AuthBrandPanel from "@/components/auth/AuthBrandPanel";
import PageShell from "@/components/layout/PageShell";
import { cn } from "@/lib/utils";

interface AuthShellProps {
  children: React.ReactNode;
  dataComponent?: string;
}

export default function AuthShell({
  children,
  dataComponent = "auth",
}: AuthShellProps) {
  return (
    <div
      data-component={dataComponent}
      className={cn(
        "relative flex flex-1 items-center py-10 sm:py-14 lg:py-16",
        "bg-[radial-gradient(circle_at_1px_1px,hsl(0_0%_82%)_1px,transparent_0)]",
        "bg-[length:22px_22px] bg-muted/20"
      )}
    >
      <PageShell dataComponent={dataComponent} className="w-full">
        <div
          data-component={`${dataComponent}-card`}
          className="overflow-hidden rounded-2xl border border-border/60 bg-white shadow-[0_24px_60px_-12px_rgba(0,0,0,0.12)]"
        >
          <div className="grid min-h-[520px] grid-cols-1 lg:grid-cols-2">
            <AuthBrandPanel className="lg:rounded-none" />
            <div
              data-component={`${dataComponent}-form`}
              className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14"
            >
              {children}
            </div>
          </div>
        </div>
      </PageShell>
    </div>
  );
}
