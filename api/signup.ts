// api/signup.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createOwner } from "../src/handlers/ownersHandlers";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Faltan datos obligatorios" });
  }

  try {
    const newOwner = await createOwner(name, email, password);
    // No devolvemos el password en la respuesta
    const { password: _, ...ownerSafe } = newOwner as any;
    return res.status(201).json(ownerSafe);
  } catch (error: any) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: error.message || "Error interno" });
  }
}
