import { getPool } from "../db/sqlserver";

export type OwnerProfile = {
  OwnerID: number;
  Name: string;
  Email: string;
  DOB: string | null;
  ProfilePhoto: string | null;
  Descrip: string | null;
  Etiquetas: string[];
};

// Obtener perfil
export const fetchOwnerProfile = async (
  ownerId: number
): Promise<OwnerProfile | null> => {
  const pool = await getPool();

  const [profileResult, tagsResult] = await Promise.all([
    pool
      .request()
      .input("ownerId", ownerId)
      .query(
        `
        SELECT OwnerID, Name, Email, DOB, ProfilePhoto, Descrip
        FROM Owners
        WHERE OwnerID = @ownerId
      `
      ),

    pool
      .request()
      .input("ownerId", ownerId)
      .query(
        `
        SELECT EtiquetaNombre
        FROM Etiquetas
        WHERE OwnerID = @ownerId
      `
      ),
  ]);

  if (!profileResult.recordset[0]) return null;

  return {
    ...profileResult.recordset[0],
    Etiquetas: tagsResult.recordset.map((t) => t.EtiquetaNombre),
  };
};

// Actualizar descripción y retornar el perfil actualizado
export const updateOwnerDescription = async (
  ownerId: number,
  description: string
): Promise<OwnerProfile | null> => {
  const pool = await getPool();
  await pool
    .request()
    
    .input("ownerId", ownerId)
    .input("description", description)
    .query(
      `
      UPDATE Owners
      SET Descrip = @description
      WHERE OwnerID = @ownerId
    `
    );
  // Retornamos el perfil actualizado
  return fetchOwnerProfile(ownerId);
};

// Añadir etiqueta y retornar el perfil actualizado
export const addOwnerTag = async (
  ownerId: number,
  tag: string
): Promise<OwnerProfile | null> => {
  const pool = await getPool();
  await pool
    .request()
    .input("ownerId", ownerId)
    .input("tag", tag)
    .query(
      `
      insert into Etiquetas(EtiquetaNombre, OwnerID)
      values(@tag, @ownerId)
    `
    );
  return fetchOwnerProfile(ownerId);
};

// Eliminar etiqueta y retornar el perfil actualizado
export const removeOwnerTag = async (
  ownerId: number,
  tag: string
): Promise<OwnerProfile | null> => {
  const pool = await getPool();
  await pool
    .request()
    .input("ownerId", ownerId)
    .input("tag", tag)
    .query(
      `
      DELETE FROM Etiquetas
      WHERE OwnerID = @ownerId
        AND EtiquetaNombre = @tag
    `
    );
  return fetchOwnerProfile(ownerId);
};