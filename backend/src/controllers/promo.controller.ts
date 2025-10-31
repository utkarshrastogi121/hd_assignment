import { Request, Response } from "express";
import { promoSchema } from "../validators/promo.validator";
import { asyncHandler } from "../utils/asyncHandler";

const VALID_CODES = {
  SAVE10: { type: "percent", value: 10 },
  FLAT100: { type: "flat", value: 100 },
};

export const validatePromo = asyncHandler(
  async (req: Request, res: Response) => {
    const parse = promoSchema.safeParse(req.body);
    if (!parse.success)
      return res.status(400).json({ error: parse.error.issues });

    const { code } = parse.data;
    const promo = VALID_CODES[code as keyof typeof VALID_CODES];

    if (!promo)
      return res
        .status(404)
        .json({ valid: false, message: "Invalid promo code" });

    res.json({
      valid: true,
      type: promo.type,
      value: promo.value,
      discount: promo.value,
    });
  }
);
