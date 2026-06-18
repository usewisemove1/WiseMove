import { create } from "zustand";

import { clearMockAuthCookie, setMockAuthCookie } from "@/lib/mockAuth";
import type { MockUserSession } from "@/lib/mockUsers";
import type { User, UserRole } from "@/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isMockAuth: boolean;
  roles: UserRole[];
  activeRole: UserRole;
  /** Real Clerk sign-in — defaults to home seeker only. */
  setUser: (user: User | null) => void;
  /** Dev-only mock session with explicit roles. */
  setMockSession: (session: MockUserSession) => void;
  clearAuth: () => void;
  setActiveRole: (role: UserRole) => void;
  addRole: (role: UserRole) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isMockAuth: false,
  roles: ["home_seeker"],
  activeRole: "home_seeker",
  setUser: (user) => {
    clearMockAuthCookie();
    set({
      user,
      isAuthenticated: user !== null,
      isMockAuth: false,
      roles: user ? ["home_seeker"] : ["home_seeker"],
      activeRole: "home_seeker",
    });
  },
  setMockSession: (session) => {
    setMockAuthCookie();
    set({
      user: session.user,
      isAuthenticated: true,
      isMockAuth: true,
      roles: session.roles,
      activeRole: session.activeRole,
    });
  },
  clearAuth: () => {
    clearMockAuthCookie();
    set({
      user: null,
      isAuthenticated: false,
      isMockAuth: false,
      roles: ["home_seeker"],
      activeRole: "home_seeker",
    });
  },
  setActiveRole: (role) => {
    const { roles } = get();
    if (!roles.includes(role)) return;
    set({ activeRole: role });
  },
  addRole: (role) =>
    set((state) => ({
      roles: state.roles.includes(role)
        ? state.roles
        : [...state.roles, role],
      activeRole: role,
    })),
}));
