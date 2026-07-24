import { z } from "zod";

export const createAlertSchema = z.object({
  location: z.string().min(2, "Location is required"),
  listingType: z.enum(["sale", "rent", "shortlet"]),
  priceMin: z.number().positive().optional().nullable(),
  priceMax: z.number().positive().optional().nullable(),
  bedrooms: z.number().min(0).nullable(),
  frequency: z.enum(["instant", "daily", "weekly"]),
});

export type CreateAlertFormValues = z.infer<typeof createAlertSchema>;

export function zodErrorsToRecord(error: z.ZodError): Record<string, string> {
  const record: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".");
    if (!record[key]) {
      record[key] = issue.message;
    }
  }
  return record;
}
