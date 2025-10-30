import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    experienceId: { type: mongoose.Schema.Types.ObjectId, ref: "Experience", required: true },
    slotId: { type: mongoose.Schema.Types.ObjectId, ref: "Slot", required: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    seats: { type: Number, required: true },
    promoCode: { type: String },
    pricePaid: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Booking = mongoose.model("Booking", BookingSchema);
