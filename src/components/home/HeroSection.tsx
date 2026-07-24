"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { typography } from "@/lib/typography";
import { cn, pageGutterClass } from "@/lib/utils";

export default function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const navigateToSearch = (location: string) => {
    const trimmed = location.trim();
    if (!trimmed) return;
    router.push(`/search?location=${encodeURIComponent(trimmed)}`);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigateToSearch(query);
  };

  return (
    <section data-component="hero" className="relative flex min-h-[520px] items-center justify-center overflow-hidden sm:min-h-[560px] lg:min-h-[620px]">
      <Image
        src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-primary/70" aria-hidden="true" />

      <div
        data-layout="page-gutter"
        data-component="hero"
        className={cn("relative z-10 w-full py-16 sm:py-20", pageGutterClass)}
      >
        <div data-layout="page-content" data-component="hero-content" className="mx-auto max-w-4xl text-center">
          <h1
            className={cn(
              typography.display,
              "text-white sm:text-5xl lg:text-[3.5rem] lg:leading-tight"
            )}
          >
            Find Your Next Home with Total Trust
          </h1>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 max-w-3xl sm:mt-10"
          >
            <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-xl sm:flex-row sm:items-stretch">
              <div className="relative flex flex-1 items-center">
                <Search
                  className="pointer-events-none absolute left-4 h-5 w-5 text-muted-foreground"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="City, Area or Property Type"
                  className="h-14 w-full bg-transparent py-3 pl-12 pr-4 text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
                  aria-label="Search by city, area or property type"
                />
              </div>
              <Button
                type="submit"
                className="h-14 rounded-none bg-primary px-8 text-base font-semibold hover:bg-primary-light sm:min-w-[140px]"
              >
                Search
              </Button>
            </div>
          </form>

          <p className="mt-4 text-sm text-white/85 sm:text-base">
            Every listing verified. Every agent checked.
          </p>
          <Button asChild variant="outline" className="mt-6 border-white/50 bg-white/10 text-white hover:bg-white hover:text-primary">
            <a href="/search">Browse all properties</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
