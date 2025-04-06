import { pool } from "../db/sqlserver"; // Asumiendo que usas un pool para conexiones a SQL Server

// Función para crear un owner
export const createOwner = async (name: string, email: string, password: string) => {
  const query = `INSERT INTO Owners (name, email, password) VALUES (@name, @email, @password)`;
  try {
    const result = await pool.request()
      .input("name", name)
      .input("email", email)
      .input("password", password)
      .query(query);
    return { name, email, password }; // Simplemente devuelve lo que se creó (en producción, no devolver el password)
  } catch (error) {
    throw new Error("Error al insertar el owner: " + (error as Error).message);
  }
};

// Función para obtener un owner por email
export const getOwnerByEmail = async (email: string) => {
  const query = `SELECT * FROM Owners WHERE email = @email`;
  try {
    const result = await pool.request()
      .input("email", email)
      .query(query);
    return result.recordset[0]; // Devolver el primer registro encontrado
  } catch (error) {
    throw new Error("Error al obtener el owner: " + (error as Error).message);
  }
};
