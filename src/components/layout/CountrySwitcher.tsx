"use client";

import { Check, Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { countries } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useCountryStore } from "@/store/useCountryStore";
import type { Country } from "@/types";

interface CountrySwitcherProps {
  className?: string;
  fullWidth?: boolean;
}

export default function CountrySwitcher({
  className,
  fullWidth = false,
}: CountrySwitcherProps) {
  const { selectedCountry, setCountry } = useCountryStore();

  const handleSelect = (country: Country) => {
    setCountry(country);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "text-foreground hover:bg-muted hover:text-foreground",
            fullWidth && "h-10 w-full justify-start gap-3 px-3",
            className
          )}
          aria-label={`Region: ${selectedCountry.name} (${selectedCountry.currency})`}
        >
          <Globe className="h-5 w-5" strokeWidth={1.5} />
          {fullWidth && (
            <span className="text-sm font-medium">
              {selectedCountry.flag} {selectedCountry.name}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {countries.map((country) => (
          <DropdownMenuItem
            key={country.code}
            onClick={() => handleSelect(country)}
            className="flex cursor-pointer items-center justify-between gap-2"
          >
            <span className="flex items-center gap-2">
              <span aria-hidden="true">{country.flag}</span>
              <span>{country.name}</span>
            </span>
            <span className="flex items-center gap-2 text-muted-foreground">
              <span>{country.currency}</span>
              {selectedCountry.code === country.code && (
                <Check className="h-4 w-4 text-primary" />
              )}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
