import { z } from "zod";
import { VALID_COUNTRY_CODES } from "../types/countries";

export const originSchema = z.object({
  originCountry: z
    .string()
    .min(1, "Country is required")
    .refine((val) => VALID_COUNTRY_CODES.includes(val), {
      message: "Please select a valid country",
    }),
  originCity: z
    .string()
    .min(1, "City is required")
    .min(2, "City must be at least 2 characters"),
  originPostalCode: z
    .string()
    .min(1, "Postal code is required")
    .min(3, "Postal code must be at least 3 characters"),
});

export const destinationSchema = z.object({
  destinationCountry: z
    .string()
    .min(1, "Country is required")
    .refine((val) => VALID_COUNTRY_CODES.includes(val), {
      message: "Please select a valid country for international shipping",
    }),
  destinationCity: z
    .string()
    .min(1, "City is required")
    .min(2, "City must be at least 2 characters"),
  destinationPostalCode: z
    .string()
    .min(1, "Postal code is required")
    .min(3, "Postal code must be at least 3 characters"),
});

export const packageSchema = z.object({
  weight: z
    .number({ error: "Weight must be a number" })
    .positive("Weight must be greater than zero")
    .max(1000, "Weight cannot exceed 1000 kg"),
  length: z
    .number({ error: "Length must be a number" })
    .positive("Length must be greater than zero")
    .max(300, "Length cannot exceed 300 cm"),
  width: z
    .number({ error: "Width must be a number" })
    .positive("Width must be greater than zero")
    .max(300, "Width cannot exceed 300 cm"),
  height: z
    .number({ error: "Height must be a number" })
    .positive("Height must be greater than zero")
    .max(300, "Height cannot exceed 300 cm"),
});

export const fullQuoteSchema = originSchema
  .merge(destinationSchema)
  .merge(packageSchema);

export type OriginFormData = z.infer<typeof originSchema>;
export type DestinationFormData = z.infer<typeof destinationSchema>;
export type PackageFormData = z.infer<typeof packageSchema>;
export type FullQuoteFormData = z.infer<typeof fullQuoteSchema>;
