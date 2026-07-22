"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type VerificationStatus = "not_started" | "in_review" | "approved";

interface AgentVerificationState {
  status: VerificationStatus;
  submittedAt?: string;
  submit: () => void;
  /** Kept for the local demo until a review API is connected. */
  approveForDemo: () => void;
}

export const useAgentVerificationStore = create<AgentVerificationState>()(
  persist(
    (set) => ({
      status: "not_started",
      submittedAt: undefined,
      submit: () => set({ status: "in_review", submittedAt: new Date().toISOString() }),
      approveForDemo: () => set({ status: "approved" }),
    }),
    { name: "wisemove-agent-verification" }
  )
);
