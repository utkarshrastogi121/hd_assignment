import { z } from "zod";

export const bookingSchema = z.object({
  experienceId: z.string(),
  customerName: z.string().min(2),
  customerEmail: z.string().email(),
  seats: z.number().int().min(1),
  promoCode: z.string().optional(),
  pricePaid: z.number().optional(),
  date: z.string().optional(),
  time: z.string().optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;
