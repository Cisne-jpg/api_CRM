import { getPool } from "../db/sqlserver";

// Crear Owner
export const createOwner = async (name: string, email: string, password: string) => {
  const pool = await getPool();
  const query = `INSERT INTO Owners (name, email, password) VALUES (@name, @email, @password)`;

  try {
    await pool
      .request()
      .input("name", name)
      .input("email", email)
      .input("password", password)
      .query(query);

    return { name, email, password };
  } catch (error: any) {
    throw new Error("Error al insertar el owner: " + error.message);
  }
};

// Obtener Owner por email
export const getOwnerByEmail = async (email: string) => {
  const pool = await getPool();
  const query = `SELECT * FROM Owners WHERE email = @email`;

  try {
    const result = await pool.request().input("email", email).query(query);
    return result.recordset[0];
  } catch (error: any) {
    throw new Error("Error al obtener el owner: " + error.message);
  }
};
