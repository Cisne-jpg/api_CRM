// controllers/kanbanController.ts
import { Request, Response } from "express";
import { createKanbanItem, getKanbanItemsByOwner, deleteKanbanItem as deleteItem, updateKanbanItem as updateItem, registerKanban } from "../handlers/kanbanHandlers";

// Endpoint para crear un ítem en el Kanban
export const addKanbanItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { titulo, descripcion, estado, fecha_limite, prioridad, owner_id } = req.body;

    if (!titulo || !owner_id) {
      res.status(400).json({ message: "El título y owner_id son requeridos" });
      return;
    }

    await createKanbanItem(titulo, descripcion, estado, fecha_limite, prioridad, owner_id);
    res.status(201).json({ message: "Ítem de Kanban creado exitosamente" });
  } catch (error) {
    console.error("Error en addKanbanItem:", error);
    res.status(500).json({ message: "Error al crear el ítem de Kanban" });
  }
};

// Endpoint para obtener los ítems de Kanban de un usuario
export const getKanbanItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const owner_id = parseInt(req.params.owner_id, 10);
    if (isNaN(owner_id)) {
      res.status(400).json({ message: "owner_id inválido" });
      return;
    }

    const items = await getKanbanItemsByOwner(owner_id);
    res.status(200).json(items);
  } catch (error) {
    console.error("Error en getKanbanItems:", error);
    res.status(500).json({ message: "Error al obtener los ítems de Kanban" });
  }
};

export const stateCount = async (req: Request, res: Response): Promise<void> => {
  try {
    const owner_id = parseInt(req.params.owner_id, 10);
    const estado = req.params.estado;
    if (isNaN(owner_id)) {
      res.status(400).json({ message: "owner_id inválido" });
      return;
    }

    const statec = await registerKanban(owner_id,estado);
    res.status(200).json(statec);
  } catch (error) {
    console.error("Error en registerkanban:", error);
    res.status(500).json({ message: "Error al reunir los estados" });
  }
};

// Endpoint para eliminar un ítem de Kanban
export const deleteKanbanItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      res.status(400).json({ message: "ID inválido" });
      return;
    }

    await deleteItem(id);
    res.status(200).json({ message: "Elemento Kanban eliminado correctamente" });
  } catch (error) {
    console.error("Error en deleteKanbanItem:", error);
    res.status(500).json({ message: "Error al eliminar el ítem de Kanban" });
  }
};

export const updateKanbanItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id, 10);
    const { estado } = req.body;

    if (isNaN(id) || !estado) {
      res.status(400).json({ message: "ID válido y campo 'estado' son requeridos" });
      return;
    }

    await updateItem(id, estado);
    res.sendStatus(204); // No content, la actualización fue exitosa
  } catch (error) {
    console.error("Error en updateKanbanItem:", error);
    res.status(500).json({ message: "Error al actualizar el ítem de Kanban" });
  }
};
