import { getPool } from "../db/sqlserver";

export type OwnerProfile = {
  OwnerID: number;
  Name: string;
  Email: string;
  DOB: string | null;
  ProfilePhoto: string | null;
  Descrip: string | null;
};

/**
 * Lee de la base de datos el perfil de un owner por su ID
 */
export const fetchOwnerProfile = async (ownerId: number): Promise<OwnerProfile | null> => {
  const pool = await getPool();
  const query = `
    SELECT
      OwnerID,
      Name,
      Email,
      DOB,
      ProfilePhoto,
      Descrip
    FROM Owners
    WHERE OwnerID = @ownerId
  `;
  const result = await pool.request()
    .input("ownerId", ownerId)
    .query(query);
  return result.recordset[0] || null;
};
