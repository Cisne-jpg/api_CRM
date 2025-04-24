// routes/kanban.ts
import { Router } from "express";
import { addKanbanItem, getKanbanItems, deleteKanbanItem, updateKanbanItem } from "../controllers/kanbanController";

const router = Router();

// Ruta para crear un nuevo ítem en el Kanban
router.post("/", addKanbanItem);

// Ruta para obtener los ítems de Kanban de un usuario (usando owner_id en la URL)
router.get("/:owner_id", getKanbanItems);

// Ruta para eliminar un ítem del Kanban por su ID
router.delete("/:id", deleteKanbanItem);

router.patch("/:id", updateKanbanItem);

export default router;
