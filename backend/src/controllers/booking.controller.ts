import { Request, Response } from "express";
import { Booking } from "../models/booking";
import Experience from "../models/experience";
import { bookingSchema } from "../validators/booking.validator";
import { asyncHandler } from "../utils/asyncHandler";

export const createBooking = asyncHandler(async (req: Request, res: Response) => {
  const parse = bookingSchema.safeParse(req.body);
  if (!parse.success) {
    console.error("Zod validation failed:", parse.error.issues);
    return res.status(400).json({ error: parse.error.issues });
  }

  const {
    experienceId,
    customerName,
    customerEmail,
    seats,
    promoCode,
    pricePaid,
    date,
    time,
  } = parse.data;

  const experience = await Experience.findById(experienceId);
  if (!experience) return res.status(404).json({ message: "Experience not found" });

  let finalPrice = pricePaid ?? experience.price * seats;

  if (!pricePaid) {
    if (promoCode === "SAVE10") finalPrice *= 0.9;
    if (promoCode === "FLAT100") finalPrice -= 100;
  }

  const booking = await Booking.create({
    experienceId,
    customerName,
    customerEmail,
    seats,
    promoCode,
    pricePaid: finalPrice,
    date,
    time,
  });

  res.status(201).json({ message: "Booking confirmed", booking });
});
