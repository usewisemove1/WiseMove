"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

import { useAuthStore } from "@/store/useAuthStore";

/** Keeps Zustand auth state in sync with the signed-in Clerk user. */
export default function AuthStoreSync() {
  const { user, isLoaded, isSignedIn } = useUser();
  const setUser = useAuthStore((s) => s.setUser);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const isMockAuth = useAuthStore((s) => s.isMockAuth);

  useEffect(() => {
    if (!isLoaded) return;

    // Don't overwrite an active dev mock session until Clerk signs in.
    if (isMockAuth && !isSignedIn) return;

    if (!isSignedIn || !user) {
      if (!isMockAuth) clearAuth();
      return;
    }

    setUser({
      id: user.id,
      name: user.fullName || user.firstName || user.username || "User",
      firstName: user.firstName ?? undefined,
      email: user.primaryEmailAddress?.emailAddress ?? "",
      imageUrl: user.imageUrl,
    });
  }, [isLoaded, isSignedIn, user, isMockAuth, setUser, clearAuth]);

  return null;
}
