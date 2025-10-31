import mongoose, { Schema, Document } from "mongoose";

export interface Slot {
  time: string;
  available: number;
}

export interface ExperienceDocument extends Document {
  title: string;
  description: string;
  location: string;
  price: number;
  image: string;
  about: string;
  availableDates: string[];
  slots: Slot[];
}

const SlotSchema = new Schema<Slot>({
  time: { type: String, required: true },
  available: { type: Number, required: true, min: 0 },
});

const ExperienceSchema = new Schema<ExperienceDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    about: { type: String, required: true },
    availableDates: [{ type: String, required: true }],
    slots: [SlotSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Experience ||
  mongoose.model<ExperienceDocument>("Experience", ExperienceSchema);
