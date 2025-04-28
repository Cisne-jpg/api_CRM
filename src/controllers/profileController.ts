import { RequestHandler } from "express";
import { 
  fetchOwnerProfile,
  updateOwnerDescription,
  addOwnerTag,
  removeOwnerTag
} from "../handlers/profileHandler";

/**
 * GET /profile/:id
 * Devuelve datos públicos de perfil sin la contraseña
 */
export const getProfile: RequestHandler = async (req, res) => {
  try {
    const ownerId = parseInt(req.params.id, 10);

    if (isNaN(ownerId)) {
      res.status(400).json({ 
        success: false, 
        message: "ID inválido" 
      });
      return;
    }

    const profile = await fetchOwnerProfile(ownerId);

    if (!profile) {
      res.status(404).json({ 
        success: false, 
        message: "Perfil no encontrado" 
      });
      return;
    }

    res.json({ success: true, data: profile });
  } catch (error) {
    console.error("Error GET /profile:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error interno del servidor" 
    });
  }
};

// PUT /profile/:id/description
export const updateDescription: RequestHandler = async (req, res) => {
  try {
    const ownerId = parseInt(req.params.id, 10);
    const { description } = req.body;

    if (isNaN(ownerId)) {
      res.status(400).json({ 
        success: false, 
        message: "ID inválido" 
      });
      return;
    }

    const updated = await updateOwnerDescription(ownerId, description);
    if (!updated) {
      res.status(404).json({ success: false, message: "Perfil no encontrado" });
      return;
    }

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error PUT /description:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error al actualizar descripción" 
    });
  }
};

// POST /profile/:id/tags
export const addTag: RequestHandler = async (req, res) => {
  try {
    const ownerId = parseInt(req.params.id, 10);
    const { tag } = req.body;

    if (isNaN(ownerId)) {
      res.status(400).json({ 
        success: false, 
        message: "ID inválido" 
      });
      return;
    }

    if (!tag?.trim()) {
      res.status(400).json({ 
        success: false, 
        message: "Etiqueta requerida" 
      });
      return;
    }

    const updated = await addOwnerTag(ownerId, tag.trim());
    if (!updated) {
      res.status(404).json({ success: false, message: "Perfil no encontrado" });
      return;
    }

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error POST /tags:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error al añadir etiqueta" 
    });
  }
};

// DELETE /profile/:id/tags
export const removeTag: RequestHandler = async (req, res) => {
  try {
    const ownerId = parseInt(req.params.id, 10);
    const { tag } = req.body;

    if (isNaN(ownerId)) {
      res.status(400).json({ 
        success: false, 
        message: "ID inválido" 
      });
      return;
    }

    if (!tag?.trim()) {
      res.status(400).json({ 
        success: false, 
        message: "Etiqueta requerida" 
      });
      return;
    }

    const updated = await removeOwnerTag(ownerId, tag.trim());
    if (!updated) {
      res.status(404).json({ success: false, message: "Perfil no encontrado" });
      return;
    }

    res.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error DELETE /tags:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error al eliminar etiqueta" 
    });
  }
};