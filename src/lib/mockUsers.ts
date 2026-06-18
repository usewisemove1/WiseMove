import type { User, UserRole } from "@/types";

export interface MockUserSession {
  /** Stable key for the dev switcher */
  key: string;
  /** Short label in the switcher UI */
  label: string;
  description: string;
  user: User;
  roles: UserRole[];
  activeRole: UserRole;
}

/** Dev-only personas for testing role-specific dashboard behaviour. */
export const MOCK_USER_SESSIONS: MockUserSession[] = [
  {
    key: "home-seeker-only",
    label: "Ada Okonkwo",
    description: "Home seeker only (default buyer/renter)",
    user: {
      id: "user_mock_seeker_001",
      name: "Ada Okonkwo",
      firstName: "Ada",
      email: "ada.okonkwo@example.com",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    },
    roles: ["home_seeker"],
    activeRole: "home_seeker",
  },
  {
    key: "home-seeker-and-agent",
    label: "Chidi Nwosu",
    description: "Home seeker + agent (can switch dashboards)",
    user: {
      id: "user_mock_dual_001",
      name: "Chidi Nwosu",
      firstName: "Chidi",
      email: "chidi.nwosu@example.com",
      imageUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    },
    roles: ["home_seeker", "agent"],
    activeRole: "home_seeker",
  },
  {
    key: "agent-only",
    label: "Emeka Okafor",
    description: "Agent only (listings & inquiries)",
    user: {
      id: "user_mock_agent_001",
      name: "Emeka Okafor",
      firstName: "Emeka",
      email: "emeka.okafor@amaafi.com",
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    },
    roles: ["agent"],
    activeRole: "agent",
  },
];

export function getMockUserSession(key: string): MockUserSession | undefined {
  return MOCK_USER_SESSIONS.find((session) => session.key === key);
}
