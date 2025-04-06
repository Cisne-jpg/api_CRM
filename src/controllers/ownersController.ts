import { RequestHandler } from "express";
import { getPool } from "../db/sqlserver";

// Controlador de registro
export const signUp: RequestHandler = async (req, res, next) => {
  try {
    const { email, password, name, dob } = req.body;

    if (!email || !password || !name) {
      res.status(400).json({ message: "Email, contraseña y nombre son requeridos" });
      return;
    }

    const pool = await getPool();
    const check = await pool
      .request()
      .input("email", email)
      .query("SELECT * FROM Owners WHERE email = @email");

    if (check.recordset.length > 0) {
      res.status(400).json({ message: "Este email ya está registrado" });
      return;
    }

    await pool
      .request()
      .input("email", email)
      .input("password", password)
      .input("name", name)
      .input("dob", dob || null)
      .query("INSERT INTO Owners (Email, Password, Name, DOB) VALUES (@email, @password, @name, @dob)");

    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error: any) {
    console.error("Error en signUp:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// Controlador de login
export const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email y contraseña son requeridos" });
      return;
    }

    const pool = await getPool();
    const result = await pool
      .request()
      .input("email", email)
      .query("SELECT * FROM Owners WHERE email = @email");

    const user = result.recordset[0];

    if (!user || user.Password !== password) {
      res.status(401).json({ message: "Credenciales incorrectas" });
      return;
    }

    res.status(200).json({ message: "Login exitoso", user: { email: user.Email } });
  } catch (error: any) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
