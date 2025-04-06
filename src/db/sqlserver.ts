import sql from "mssql";
import dotenv from "dotenv";
dotenv.config();

export const sqlConfig: sql.config = {
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  server: process.env.DB_SERVER!,
  database: process.env.DB_DATABASE!,
  options: {
    trustServerCertificate: true,
  },
};

export const pool = new sql.ConnectionPool(sqlConfig);
export const poolConnect = pool.connect();
