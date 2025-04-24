import { Router } from "express";
import { listContacts } from "../controllers/contactsController";

const router = Router();

// GET /api/contacts
router.get("/contacts", listContacts);

export default router;
