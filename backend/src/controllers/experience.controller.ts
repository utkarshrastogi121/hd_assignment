import { Request, Response } from "express";
import { Experience } from "../models/experience";
import { Slot } from "../models/slot";
import { asyncHandler } from "../utils/asyncHandler";

export const getExperiences = asyncHandler(async (req: Request, res: Response) => {
  const experiences = await Experience.find({});
  res.json(experiences);
});

export const getExperienceDetails = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const experience = await Experience.findById(id);
  if (!experience) return res.status(404).json({ message: "Experience not found" });

  const slots = await Slot.find({ experienceId: id });
  res.json({ experience, slots });
});
