import { Request, Response } from "express";
import Experience from "../models/experience";
import { asyncHandler } from "../utils/asyncHandler";
import { createExperienceSchema } from "../validators/experience.validator";

export const getExperiences = asyncHandler(async (req: Request, res: Response) => {
  const experiences = await Experience.find({});
  res.status(200).json(experiences);
});

export const getExperienceDetails = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const experience = await Experience.findById(id);
  if (!experience) return res.status(404).json({ message: "Experience not found" });
  res.status(200).json(experience);
});

export const addExperience = asyncHandler(async (req: Request, res: Response) => {
  try {
    const parsed = createExperienceSchema.parse(req.body);

    const newExperience = await Experience.create(parsed);

    res.status(201).json({
      message: "Experience created successfully",
      experience: newExperience,
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.errors.map((err: any) => err.message),
      });
    }

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});
