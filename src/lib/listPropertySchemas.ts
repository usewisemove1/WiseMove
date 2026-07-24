import { z } from "zod";

export const basicInfoSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(120, "Title must be 120 characters or less"),
  propertyType: z.enum(
    ["house", "apartment", "duplex", "land", "commercial"],
    { message: "Select a property type" }
  ),
  listingType: z.enum(["sale", "rent", "shortlet"], {
    message: "Select a listing type",
  }),
  bedrooms: z
    .number({ message: "Enter number of bedrooms" })
    .min(0, "Bedrooms cannot be negative"),
  bathrooms: z
    .number({ message: "Enter number of bathrooms" })
    .min(0, "Bathrooms cannot be negative"),
  size: z
    .number({ message: "Enter property size" })
    .positive("Size must be greater than 0"),
  sizeUnit: z.enum(["sqm", "sqft"]),
  description: z
    .string()
    .min(
      100,
      "Description must be at least 100 characters for a better Trust Score"
    ),
});

export const locationSchema = z.object({
  addressLine: z.string().min(5, "Enter a valid street address"),
  city: z.string().min(1, "Select a city"),
  area: z.string().min(2, "Enter the area or neighbourhood"),
  latitude: z.number({ message: "Pin your property on the map" }),
  longitude: z.number({ message: "Pin your property on the map" }),
});

export const photosSchema = z.object({
  photos: z
    .array(
      z.object({
        id: z.string(),
        url: z.string(),
        isCover: z.boolean(),
      })
    )
    .min(1, "Add at least one photo to continue"),
});

export const pricingSchema = z.object({
  price: z
    .number({ message: "Enter a valid price" })
    .positive("Price must be greater than 0"),
  pricePeriod: z.enum(["one-time", "year", "month", "night", "week"], {
    message: "Select a price period",
  }),
  negotiable: z.boolean(),
});

export const amenitiesSchema = z.object({
  amenities: z.array(
    z.object({
      icon: z.string(),
      label: z.string(),
      enabled: z.boolean(),
      description: z.string(),
    })
  ),
  amenitiesSkipped: z.boolean(),
});

export type BasicInfoFormValues = z.infer<typeof basicInfoSchema>;
export type LocationFormValues = z.infer<typeof locationSchema>;
export type PhotosFormValues = z.infer<typeof photosSchema>;
export type PricingFormValues = z.infer<typeof pricingSchema>;

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
