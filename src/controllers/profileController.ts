import { RequestHandler } from "express";
import { fetchOwnerProfile } from "../handlers/profileHandler";

/**
 * GET /profile/:id
 * Devuelve datos públicos de perfil sin la contraseña
 */
export const getProfile: RequestHandler = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  try {
    const profile = await fetchOwnerProfile(id);
    if (!profile) {
      return res.status(404).json({ message: "Owner no encontrado" });
    }
    return res.status(200).json(profile);
  } catch (err: any) {
    console.error("Error al obtener perfil:", err);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
