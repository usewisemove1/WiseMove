"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { MOCK_USER_SESSIONS } from "@/lib/mockUsers";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";

const isDev = process.env.NODE_ENV === "development";

export default function MockUserSwitcher() {
  const router = useRouter();
  const isMockAuth = useAuthStore((s) => s.isMockAuth);
  const user = useAuthStore((s) => s.user);
  const roles = useAuthStore((s) => s.roles);
  const setMockSession = useAuthStore((s) => s.setMockSession);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  if (!isDev) return null;

  const activeKey =
    isMockAuth && user
      ? MOCK_USER_SESSIONS.find((session) => session.user.id === user.id)?.key
      : undefined;

  const handleSelect = (key: string) => {
    const session = MOCK_USER_SESSIONS.find((item) => item.key === key);
    if (!session) return;
    setMockSession(session);
    router.push("/dashboard?view=overview");
  };

  return (
    <div
      data-component="mock-user-switcher"
      className="fixed bottom-4 right-4 z-[100] w-[min(100vw-2rem,20rem)] rounded-xl border border-border bg-white p-3 shadow-lg"
    >
      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        Dev: mock user
      </p>

      <div className="mt-2 space-y-1.5">
        {MOCK_USER_SESSIONS.map((session) => (
          <button
            key={session.key}
            type="button"
            onClick={() => handleSelect(session.key)}
            className={cn(
              "w-full rounded-lg border px-3 py-2 text-left transition-colors",
              activeKey === session.key
                ? "border-primary bg-primary/5"
                : "border-border hover:bg-muted/50"
            )}
          >
            <p className="text-sm font-semibold text-foreground">{session.label}</p>
            <p className="text-xs text-muted-foreground">{session.description}</p>
          </button>
        ))}
      </div>

      {isMockAuth && user && (
        <div className="mt-3 space-y-2 border-t border-border pt-3">
          <p className="text-xs text-muted-foreground">
            Active: <span className="font-medium text-foreground">{user.name}</span>
            {" · "}
            {roles.join(", ")}
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-8 w-full text-xs"
            onClick={() => {
              clearAuth();
              router.push("/");
            }}
          >
            Clear mock session
          </Button>
        </div>
      )}
    </div>
  );
}
