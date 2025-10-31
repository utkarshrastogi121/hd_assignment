import { z } from "zod";

export const slotSchema = z.object({
  time: z.string().min(1, "Time is required"),
  available: z.number().int().min(0, "Available slots cannot be negative"),
});

export const createExperienceSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title cannot exceed 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  location: z.string().min(2, "Location is required"),
  price: z
    .union([
      z.number().positive("Price must be positive"),
      z.string().regex(/^\d+$/, "Price must be a valid number").transform(Number),
    ])
    .refine((val) => val > 0, "Price must be positive"),
  image: z.string().url("Image must be a valid URL"),

  about: z.string().min(10, "About section must be at least 10 characters long"),

  availableDates: z
    .array(z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date format"))
    .min(1, "At least one available date is required"),

  slots: z.array(slotSchema).min(1, "At least one time slot is required"),
});

export type CreateExperienceInput = z.infer<typeof createExperienceSchema>;
