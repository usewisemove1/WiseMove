"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { SignedIn, SignedOut, useClerk, useUser } from "@clerk/nextjs";
import { Bell, Heart, LayoutDashboard, LogOut, Menu } from "lucide-react";

import CountrySwitcher from "@/components/layout/CountrySwitcher";
import PageShell from "@/components/layout/PageShell";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";
import type { User } from "@/types";

const navLinks = [
  { label: "Rent", href: "/search?type=rent", matchType: "rent" },
  { label: "Buy", href: "/search?type=sale", matchType: "sale" },
  { label: "Shortlet", href: "/search?type=shortlet", matchType: "shortlet" },
  { label: "Invest", href: "/search?type=invest", matchType: "invest" },
] as const;

function getInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function isNavLinkActive(
  pathname: string,
  searchParams: URLSearchParams,
  matchType: string
): boolean {
  if (pathname === "/") {
    return matchType === "rent";
  }

  if (pathname !== "/search") return false;

  const type = searchParams.get("type") ?? "rent";
  return type === matchType;
}

function NavLinks({
  className,
  onNavigate,
  vertical = false,
}: {
  className?: string;
  onNavigate?: () => void;
  vertical?: boolean;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <nav
      data-component="navbar-links"
      className={cn(
        "flex items-center",
        vertical ? "flex-col items-start gap-1" : "gap-6 lg:gap-8",
        className
      )}
    >
      {navLinks.map(({ label, href, matchType }) => {
        const isActive = isNavLinkActive(pathname, searchParams, matchType);

        return (
          <Link
            key={label}
            href={href}
            onClick={onNavigate}
            className={cn(
              "group relative flex flex-col items-center px-1 py-2 text-sm font-medium transition-colors",
              vertical && "w-full items-start px-0",
              isActive
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {label}
            <span
              className={cn(
                "absolute -bottom-0.5 left-1/2 h-1 -translate-x-1/2 rounded-full bg-primary transition-all duration-200",
                vertical && "left-0 translate-x-0",
                isActive ? "w-8 opacity-100" : "w-0 opacity-0 group-hover:w-4 group-hover:opacity-40"
              )}
              aria-hidden="true"
            />
          </Link>
        );
      })}
    </nav>
  );
}

function AccountMenu({
  displayName,
  className,
  onNavigate,
  onSignOut,
}: {
  displayName: string;
  className?: string;
  onNavigate?: () => void;
  onSignOut: () => void;
}) {
  const initials = getInitials(displayName);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex items-center gap-2.5 rounded-full outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            className
          )}
          aria-label="Open account menu"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
            {initials}
          </span>
          <span className="hidden text-sm font-medium text-foreground sm:inline">
            {displayName}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuItem asChild>
          <Link href="/dashboard" onClick={onNavigate}>
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/saved" onClick={onNavigate}>
            <Heart className="h-4 w-4" />
            Saved Properties
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/alerts" onClick={onNavigate}>
            <Bell className="h-4 w-4" />
            Alerts
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            onNavigate?.();
            onSignOut();
          }}
          className="text-destructive focus:text-destructive"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UserMenu({
  className,
  onNavigate,
}: {
  className?: string;
  onNavigate?: () => void;
}) {
  const { user } = useUser();
  const { signOut } = useClerk();

  if (!user) return null;

  const displayName =
    user.fullName || user.firstName || user.username || "Account";

  return (
    <AccountMenu
      displayName={displayName}
      className={className}
      onNavigate={onNavigate}
      onSignOut={() => signOut({ redirectUrl: "/" })}
    />
  );
}

function MockUserMenu({
  user,
  className,
  onNavigate,
}: {
  user: User;
  className?: string;
  onNavigate?: () => void;
}) {
  const clearAuth = useAuthStore((s) => s.clearAuth);

  return (
    <AccountMenu
      displayName={user.name}
      className={className}
      onNavigate={onNavigate}
      onSignOut={() => {
        clearAuth();
        window.location.href = "/";
      }}
    />
  );
}

function GuestAuthButtons({
  className,
  stacked = false,
  onNavigate,
}: {
  className?: string;
  stacked?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";
  const isRegisterPage = pathname === "/register";

  return (
    <div
      className={cn(
        "flex items-center gap-4",
        stacked && "w-full flex-col gap-3",
        className
      )}
    >
      <Link
        href="/login"
        onClick={onNavigate}
        className={cn(
          typography.body,
          "text-sm font-medium transition-colors hover:text-primary",
          isLoginPage
            ? "text-primary underline decoration-2 underline-offset-[6px]"
            : "text-foreground",
          stacked && "w-full py-2 text-center"
        )}
        aria-current={isLoginPage ? "page" : undefined}
      >
        Sign In
      </Link>
      <Button
        asChild
        className={cn(
          "rounded-full bg-primary px-5 hover:bg-primary/90",
          stacked && "w-full"
        )}
      >
        <Link
          href="/register"
          onClick={onNavigate}
          aria-current={isRegisterPage ? "page" : undefined}
        >
          Register
        </Link>
      </Button>
    </div>
  );
}

function AuthSection({
  className,
  stacked = false,
  onNavigate,
}: {
  className?: string;
  stacked?: boolean;
  onNavigate?: () => void;
}) {
  const isMockAuth = useAuthStore((s) => s.isMockAuth);
  const mockUser = useAuthStore((s) => s.user);

  return (
    <>
      <SignedOut>
        {isMockAuth && mockUser ? (
          <MockUserMenu
            user={mockUser}
            className={className}
            onNavigate={onNavigate}
          />
        ) : (
          <GuestAuthButtons
            className={className}
            stacked={stacked}
            onNavigate={onNavigate}
          />
        )}
      </SignedOut>
      <SignedIn>
        <UserMenu className={className} onNavigate={onNavigate} />
      </SignedIn>
    </>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header
      data-component="navbar"
      className={cn(
        "sticky top-0 z-50 border-b bg-white transition-shadow duration-200",
        scrolled ? "border-border shadow-sm" : "border-border/60"
      )}
    >
      <PageShell
        dataComponent="navbar"
        innerClassName="flex h-16 w-full items-center justify-between gap-4"
      >
          <div
            data-component="navbar-start"
            className="flex min-w-0 items-center gap-6 lg:gap-10"
          >
            <Link
              href="/"
              className="shrink-0 text-xl font-bold text-primary transition-opacity hover:opacity-90"
            >
              WiseMove
            </Link>

            <Suspense
              fallback={
                <nav className="hidden items-center gap-6 lg:flex lg:gap-8">
                  {navLinks.map(({ label }) => (
                    <span
                      key={label}
                      className="px-1 py-2 text-sm font-medium text-muted-foreground"
                    >
                      {label}
                    </span>
                  ))}
                </nav>
              }
            >
              <NavLinks className="hidden lg:flex" />
            </Suspense>
          </div>

          <div
            data-component="navbar-end"
            className="flex shrink-0 items-center gap-1 sm:gap-2"
          >
            <CountrySwitcher className="hidden lg:inline-flex" />

            <div data-component="navbar-auth" className="hidden items-center lg:flex">
              <AuthSection />
            </div>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-sm">
                <SheetHeader>
                  <SheetTitle className="text-left text-primary">
                    Menu
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col gap-8">
                  <Suspense fallback={null}>
                    <NavLinks vertical onNavigate={closeMobile} />
                  </Suspense>
                  <div className="space-y-3">
                    <p
                      className={cn(
                        typography.caption,
                        "font-medium uppercase tracking-wider"
                      )}
                    >
                      Region
                    </p>
                    <CountrySwitcher fullWidth />
                  </div>
                  <AuthSection stacked onNavigate={closeMobile} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
      </PageShell>
    </header>
  );
}
