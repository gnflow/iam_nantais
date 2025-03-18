// auth.ts
import NextAuth, { DefaultSession } from "next-auth";
import type { NextAuthConfig } from "next-auth";
import type { JWT } from "next-auth/jwt";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import InstagramProvider from "next-auth/providers/instagram";
import TikTokProvider from "next-auth/providers/tiktok";
import CredentialsProvider from "next-auth/providers/credentials";
import { object, string } from "zod";

// 🔹 Définition d'un type utilisateur étendu pour la session
type ExtendedUser = {
  id: string;
  name?: string;
  email?: string;
  accountType?: string;
  accountStatus?: boolean;
  subscriptionStatus?: boolean;
};

// 🔹 Extension des types de NextAuth pour inclure nos champs personnalisés
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: ExtendedUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accountType?: string;
    accountStatus?: boolean;
    subscriptionStatus?: boolean;
  }
}

// 🔹 Schéma de validation avec Zod
const signInSchema = object({
  usernameOrMail: string()
    .min(3, "Username or Email is required")
    .refine(
      (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /^[a-zA-Z0-9_.-]+$/.test(value),
      { message: "Must be a valid email or username" }
    ),
  password: string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

// 🔹 Configuration des providers d'authentification
const providers = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      usernameOrMail: { label: "Username or Email", type: "text" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials) return null;

      const parsedCredentials = signInSchema.safeParse(credentials);
      if (!parsedCredentials.success) {
        console.error("Validation error:", parsedCredentials.error);
        return null;
      }

      try {
        const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/signin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsedCredentials.data),
        });

        if (!response.ok) {
          console.error("Authentication failed");
          return null;
        }

        const result = await response.json();
        if (!result.success || !result.user) {
          console.error("Invalid user response:", result);
          return null;
        }

        return {
          id: result.user.id ?? "",
          name: result.user.name,
          email: result.user.email,
        };
      } catch (error) {
        console.error("Auth error:", error);
        return null;
      }
    },
  }),
  GitHubProvider({
    clientId: process.env.GITHUB_CLIENT_ID!,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  }),
  FacebookProvider({
    clientId: process.env.FACEBOOK_CLIENT_ID!,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
  }),
  InstagramProvider({
    clientId: process.env.INSTAGRAM_CLIENT_ID!,
    clientSecret: process.env.INSTAGRAM_CLIENT_SECRET!,
  }),
  TikTokProvider({
    clientId: process.env.TIKTOK_CLIENT_ID!,
    clientSecret: process.env.TIKTOK_CLIENT_SECRET!,
  }),
];

// 🔹 Configuration NextAuth
const authConfig: NextAuthConfig = {
  providers,
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Vérifier si l'utilisateur existe déjà
      if (account?.provider !== "credentials") {
        // Vérifier que user.email est défini
        if (!user.email) {
          console.error("Erreur : l'email de l'utilisateur est non défini.");
          return false;
        }

        // Vérifier si l'utilisateur existe déjà
        const checkUserResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/check-user`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: user.email }),
        });

        const checkUserResult = await checkUserResponse.json();

        if (checkUserResult.success && checkUserResult.user) {
          // L'utilisateur existe déjà
          return true;
        } else {
          // L'utilisateur n'existe pas, créer un nouvel utilisateur via l'API
          const createUserResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/create-user`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: user.name || user.email.split("@")[0],
              mail: user.email,
              password: null, // Pas de mot de passe pour les utilisateurs tiers
            }),
          });

          const createUserResult = await createUserResponse.json();
          if (createUserResult.success) {
            return true;
          } else {
            console.error("Erreur lors de la création de l'utilisateur:", createUserResult.error);
            return false;
          }
        }
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id ?? "";
        token.accountType = user.accountType;
        token.accountStatus = user.accountStatus;
        token.subscriptionStatus = user.subscriptionStatus;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id ?? "",
          accountType: token.accountType,
          accountStatus: token.accountStatus,
          subscriptionStatus: token.subscriptionStatus,
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);