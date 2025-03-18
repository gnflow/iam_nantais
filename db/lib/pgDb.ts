// db/lib/pgDb.ts
import { Pool } from 'pg'; // Utiliser Pool pour gérer les connexions
import bcrypt from "bcryptjs";
import { object, string } from "zod";

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
  id: string; // Identifiant unique
  name?: string;
  email?: string;
  password?: string;
};

// Configuration de la connexion à la base de données
const config = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: 5433, // Port par défaut de PostgreSQL
  max: 20, // Nombre maximal de connexions dans le pool
  idleTimeoutMillis: 30000, // Temps d'inactivité avant qu'une connexion soit fermée
  connectionTimeoutMillis: 2000, // Temps d'attente pour établir une connexion
};

// Initialiser le pool de connexions
const pool = new Pool(config);

// Fonction pour exécuter des requêtes SQL
export async function queryDatabase(query: string, values?: any[]) {
  const client = await pool.connect(); // Obtenir une connexion du pool

  try {
    console.log("pgDb.ts ::: Connected to PostgreSQL via Pool");

    const result = await client.query(query, values); // Exécuter la requête
    return result.rows;
  } catch (err) {
    console.error("pgDb.ts ::: Error during database query", err);
    throw new Error("Database query failed");
  } finally {
    client.release(); // Libérer la connexion pour qu'elle soit réutilisée
  }
}

// Exporter le pool (optionnel, si vous en avez besoin ailleurs)
export default pool;