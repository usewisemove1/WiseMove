import { Suspense } from "react";

import DashboardClient from "@/components/dashboard/DashboardClient";

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground">
          Loading dashboard…
        </div>
      }
    >
      <DashboardClient />
    </Suspense>
  );
}
