import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
// import PostgresAdapter from "@auth/pg-adapter"
import type { Provider } from "next-auth/providers"
import { object, string } from "zod";
// import { User } from "./db/lib/pgDb";
// import { Pool } from "pg"
// import bcrypt from "bcryptjs";
// import { db } from '@vercel/postgres';

// import dotenv from "dotenv";
// dotenv.config();

// Create a `Pool` inside the request handler.
// const pool = new Pool({
//   host: process.env.DATABASE_HOST,
//   user: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME,
//   max: 20,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 2000,
// })

type User = {
  id: string; // Ajoutez cet identifiant unique
  name?: string;
  email?: string;
  // password?: string;
  accountType?: string;
  accountStatus?: boolean;
  subscriptionStatus?: boolean;
};

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
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

const providers: Provider[] = [
  Credentials({
    credentials: {
      usernameOrMail: { label: "Username or Email", type: "text" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {

      if (!credentials) return null;

      const parsedCredentials = await signInSchema.safeParse(credentials);

      console.log(`auth.ts :: usernameOrMail and password entrées:\n${JSON.stringify(parsedCredentials)}`);

      if (!parsedCredentials.success) {
        console.log("Invalid credentials format");
        return null;
      }

      let user = null;

      try {
        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/signin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsedCredentials.data),

        });

        user = await response.json();

        console.log(`auth.ts :: retrieveing user from fetch as response.json :\n
        Typeof:${typeof user}\n
        user::\n
        ${JSON.stringify(user)}`);

        if (user.false) {
          console.log(`auth.ts :: error user.false receveive from api/auth/sign\n${user.error}`);
          return null;
        }
        console.log(`auth.ts :: return user ::\n${JSON.stringify(user.user)}`);
        const x: User = user.user

        return x
      } catch (error) {
          // if (error instanceof ZodError) {
          //   // Return `null` to indicate that the credentials are invalid
          //   console.log(`log ZodError:`);
          //   console.error(error);
          //   return null
          // }

        console.error("Auth error:", error)
        return null
      }
    },
  }),
  GitHub,
]

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider()
      return { id: providerData.id, name: providerData.name }
    } else {
      return { id: provider.id, name: provider.name }
    }
  })
  .filter((provider) => provider.id !== "credentials")


// *DO NOT* create a `Pool` here, outside the request handler.
// Neon's Postgres cannot keep a pool alive between requests.

export const { handlers, auth, signIn, signOut } = NextAuth({
  // export const { handlers, auth, signIn, signOut } = NextAuth({
  // Create a `Pool` inside the request handler.
  //Vercel client connect to database
  // const client = await db.connect();
  // await client.sql`SELECT 1`;
  // const pool = new Pool({
  //   host: process.env.DATABASE_HOST,
  //   user: process.env.DATABASE_USER,
  //   password: process.env.DATABASE_PASSWORD,
  //   database: process.env.DATABASE_NAME,
  //   max: 20,
  //   idleTimeoutMillis: 30000,
  //   connectionTimeoutMillis: 2000,
  // })
  // return {
    // adapter: PostgresAdapter(pool),
    providers,
    pages: {
      signIn: "/signin",
    },
    // Logic to protect routes
    // This will prevent users from accessing the dashboard pages unless they are logged
    callbacks: {
      authorized({ auth, request: { nextUrl } }) {
        const isLoggedIn = !!auth?.user
        const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')

        if (isOnDashboard) {
          if (isLoggedIn) return true
          return false
        }

        if (isLoggedIn && nextUrl.pathname === '/signin') {
          return Response.redirect(new URL(`/dashboard/${auth.user.accountType}`, nextUrl))
        }

        return true
      },
      async jwt({ token, user }) {
        if(user){
          token.idToken=user.id
          token.accountType=user.accountType
          token.accountStatus=user.accountStatus
          token.subscriptionStatus=user.subscriptionStatus
        }
       return token
      },
      async session({ session, token }) {
        // session.user = {
        //   id: token.id,
        //   name: token.name,
        //   email: token.email,
        //   accountType: token.accountType, // Transmettre le type de compte à la session
        // };
        return {
          ...session,
          user: {
            ...session.user,
            idToken: token.idToken,
            accountType: token.accountType,
            accountStatus:token.accountStatus,
            subscriptionStatus:token.subscriptionStatus,
          }
        }
        // return session;
      },
      // async redirect({ url, baseUrl }) {
      //   // Rediriger dynamiquement en fonction du type d'utilisateur
      //   if (url === "/dashboard") {
      //     // return `${baseUrl}/dashboard/${token.accountType}`;
      //     return `${baseUrl}/dashboard`;
      //   }
      //   return url.startsWith(baseUrl) ? url : baseUrl;
      // },
    },
    secret: process.env.NEXTAUTH_SECRET,

  // }
})