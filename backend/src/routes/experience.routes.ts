import express from "express";
import { getExperiences, getExperienceDetails } from "../controllers/experience.controller";
const router = express.Router();

router.get("/", getExperiences);
router.get("/:id", getExperienceDetails);

export default router;
