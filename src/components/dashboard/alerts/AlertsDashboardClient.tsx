"use client";

import { useUser } from "@clerk/nextjs";

import AlertsPageContent from "@/components/dashboard/alerts/AlertsPageContent";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useAuthStore } from "@/store/useAuthStore";

export default function AlertsDashboardClient() {
  const { isLoaded, isSignedIn } = useUser();
  const isMockAuth = useAuthStore((s) => s.isMockAuth);
  const user = useAuthStore((s) => s.user);
  const activeRole = useAuthStore((s) => s.activeRole);

  const hasAppSession = isMockAuth ? Boolean(user) : isSignedIn && Boolean(user);

  if (!isMockAuth && (!isLoaded || (isSignedIn && !user))) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground">
        Loading your alerts…
      </div>
    );
  }

  if (!hasAppSession) {
    return null;
  }

  if (activeRole !== "home_seeker") {
    return (
      <DashboardLayout activeView="overview">
        <p className="text-muted-foreground">
          Alerts are available in Home Seeker mode.
        </p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeView="alerts">
      <AlertsPageContent />
    </DashboardLayout>
  );
}
