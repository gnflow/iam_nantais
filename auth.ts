// NextAuth
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import InstagramProvider from "next-auth/providers/instagram";
import Credentials from "next-auth/providers/credentials";
import type { Provider } from "next-auth/providers";
import { object, string } from "zod";

const API_URL = process.env.NEXTAUTH_URL;

export const signInSchema = object({
  usernameOrMail: string()
    .min(3, "Username or Email is required")
    .refine(
      (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /^[a-zA-Z0-9_.-]+$/.test(value),
      {
        message: "Must be a valid email or username",
      }
    ),
  password: string().min(8, "Password must be more than 8 characters").max(32, "Password must be less than 32 characters"),
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
      if (!parsedCredentials.success) return null;

      try {
        const response = await fetch(`${API_URL}/api/auth/signin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsedCredentials.data),
        });

        const user = await response.json();
        if (!user.success || !user.user) return null;

        return user.user;
      } catch (error) {
        console.error("Auth error:", error);
        return null;
      }
    },
  }),
  GitHub,
  FacebookProvider({
    clientId: process.env.FACEBOOK_CLIENT_ID!,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
  }),
  InstagramProvider({
    clientId: process.env.INSTAGRAM_CLIENT_ID!,
    clientSecret: process.env.INSTAGRAM_CLIENT_SECRET!,
  }),
];

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.idToken = user.id;
        token.accountType = user.accountType;
        token.accountStatus = user.accountStatus;
        token.subscriptionStatus = user.subscriptionStatus;
      }

      if (account && user) {
        try {
          const res = await fetch(`${API_URL}/api/auth/check-user`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: user.email }),
          });
          const data = await res.json();

          if (!data.exists) {
            await fetch(`${API_URL}/api/auth/signup`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: user.email,
                name: user.name,
                provider: account.provider,
              }),
            });
          }
        } catch (error) {
          console.error("User registration error:", error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          idToken: token.idToken,
          accountType: token.accountType,
          accountStatus: token.accountStatus,
          subscriptionStatus: token.subscriptionStatus,
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    } else {
      return { id: provider.id, name: provider.name };
    }
  })
  .filter((provider) => provider.id !== "credentials");
