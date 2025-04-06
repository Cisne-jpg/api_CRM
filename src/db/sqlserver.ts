import sql from "mssql";
import dotenv from "dotenv";
dotenv.config();

const config: sql.config = {
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  server: process.env.DB_SERVER!,
  database: process.env.DB_DATABASE!,
  options: {
    trustServerCertificate: true,
  },
};

let pool: sql.ConnectionPool | null = null;

export const getPool = async (): Promise<sql.ConnectionPool> => {
  if (pool) return pool;

  try {
    pool = await new sql.ConnectionPool(config).connect();
    console.log("✅ Conexión a SQL Server establecida.");
    return pool;
  } catch (err) {
    console.error("❌ Error al conectar a SQL Server:", err);
    throw err;
  }
};
