import { Request, Response } from "express";
import { Booking } from "../models/booking";
import { Slot } from "../models/slot";
import { Experience } from "../models/experience";
import { bookingSchema } from "../validators/booking.validator";
import { asyncHandler } from "../utils/asyncHandler";

export const createBooking = asyncHandler(async (req: Request, res: Response) => {
  const parse = bookingSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: parse.error.issues });

  const { experienceId, slotId, customerName, customerEmail, seats, promoCode } = parse.data;

  const slot = await Slot.findById(slotId);
  if (!slot) return res.status(404).json({ message: "Slot not found" });

  const bookedSeats = await Booking.aggregate([
    { $match: { slotId: slot._id } },
    { $group: { _id: null, total: { $sum: "$seats" } } },
  ]);

  const totalBooked = bookedSeats[0]?.total || 0;
  const available = slot.capacity - totalBooked;
  if (available < seats)
    return res.status(400).json({ message: "Not enough seats available" });

  const experience = await Experience.findById(experienceId);
  if (!experience) return res.status(404).json({ message: "Experience not found" });

  let price = experience.price * seats;
  if (promoCode === "SAVE10") price *= 0.9;
  if (promoCode === "FLAT100") price -= 100;

  const booking = await Booking.create({
    experienceId,
    slotId,
    customerName,
    customerEmail,
    seats,
    promoCode,
    pricePaid: price,
  });

  res.status(201).json({ message: "Booking confirmed", booking });
});
