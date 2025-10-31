import express from "express";
import {
  getExperiences,
  getExperienceDetails,
  addExperience,
} from "../controllers/experience.controller";

const router = express.Router();

router.get("/", getExperiences);
router.get("/:id", getExperienceDetails);
router.post("/", addExperience);

export default router;
