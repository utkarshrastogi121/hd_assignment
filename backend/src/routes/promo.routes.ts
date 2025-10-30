import express from "express";
import { validatePromo } from "../controllers/promo.controller";
const router = express.Router();

router.post("/validate", validatePromo);

export default router;
