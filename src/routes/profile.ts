import { Router } from "express";
import { 
    getProfile,
    updateDescription,
    addTag,
    removeTag
  } from "../controllers/profileController";
const router = Router();

router.get("/:id", getProfile);
router.put("/:id/description", updateDescription);
router.post("/:id/tags", addTag);
router.delete("/:id/tags", removeTag);

export default router;
