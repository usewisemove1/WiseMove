"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FileText, Upload, X } from "lucide-react";

import TrustScorePreview from "@/components/list-property/TrustScorePreview";
import { Button } from "@/components/ui/button";
import { calculateListingTrustScore } from "@/lib/listPropertyTrustScore";
import { typography } from "@/lib/typography";
import { cardBaseStyles, cn, formatPrice } from "@/lib/utils";
import { useListPropertyStore } from "@/store/useListPropertyStore";
import type { ListPropertyStep } from "@/types";

function SummaryCard({
  title,
  step,
  onEdit,
  children,
}: {
  title: string;
  step: ListPropertyStep;
  onEdit: (step: ListPropertyStep) => void;
  children: React.ReactNode;
}) {
  return (
    <div className={cn(cardBaseStyles, "p-5")}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-base font-bold text-foreground">{title}</h3>
        <button
          type="button"
          onClick={() => onEdit(step)}
          className="text-sm font-medium text-primary hover:underline"
        >
          Edit
        </button>
      </div>
      <div className="space-y-2 text-sm text-muted-foreground">{children}</div>
    </div>
  );
}

function createProofId() {
  return `proof-${Date.now()}`;
}

export default function ReviewStep() {
  const inputRef = useRef<HTMLInputElement>(null);
  const formData = useListPropertyStore((state) => state.formData);
  const goToStep = useListPropertyStore((state) => state.goToStep);
  const updateFormData = useListPropertyStore((state) => state.updateFormData);
  const { score } = calculateListingTrustScore(formData);

  const enabledAmenities = formData.amenities.filter(
    (amenity) => amenity.enabled && amenity.description.trim()
  );

  const handleProofUpload = (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;

    updateFormData({
      ownershipProof: {
        id: createProofId(),
        url: URL.createObjectURL(file),
        name: file.name,
        file,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className={typography.h2}>Review & Submit</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Confirm your details before submitting for verification.
        </p>
      </div>

      <div className="flex flex-col items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 px-6 py-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          Final Trust Score Preview
        </p>
        <p className="text-5xl font-bold text-primary">{score}</p>
        <p className="text-sm text-muted-foreground">
          {formData.ownershipProof
            ? "Your listing is ready for full verification."
            : "Upload proof of ownership to unlock the full score (listings without it are capped at 70%)."}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <SummaryCard title="Basic Info" step={1} onEdit={goToStep}>
          <p>
            <span className="font-medium text-foreground">Title:</span>{" "}
            {formData.title || "—"}
          </p>
          <p>
            <span className="font-medium text-foreground">Type:</span>{" "}
            {formData.propertyType || "—"} · {formData.listingType || "—"}
          </p>
          <p>
            <span className="font-medium text-foreground">Size:</span>{" "}
            {formData.bedrooms ?? "—"} bed · {formData.bathrooms ?? "—"} bath ·{" "}
            {formData.size ?? "—"} {formData.sizeUnit}
          </p>
        </SummaryCard>

        <SummaryCard title="Location" step={2} onEdit={goToStep}>
          <p>{formData.addressLine || "—"}</p>
          <p>
            {formData.area || "—"}, {formData.city || "—"}
          </p>
          <p>
            GPS:{" "}
            {formData.latitude !== null && formData.longitude !== null
              ? `${formData.latitude.toFixed(5)}, ${formData.longitude.toFixed(5)}`
              : "Not pinned"}
          </p>
        </SummaryCard>

        <SummaryCard title="Photos" step={3} onEdit={goToStep}>
          <p>{formData.photos.length} photo(s) uploaded</p>
          {formData.photos.length > 0 ? (
            <div className="grid grid-cols-3 gap-2 pt-2">
              {formData.photos.slice(0, 3).map((photo) => (
                <div
                  key={photo.id}
                  className="relative aspect-[4/3] overflow-hidden rounded-md"
                >
                  <Image
                    src={photo.url}
                    alt="Listing preview"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          ) : null}
        </SummaryCard>

        <SummaryCard title="Pricing" step={4} onEdit={goToStep}>
          <p>
            {formData.price
              ? formatPrice(formData.price, "NGN")
              : "—"}{" "}
            {formData.pricePeriod ? `(${formData.pricePeriod})` : ""}
          </p>
          <p>{formData.negotiable ? "Negotiable" : "Fixed price"}</p>
        </SummaryCard>

        <SummaryCard title="Amenities" step={5} onEdit={goToStep}>
          {formData.amenitiesSkipped ? (
            <p>Skipped for now</p>
          ) : enabledAmenities.length > 0 ? (
            enabledAmenities.map((amenity) => (
              <p key={amenity.label}>
                <span className="font-medium text-foreground">
                  {amenity.label}:
                </span>{" "}
                {amenity.description}
              </p>
            ))
          ) : (
            <p>No amenities added</p>
          )}
        </SummaryCard>
      </div>

      <div className={cn(cardBaseStyles, "space-y-4 p-5")}>
        <div>
          <h3 className="text-base font-bold text-foreground">
            Proof of Ownership
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Upload Certificate of Occupancy, Deed, or equivalent documentation.
            Required for full Trust Score verification — listings without this
            are capped at 70%.
          </p>
        </div>

        {formData.ownershipProof ? (
          <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/30 px-4 py-3">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-primary" aria-hidden="true" />
              <span className="text-sm font-medium text-foreground">
                {formData.ownershipProof.name}
              </span>
            </div>
            <button
              type="button"
              onClick={() => updateFormData({ ownershipProof: null })}
              className="rounded-md p-1.5 hover:bg-muted"
              aria-label="Remove ownership proof"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border px-4 py-8 text-sm font-medium text-foreground hover:bg-muted/30"
          >
            <Upload className="h-4 w-4" />
            Upload document
          </button>
        )}

        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          onChange={(e) => {
            handleProofUpload(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      <TrustScorePreview compact className="lg:hidden" />
    </div>
  );
}

export function ListingSuccessState() {
  const submittedListingId = useListPropertyStore(
    (state) => state.submittedListingId
  );
  const resetWizard = useListPropertyStore((state) => state.resetWizard);

  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
        <span className="text-3xl">✓</span>
      </div>
      <h2 className="mt-6 text-2xl font-bold text-foreground">
        Your listing has been submitted for review!
      </h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Our verification team will review your property details and notify you
        once it goes live on WiseMove.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link href={`/property/${submittedListingId ?? "preview"}`}>
            View Listing
          </Link>
        </Button>
        <Button type="button" variant="outline" size="lg" onClick={resetWizard}>
          List Another Property
        </Button>
      </div>
    </div>
  );
}
