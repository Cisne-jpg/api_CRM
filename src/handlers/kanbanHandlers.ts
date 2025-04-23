// handlers/kanbanHandler.ts
import { getPool } from "../db/sqlserver";

export const createKanbanItem = async (
  titulo: string,
  descripcion: string,
  estado: string,
  fecha_limite: string, // Puedes ajustar el tipo según necesites (ej. Date)
  prioridad: string,
  owner_id: number
): Promise<void> => {
  const pool = await getPool();
  const query = `
    INSERT INTO kanban (titulo, descripcion, estado, fecha_limite, prioridad, owner_id)
    VALUES (@titulo, @descripcion, @estado, @fecha_limite, @prioridad, @owner_id)
  `;
  await pool.request()
    .input("titulo", titulo)
    .input("descripcion", descripcion)
    .input("estado", estado)
    .input("fecha_limite", fecha_limite)
    .input("prioridad", prioridad)
    .input("owner_id", owner_id)
    .query(query);
};

export const getKanbanItemsByOwner = async (owner_id: number): Promise<any[]> => {
  const pool = await getPool();
  const query = `SELECT * FROM kanban WHERE owner_id = @owner_id`;
  const result = await pool.request()
    .input("owner_id", owner_id)
    .query(query);
  return result.recordset;
};

export const deleteKanbanItem = async (id: number): Promise<void> => {
  const pool = await getPool();
  const query = `DELETE FROM kanban WHERE id = @id`;
  await pool.request()
    .input("id", id)
    .query(query);
};
