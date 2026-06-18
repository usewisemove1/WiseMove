import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NewListingPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-16 text-center sm:px-6">
      <h1 className="text-2xl font-bold text-foreground">Add New Listing</h1>
      <p className="mt-3 text-muted-foreground">
        The listing creation flow is coming soon. You&apos;ll be able to add
        property details, photos, and verification documents here.
      </p>
      <Button asChild variant="outline" className="mt-8">
        <Link href="/dashboard?view=listings">
          <ArrowLeft className="h-4 w-4" />
          Back to My Listings
        </Link>
      </Button>
    </div>
  );
}
