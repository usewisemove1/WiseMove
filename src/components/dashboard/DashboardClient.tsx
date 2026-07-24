"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

import AgentOverview from "@/components/dashboard/agent/Overview";
import InquiriesReceived from "@/components/dashboard/agent/InquiriesReceived";
import MyListings from "@/components/dashboard/agent/MyListings";
import DashboardLayout, {
  isValidViewForRole,
  type DashboardView,
} from "@/components/dashboard/DashboardLayout";
import HomeSeekerOverview from "@/components/dashboard/homeseeker/Overview";
import Profile from "@/components/dashboard/homeseeker/Profile";
import RecentSearches from "@/components/dashboard/homeseeker/RecentSearches";
import SavedProperties from "@/components/dashboard/homeseeker/SavedProperties";
import Settings from "@/components/dashboard/homeseeker/Settings";
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
    case "searches":
      return <RecentSearches />;
    case "profile":
      return <Profile />;
    case "settings":
      return <Settings />;
    case "overview":
    default:
      return <HomeSeekerOverview />;
  }
}

export default function DashboardClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoaded, isSignedIn } = useUser();
  const isMockAuth = useAuthStore((s) => s.isMockAuth);
  const activeRole = useAuthStore((s) => s.activeRole);
  const user = useAuthStore((s) => s.user);

  const rawView = searchParams.get("view") ?? "overview";

  useEffect(() => {
    if (rawView === "alerts") {
      router.replace("/dashboard/alerts");
    }
  }, [rawView, router]);

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

  if (rawView === "alerts") {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground">
        Redirecting to alerts…
      </div>
    );
  }

  return (
    <DashboardLayout activeView={view}>
      <DashboardContent view={view} />
    </DashboardLayout>
  );
}
