import mongoose from "mongoose";

const SlotSchema = new mongoose.Schema(
  {
    experienceId: { type: mongoose.Schema.Types.ObjectId, ref: "Experience", required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    capacity: { type: Number, default: 5 },
  },
  { timestamps: true }
);

export const Slot = mongoose.model("Slot", SlotSchema);
