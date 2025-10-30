import { z } from "zod";

export const promoSchema = z.object({
  code: z.string().min(1),
});
