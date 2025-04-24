import { Router } from "express";
import { getProfile } from "../controllers/profileController";

const router = Router();

// Exponer perfil: GET /profile/:id
router.get("/:id", getProfile);

export default router;