// db/lib/vercelNeon.tsx
import { neonConfig, Pool } from '@neondatabase/serverless';
import bcrypt from "bcryptjs";
import { object, string } from "zod";

// Active le fetch Web pour Neon (obligatoire en environnement edge/serverless)
// Finalement config par défaut dans @neondatabase/serverless est déjà à true donc suppr
// neonConfig.fetchConnectionCache = true;

// Schéma de validation avec Zod
export const signInSchema = object({
  usernameOrMail: string({ required_error: "Username or Email is required" })
    .min(3, "Username or Email is required")
    .refine(
      (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /^[a-zA-Z0-9_.-]+$/.test(value),
      {
        message: "Must be a valid email or username",
      }
    ),
  password: string({ required_error: "Password is required" })
    .min(8, "Password must be min 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

// Type utilisateur
export type User = {
  id: string;
  name?: string;
  email?: string;
  password?: string;
};

// Création du pool avec l'URL Neon
const pool = new Pool({ connectionString: process.env.DATABASE_URL_NEON! });

// Fonction pour exécuter des requêtes SQL
export async function queryDtbs(query: string, values?: any[]) {
  const client = await pool.connect();

  try {
    console.log("vercelNeon.ts ::: Connected to Neon via neonPool");

    const result = await client.query(query, values);
    return result.rows;
  } catch (err) {
    console.error("vercelNeon.ts ::: Error during database query", err);
    throw new Error("Database query failed");
  } finally {
    client.release();
  }
}
