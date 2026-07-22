import type { Appearance } from "@clerk/types";

const primaryGreen = "hsl(152 55% 23%)";

/** Shared Clerk theme aligned with WiseMove / WiseMove brand. */
export const clerkAppearance: Appearance = {
  variables: {
    colorPrimary: primaryGreen,
    colorText: "hsl(0 0% 9%)",
    colorTextSecondary: "hsl(0 0% 45%)",
    colorBackground: "transparent",
    colorInputBackground: "hsl(0 0% 100%)",
    colorInputText: "hsl(0 0% 9%)",
    colorDanger: "hsl(0 84% 60%)",
    borderRadius: "0.5rem",
    fontFamily: "var(--font-plus-jakarta-sans), ui-sans-serif, system-ui, sans-serif",
    fontSize: "0.875rem",
  },
  layout: {
    socialButtonsPlacement: "bottom",
    socialButtonsVariant: "blockButton",
    showOptionalFields: true,
  },
};

export const signInAppearance: Appearance = {
  ...clerkAppearance,
  elements: {
    rootBox: "w-full",
    cardBox: "w-full",
    card: "shadow-none border-0 bg-transparent p-0 gap-5 w-full",
    header: "hidden",
    headerTitle: "hidden",
    headerSubtitle: "hidden",
    logoBox: "hidden",
    main: "gap-5",
    form: "gap-4",
    formFieldRow: "gap-4",
    formFieldLabel: "text-sm font-semibold text-foreground",
    formFieldInput:
      "h-11 rounded-lg border border-input bg-white text-sm shadow-none focus:ring-2 focus:ring-primary/20",
    formFieldInputShowPasswordButton: "text-muted-foreground hover:text-foreground",
    formFieldAction: "text-sm font-medium text-accent hover:text-accent/80",
    formFieldAction__forgotPassword: "text-sm font-medium text-accent hover:text-accent/80",
    formFieldCheckbox: "rounded border-input",
    formFieldCheckboxLabel: "text-sm text-muted-foreground",
    formButtonPrimary:
      "h-11 w-full rounded-lg bg-primary text-sm font-semibold normal-case shadow-none hover:bg-primary/90",
    formButtonReset:
      "h-11 w-full rounded-lg bg-primary text-sm font-semibold normal-case shadow-none hover:bg-primary/90",
    dividerRow: "my-2",
    dividerLine: "bg-border",
    dividerText:
      "text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground",
    socialButtons: "gap-3",
    socialButtonsBlockButton:
      "h-11 rounded-lg border border-border bg-white text-sm font-medium text-foreground shadow-none hover:bg-muted/40",
    socialButtonsBlockButtonText: "text-sm font-medium",
    socialButtonsProviderIcon: "h-4 w-4",
    footer: "bg-transparent pt-2",
    footerAction: "justify-center",
    footerActionText: "text-sm text-muted-foreground",
    footerActionLink: "text-sm font-semibold text-primary hover:text-primary/80",
    identityPreview: "rounded-lg border border-border",
    identityPreviewText: "text-sm font-medium",
    identityPreviewEditButton: "text-sm text-primary",
    alert: "rounded-lg",
    formFieldErrorText: "text-xs text-destructive",
  },
};
