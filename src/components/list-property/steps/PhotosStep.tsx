"use client";

import { useRef } from "react";
import Image from "next/image";
import { Star, Upload, X } from "lucide-react";

import { FieldError } from "@/components/list-property/FormFields";
import { typography } from "@/lib/typography";
import { cardBaseStyles, cn } from "@/lib/utils";
import { useListPropertyStore } from "@/store/useListPropertyStore";
import type { ListingPhoto } from "@/types";

function createPhotoId() {
  return `photo-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function PhotosStep() {
  const inputRef = useRef<HTMLInputElement>(null);
  const formData = useListPropertyStore((state) => state.formData);
  const stepErrors = useListPropertyStore((state) => state.stepErrors);
  const updateFormData = useListPropertyStore((state) => state.updateFormData);

  const addPhotos = (files: FileList | null) => {
    if (!files?.length) return;

    const newPhotos: ListingPhoto[] = Array.from(files).map((file, index) => ({
      id: createPhotoId(),
      url: URL.createObjectURL(file),
      file,
      isCover: formData.photos.length === 0 && index === 0,
    }));

    updateFormData({
      photos: [...formData.photos, ...newPhotos],
    });
  };

  const removePhoto = (id: string) => {
    const remaining = formData.photos.filter((photo) => photo.id !== id);
    const hasCover = remaining.some((photo) => photo.isCover);

    updateFormData({
      photos: hasCover
        ? remaining
        : remaining.map((photo, index) => ({
            ...photo,
            isCover: index === 0,
          })),
    });
  };

  const setCover = (id: string) => {
    updateFormData({
      photos: formData.photos.map((photo) => ({
        ...photo,
        isCover: photo.id === id,
      })),
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className={typography.h2}>Photos</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload high-quality photos to showcase your property.
        </p>
      </div>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          addPhotos(e.dataTransfer.files);
        }}
        className={cn(
          cardBaseStyles,
          "flex w-full flex-col items-center justify-center border-dashed px-6 py-12 text-center transition-colors hover:bg-muted/30"
        )}
      >
        <Upload className="h-10 w-10 text-primary" aria-hidden="true" />
        <p className="mt-4 text-base font-semibold text-foreground">
          Drag photos here or click to browse
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          JPG or PNG recommended
        </p>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          addPhotos(e.target.files);
          e.target.value = "";
        }}
      />

      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium text-foreground">
          {formData.photos.length} of 5+ photos added
        </p>
        <p className="text-xs text-muted-foreground">
          Add at least 5 photos for the best Trust Score
        </p>
      </div>

      <FieldError message={stepErrors.photos} />

      {formData.photos.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {formData.photos.map((photo) => (
            <div
              key={photo.id}
              className="group relative overflow-hidden rounded-xl border border-border bg-muted"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={photo.url}
                  alt="Property upload preview"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 33vw"
                  unoptimized
                />
              </div>

              <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-2">
                {photo.isCover ? (
                  <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                    Cover
                  </span>
                ) : (
                  <span />
                )}
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setCover(photo.id)}
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full bg-white/95 shadow-sm",
                      photo.isCover && "text-primary"
                    )}
                    aria-label="Set as cover photo"
                  >
                    <Star
                      className={cn("h-4 w-4", photo.isCover && "fill-current")}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => removePhoto(photo.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/95 shadow-sm"
                    aria-label="Remove photo"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {/* TODO: wire to Cloudinary when backend is ready */}
    </div>
  );
}
