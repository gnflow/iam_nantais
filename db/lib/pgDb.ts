// db.ts
import { Pool } from 'pg';
import bcrypt from "bcryptjs"
// import bcrypt from "bcryptjs"
import { object, string } from "zod"
import { sql } from '@vercel/postgres';

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

export type User = {
  id: string; // Ajoutez cet identifiant unique
  name?: string;
  email?: string;
  password?: string;
  accountType?: string;
  accountStatus?: boolean;
  souscriptionStatus?: boolean;
};

// Initialize the pool with connection configuration
const config = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: 5432, // PostgreSQL default port
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
}
// Ensure `pool` is initialized correctly
let pool: Pool | null = null;

// then i turn into Get user by id
export async function getUser(usernameOrMail: string): Promise<User | null> {
  try {
    // const user = await sql`SELECT * FROM users WHERE mail = ${usernameOrMail} OR username = ${usernameOrMail} LIMIT 1`;
    const user = await queryDatabase(`SELECT * FROM users WHERE mail = $1 OR username = $1 LIMIT 1`,[usernameOrMail]);
    if (!user || user.length === 0) {
      console.log("pgDb.ts ::: User not found");
      return null;
    }
    return <User>{
      id: user[0].id,
      name: user[0].username,
      email: user[0].email,
      accountType: user[0].account_type,
      accountStatus: user[0].account_status,
      souscriptionStatus: user[0].souscription_status,
    };
    // version sql vercel
    // return <User>{
    //   id: user.rows[0].id,
    //   name: user.rows[0].username,
    //   email: user.rows[0].email,
    //   typeAccount: user.rows[0].typeAccount,
    //   accountStatus: user.rows[0].account_status,
    //   souscriptionStatus: user.rows[0].souscription_status,
    // };
  } catch (error) {
    console.error('pgDb.ts ::: Failed to fetch user:', error);
    throw new Error('pgDb.ts ::: Failed to fetch user.');
  }
}

export async function validateUserCredentials(usernameOrMail: string, password: string): Promise<User | null> {
  try {
    // const user = await sql
    //   `SELECT * FROM users WHERE mail = ${usernameOrMail} OR username = ${usernameOrMail} LIMIT 1`
    //   ;
    const user = await queryDatabase(`SELECT * FROM users WHERE mail = $1 OR username = $1 LIMIT 1`,[usernameOrMail]);

    // if (!user || user.rows.length === 0) { // vercel version 
    if (!user || user.length === 0) {
      console.log("pgDb.ts ::: User not found");
      return null;
      // throw new Error('Utilisateur non trouvé'); //devient code inateignable 
    }
    console.log("pgDb.ts ::: User info found then pasword checking");

    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
      console.log("pgDb.ts ::: Mot de passe incorrect");
      return null;
      // throw new Error('Mot de passe incorrect');
    }

    console.log("pgDb.ts ::: Granted pasword checking ok");

    return <User>{
        id: user[0].id,
        name: user[0].username,
        email: user[0].email,
        accountType: user[0].account_type,
        accountStatus: user[0].account_status,
        souscriptionStatus: user[0].souscription_status,
      }; 
    // return <User>{
    //   id: user.rows[0].id,
    //   name: user.rows[0].username,
    //   email: user.rows[0].email,
    //   typeAccount: user.rows[0].typeAccount,
    //   accountStatus: user.rows[0].account_status,
    //   souscriptionStatus: user.rows[0].souscription_status,
    // }; // Return user data excluding sensitive fields
  } catch (error) {
    console.error('pgDb.ts ::: Failed to fetch user:', error);
    throw new Error('pgDb.ts ::: Failed to fetch user.');
  }
}

// PG Query Database
// Query Database Function
export async function queryDatabase(query: string, values?: any[]) {
  if (!pool) {
    pool = new Pool(config); // Initialize pool only once
  }

  const client = await pool.connect();
  console.log(`pgDb.ts ::: pool connection via - PG | Log admin to postgres container`);

  try {
    const result = await client.query(query, values);
    return result.rows;
  } catch (err) {
    console.error("pgDb.ts ::: Error during database query", err);
    throw new Error("Database query failed");
  } finally {
    client.release();
  }
}


export default pool; // peut etre le rajouter ds l'adapter auth.ts
