"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import CreateAlertDialog from "@/components/dashboard/alerts/CreateAlertDialog";
import PriceDropsList from "@/components/dashboard/alerts/PriceDropsList";
import SavedSearchesList from "@/components/dashboard/alerts/SavedSearchesList";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

export default function AlertsPageContent() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 3000);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className={typography.h2}>Alerts</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Stay updated on new listings and price changes
            </p>
          </div>
          <Button
            type="button"
            className="shrink-0"
            onClick={() => setDialogOpen(true)}
          >
            <Plus className="h-4 w-4" />
            Create New Alert
          </Button>
        </div>

        <Tabs defaultValue="saved-searches">
          <TabsList>
            <TabsTrigger value="saved-searches">Saved Searches</TabsTrigger>
            <TabsTrigger value="price-drops">Price Drops</TabsTrigger>
          </TabsList>

          <TabsContent value="saved-searches">
            <SavedSearchesList onCreateClick={() => setDialogOpen(true)} />
          </TabsContent>

          <TabsContent value="price-drops">
            <PriceDropsList />
          </TabsContent>
        </Tabs>
      </div>

      <CreateAlertDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSuccess={setToastMessage}
      />

      {toastMessage ? (
        <div
          role="status"
          className={cn(
            "fixed bottom-4 right-4 z-50 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-white shadow-lg",
            "animate-in fade-in slide-in-from-bottom-2"
          )}
        >
          {toastMessage}
        </div>
      ) : null}
    </>
  );
}
