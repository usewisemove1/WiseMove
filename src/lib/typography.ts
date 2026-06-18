export const typography = {
  display:
    "text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl",
  h1: "text-3xl font-bold leading-tight tracking-tight text-primary sm:text-4xl",
  h2: "text-2xl font-bold leading-snug tracking-tight text-foreground sm:text-3xl",
  h3: "text-xl font-semibold leading-snug text-foreground sm:text-2xl",
  body: "text-base leading-relaxed text-foreground",
  caption: "text-sm leading-normal text-muted-foreground",
} as const;

export type TypographyVariant = keyof typeof typography;
