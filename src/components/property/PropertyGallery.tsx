"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";

import VerifiedBadge from "@/components/trust/VerifiedBadge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

interface PropertyGalleryProps {
  images: string[];
  title: string;
  isOwnershipVerified?: boolean;
}

export default function PropertyGallery({
  images,
  title,
  isOwnershipVerified = false,
}: PropertyGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openLightbox = useCallback((index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  }, []);

  const goTo = useCallback(
    (direction: -1 | 1) => {
      setActiveIndex((prev) => {
        const next = prev + direction;
        if (next < 0) return images.length - 1;
        if (next >= images.length) return 0;
        return next;
      });
    },
    [images.length]
  );

  const galleryImages = images.slice(0, 4);
  const [main, topRight, midRight, bottomRight] = galleryImages;

  return (
    <>
      <div className="grid h-[300px] grid-cols-2 grid-rows-3 gap-1.5 overflow-hidden rounded-2xl sm:h-[380px] md:h-[440px] lg:h-[500px]">
        {main && (
          <button
            type="button"
            onClick={() => openLightbox(0)}
            className="relative col-start-1 row-span-3 row-start-1 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <Image
              src={main}
              alt={`${title} — main photo`}
              fill
              className="object-cover transition-transform duration-300 hover:scale-[1.02]"
              sizes="(max-width: 1024px) 50vw, 40vw"
              priority
            />
            {isOwnershipVerified && (
              <div className="absolute left-4 top-4 z-10">
                <VerifiedBadge
                  verified
                  label="Verified Ownership"
                  size="sm"
                />
              </div>
            )}
          </button>
        )}

        {topRight && (
          <button
            type="button"
            onClick={() => openLightbox(1)}
            className="relative col-start-2 row-start-1 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Image
              src={topRight}
              alt={`${title} — photo 2`}
              fill
              className="object-cover transition-transform duration-300 hover:scale-[1.02]"
              sizes="25vw"
            />
          </button>
        )}

        {midRight && (
          <button
            type="button"
            onClick={() => openLightbox(2)}
            className="relative col-start-2 row-start-2 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Image
              src={midRight}
              alt={`${title} — photo 3`}
              fill
              className="object-cover transition-transform duration-300 hover:scale-[1.02]"
              sizes="25vw"
            />
          </button>
        )}

        {bottomRight && (
          <button
            type="button"
            onClick={() => openLightbox(3)}
            className="relative col-start-2 row-start-3 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <Image
              src={bottomRight}
              alt={`${title} — photo 4`}
              fill
              className="object-cover transition-transform duration-300 hover:scale-[1.02]"
              sizes="25vw"
            />
            {images.length > 1 && (
              <span
                className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-lg bg-black/55 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  openLightbox(0);
                }}
              >
                <LayoutGrid className="h-3.5 w-3.5" aria-hidden="true" />
                View all photos
              </span>
            )}
          </button>
        )}
      </div>

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="h-[100dvh] max-h-[100dvh] w-screen max-w-none translate-x-[-50%] translate-y-[-50%] border-0 bg-black p-0 sm:rounded-none [&>button]:text-white">
          <DialogTitle className="sr-only">{title} photo gallery</DialogTitle>

          <div className="relative flex h-full w-full items-center justify-center">
            <Image
              src={images[activeIndex]}
              alt={`${title} — photo ${activeIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />

            <button
              type="button"
              onClick={() => goTo(-1)}
              className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              type="button"
              onClick={() => goTo(1)}
              className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              aria-label="Next photo"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-1.5 text-sm font-medium text-white">
              {activeIndex + 1} / {images.length}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
