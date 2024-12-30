"use server"
import { signIn, signOut } from "@/auth"

export async function serverSignIn(formData:{}){
  await signIn("credentials", formData);
};

export async function serverSignOut(){
    await signOut();
  };
