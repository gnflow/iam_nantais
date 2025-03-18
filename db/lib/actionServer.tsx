"use server"
import { signIn, signOut } from "@/auth"

export async function serverSignIn(provider: string, formData: {}) {
  await signIn(provider, formData);
};

export async function serverSignOut(){
  await signOut();
};
