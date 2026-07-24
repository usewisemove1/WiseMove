import { Suspense } from "react";

import AlertsDashboardClient from "@/components/dashboard/alerts/AlertsDashboardClient";

export default function DashboardAlertsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center text-muted-foreground">
          Loading alerts…
        </div>
      }
    >
      <AlertsDashboardClient />
    </Suspense>
  );
}
