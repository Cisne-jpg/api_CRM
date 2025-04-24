import { RequestHandler } from "express";
import { getAllContactsWithOrg } from "../handlers/contactsHandler";

export const listContacts: RequestHandler = async (req, res) => {
  try {
    const contacts = await getAllContactsWithOrg();
    res.status(200).json({ contacts });
  } catch (error: any) {
    console.error("Error al listar contactos:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
