import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    experienceId: { type: mongoose.Schema.Types.ObjectId, ref: "Experience", required: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    seats: { type: Number, required: true },
    promoCode: { type: String },
    pricePaid: { type: Number, required: true },
    date: { type: String },
    time: { type: String },
  },
  { timestamps: true }
);


export const Booking = mongoose.model("Booking", BookingSchema);
