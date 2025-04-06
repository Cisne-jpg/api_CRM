// api/login.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getOwnerByEmail } from "../src/handlers/ownersHandlers";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Faltan email o password" });
  }

  try {
    const owner = await getOwnerByEmail(email);
    if (!owner) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // Comparación simple (sin hash):  
    if (owner.password !== password) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    // No devolvemos el password
    const { password: _, ...ownerSafe } = owner;
    return res.status(200).json(ownerSafe);
  } catch (error: any) {
    console.error("Login error:", error);
    return res.status(500).json({ message: error.message || "Error interno" });
  }
}
