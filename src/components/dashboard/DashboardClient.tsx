"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

import AgentOverview from "@/components/dashboard/agent/Overview";
import InquiriesReceived from "@/components/dashboard/agent/InquiriesReceived";
import MyListings from "@/components/dashboard/agent/MyListings";
import DashboardLayout, {
  isValidViewForRole,
  type DashboardView,
} from "@/components/dashboard/DashboardLayout";
import Alerts from "@/components/dashboard/homeseeker/Alerts";
import HomeSeekerOverview from "@/components/dashboard/homeseeker/Overview";
import RecentActivity from "@/components/dashboard/homeseeker/RecentActivity";
import SavedProperties from "@/components/dashboard/homeseeker/SavedProperties";
import { useAuthStore } from "@/store/useAuthStore";

function DashboardContent({ view }: { view: DashboardView }) {
  const activeRole = useAuthStore((s) => s.activeRole);

  if (activeRole === "agent") {
    switch (view) {
      case "listings":
        return <MyListings />;
      case "inquiries":
        return <InquiriesReceived />;
      case "overview":
      default:
        return <AgentOverview />;
    }
  }

  switch (view) {
    case "saved":
      return <SavedProperties />;
    case "activity":
      return <RecentActivity />;
    case "alerts":
      return <Alerts />;
    case "overview":
    default:
      return <HomeSeekerOverview />;
  }
}

export default function DashboardClient() {
  const searchParams = useSearchParams();
  const { isLoaded, isSignedIn } = useUser();
  const isMockAuth = useAuthStore((s) => s.isMockAuth);
  const activeRole = useAuthStore((s) => s.activeRole);
  const user = useAuthStore((s) => s.user);

  const rawView = searchParams.get("view") ?? "overview";
  const view: DashboardView = isValidViewForRole(rawView, activeRole)
    ? rawView
    : "overview";

  useEffect(() => {
    if (!isValidViewForRole(rawView, activeRole) && rawView !== "overview") {
      window.history.replaceState(null, "", "/dashboard?view=overview");
    }
  }, [rawView, activeRole]);

  const hasAppSession = isMockAuth ? Boolean(user) : isSignedIn && Boolean(user);

  if (!isMockAuth && (!isLoaded || (isSignedIn && !user))) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground">
        Loading your dashboard…
      </div>
    );
  }

  if (!hasAppSession) {
    return null;
  }

  return (
    <DashboardLayout activeView={view}>
      <DashboardContent view={view} />
    </DashboardLayout>
  );
}
