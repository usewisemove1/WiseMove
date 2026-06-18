import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const cardBaseStyles =
  "rounded-xl border border-border bg-card shadow-sm transition-shadow duration-200 hover:shadow-md";

/** Horizontal page gutters — use on a full-width wrapper. */
export const pageGutterClass = "px-5 sm:px-6 lg:px-10";

/** Full-width content column — pair with pageGutterClass on a parent wrapper. */
export const pageContainerClass = "w-full";

export const formatPrice = (amount: number, currencyCode: string): string => {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 0,
  }).format(amount);
};

export function formatAbbreviatedPrice(
  amount: number,
  currencyCode = "NGN"
): string {
  const symbols: Record<string, string> = {
    NGN: "₦",
    USD: "$",
    GBP: "£",
    GHS: "₵",
  };
  const symbol = symbols[currencyCode] ?? currencyCode;

  if (amount >= 1_000_000_000) {
    return `${symbol}${Math.round(amount / 1_000_000_000)}B`;
  }
  if (amount >= 1_000_000) {
    return `${symbol}${Math.round(amount / 1_000_000)}M`;
  }
  if (amount >= 1_000) {
    return `${symbol}${Math.round(amount / 1_000)}K`;
  }
  return formatPrice(amount, currencyCode);
};
