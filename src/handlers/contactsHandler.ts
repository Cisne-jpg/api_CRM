// handlers/contactsHandler.ts
import { getPool } from "../db/sqlserver";

export type ContactWithOrg = {
  ContactID: number;
  Email: string;
  FotoPerfil: string;
  OrganizationID: number;
  OrganizationName: string;
  Industry: string;
};

export const getAllContactsWithOrg = async (): Promise<ContactWithOrg[]> => {
  const pool = await getPool();
  const query = `
    SELECT
      c.ContactID,
      c.Email,
      c.FotoPerfil,
      c.OrganizationID,
      o.Name           AS OrganizationName,
      o.Industry       AS Industry
    FROM Contacts c
    LEFT JOIN Organizations o
      ON c.OrganizationID = o.OrganizationID
  `;
  const result = await pool.request().query(query);
  return result.recordset;
};

