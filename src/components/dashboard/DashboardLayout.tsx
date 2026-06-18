"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  Building2,
  Clock,
  Heart,
  Home,
  LayoutDashboard,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";

import PageShell from "@/components/layout/PageShell";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import type { UserRole } from "@/types";

type HomeSeekerView = "overview" | "saved" | "activity" | "alerts";
type AgentView = "overview" | "listings" | "inquiries";
export type DashboardView = HomeSeekerView | AgentView;

interface NavItem {
  id: DashboardView;
  label: string;
  icon: LucideIcon;
}

const HOME_SEEKER_NAV: NavItem[] = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "saved", label: "Saved Properties", icon: Heart },
  { id: "activity", label: "Recent Activity", icon: Clock },
  { id: "alerts", label: "Alerts", icon: Bell },
];

const AGENT_NAV: NavItem[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "listings", label: "My Listings", icon: Building2 },
  { id: "inquiries", label: "Inquiries Received", icon: MessageSquare },
];

interface DashboardLayoutProps {
  activeView: DashboardView;
  children: React.ReactNode;
}

function RoleSwitch({ mobile = false }: { mobile?: boolean }) {
  const router = useRouter();
  const { roles, activeRole, setActiveRole, addRole } = useAuthStore();

  const hasBothRoles =
    roles.includes("home_seeker") && roles.includes("agent");
  const isAgentOnly =
    roles.length === 1 && roles.includes("agent");

  const switchRole = (role: UserRole) => {
    setActiveRole(role);
    router.push("/dashboard?view=overview");
  };

  const handleSingleRoleSwitch = () => {
    const otherRole: UserRole =
      activeRole === "home_seeker" ? "agent" : "home_seeker";
    // TODO: this should trigger a proper onboarding flow when backend exists
    addRole(otherRole);
    router.push("/dashboard?view=overview");
  };

  if (isAgentOnly) {
    return null;
  }

  if (hasBothRoles) {
    if (mobile) {
      return (
        <select
          value={activeRole}
          onChange={(e) => switchRole(e.target.value as UserRole)}
          className="h-9 shrink-0 rounded-lg border border-border bg-white px-2 text-xs font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Switch dashboard role"
        >
          <option value="home_seeker">Home Seeker</option>
          <option value="agent">Agent</option>
        </select>
      );
    }

    return (
      <div className="rounded-lg border border-border bg-muted/50 p-1">
        <div className="grid grid-cols-2 gap-1">
          <button
            type="button"
            onClick={() => switchRole("home_seeker")}
            className={cn(
              "rounded-md px-3 py-2 text-xs font-semibold transition-colors",
              activeRole === "home_seeker"
                ? "bg-primary text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Home Seeker
          </button>
          <button
            type="button"
            onClick={() => switchRole("agent")}
            className={cn(
              "rounded-md px-3 py-2 text-xs font-semibold transition-colors",
              activeRole === "agent"
                ? "bg-primary text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Agent
          </button>
        </div>
      </div>
    );
  }

  const otherLabel = "Switch to Agent";

  return (
    <button
      type="button"
      onClick={handleSingleRoleSwitch}
      className={cn(
        "w-full rounded-lg border border-border bg-white px-3 py-2.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/5",
        mobile && "shrink-0 whitespace-nowrap"
      )}
    >
      {otherLabel}
    </button>
  );
}

function NavLink({
  item,
  isActive,
}: {
  item: NavItem;
  isActive: boolean;
}) {
  const Icon = item.icon;

  return (
    <Link
      href={`/dashboard?view=${item.id}`}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
      {item.label}
    </Link>
  );
}

export default function DashboardLayout({
  activeView,
  children,
}: DashboardLayoutProps) {
  const { activeRole } = useAuthStore();
  const navItems = activeRole === "agent" ? AGENT_NAV : HOME_SEEKER_NAV;

  return (
    <PageShell
      dataComponent="dashboard"
      innerClassName={cn(
        "flex min-h-[calc(100vh-4rem)] flex-col lg:flex-row"
      )}
    >
      {/* Mobile tab bar */}
      <div
        data-component="dashboard-mobile-nav"
        className="border-b border-border bg-white py-3 lg:hidden"
      >
        <div className="flex items-center gap-2">
          <div className="flex flex-1 gap-1 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;

              return (
                <Link
                  key={item.id}
                  href={`/dashboard?view=${item.id}`}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                    isActive
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {item.label}
                </Link>
              );
            })}
          </div>
          <RoleSwitch mobile />
        </div>
      </div>

      {/* Desktop sidebar */}
      <aside
        data-component="dashboard-sidebar"
        className="hidden w-[260px] shrink-0 border-r border-border bg-white py-6 lg:block"
      >
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.id}
              item={item}
              isActive={activeView === item.id}
            />
          ))}
        </nav>

        <div className="mt-8 border-t border-border pt-6">
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Account
          </p>
          <RoleSwitch />
        </div>
      </aside>

      {/* Main content */}
      <main data-component="dashboard-main" className="min-w-0 flex-1 py-6">
        {children}
      </main>
    </PageShell>
  );
}

export function isValidViewForRole(
  view: string,
  role: UserRole
): view is DashboardView {
  if (role === "agent") {
    return ["overview", "listings", "inquiries"].includes(view);
  }
  return ["overview", "saved", "activity", "alerts"].includes(view);
}
