// SignInForm
"use client"; // Obligatoire pour utiliser des hooks côté client

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { signIn } from "@/auth"
import { z, object, string } from "zod"; // Importation de Zod pour la validation
import Link from "next/link";
import { serverSignIn } from "@/db/lib/actionServer";
// import { signInSchema } from "@/db/lib/vercelNeon";

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

export default function SignInForm() {
  const [theme, setTheme] = useState<string>("light"); // Gestion du thème clair ou sombre
  const [error, setError] = useState<String | null>(null); // Gestion des messages texte d'erreurs au user.
  const [errors, setErrors] = useState<any>({}); // Gestion des messages d'erreurs à afficher au user.
  const router = useRouter();

  const [formData, setFormData] = useState({
    usernameOrMail: "",
    password: "",
  });

  // Prend les infos des inputs du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // HandleSignin et validation du formulaire avant la soumission

  const handleSignIn = async () => {
    const validateForm = () => {
      try {
        signInSchema.parse(formData);
        return true;
      } catch (error) {
        if (error instanceof z.ZodError) {
          const newErrors: any = {};
          error.errors.forEach((err) => {
            newErrors[err.path[0]] = err.message;
          });
          setErrors(newErrors);
        }
        return false;
      }
    };

    if (!validateForm()) return;

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        alert("Connexion réussie !");
        router.push("/dashboard");
      } else {
        setErrors({ ...errors, submit: result.error });
      }
    } catch (error) {
      setErrors({ ...errors, submit: "Une erreur s'est produite lors de la connexion." });
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center ${theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"
        }`}
    >
      <h1 className="text-4xl font-bold mb-8">Sign In</h1>

      <form action={handleSignIn} className="w-full max-w-md bg-gray-100 p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <label
            className="block text-sm font-bold mb-2 text-black"
            htmlFor="usernameOrMail"
          >
            Username or E-mail
          </label>
          <input
            id="usernameOrMail"
            type="text"
            name="usernameOrMail"
            autoComplete="on"
            minLength={3}
            maxLength={32}
            required
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Username or mail"
            value={formData.usernameOrMail}
            onChange={handleChange}
          />
          {errors.usernameOrMail && <p className="text-red-500 text-xs mt-4 ">{errors.usernameOrMail}</p>}
        </div>

        <div className="mb-6">
          <label
            className="block text-sm font-bold mb-2 text-black"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            autoComplete="on"
            minLength={8}
            maxLength={32}
            required
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          // Check errors type warning
          />
          {errors.password && <p className="text-red-500 text-xs mt-4">{errors.password}</p>}

        </div>

        <button
          type="submit"
          aria-disabled={true}
          className={`w-full py-2 px-4 font-bold rounded bg-blue-500 text-white hover:bg-blue-700`}
        >
          Sign In
        </button>

        <div
          className="flex  items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          <button
            type="button"
            onClick={async () => {
              try {
                await signIn("facebook", { callbackUrl: "/dashboard" });
              } catch (error) {
                console.error("Erreur OAuth:", error); // Ajoutez ce log
                setErrors({ ...errors, submit: "Une erreur s'est produite lors de la connexion OAuth." });
              }
            }}
            className="w-full py-2 px-4 font-bold rounded bg-blue-600 text-white hover:bg-blue-800"
          >
            Sign in with Facebook
          </button>

          <button
            type="button"
            onClick={async () => {
              try {
                await signIn("instagram", { callbackUrl: "/dashboard" });
              } catch (error) {
                console.error("Erreur OAuth:", error); // Ajoutez ce log
                setErrors({ ...errors, submit: "Une erreur s'est produite lors de la connexion OAuth." });
              }
            }}
            className="w-full py-2 px-4 font-bold rounded bg-pink-600 text-white hover:bg-pink-800 mt-2"
          >
            Sign in with Instagram
          </button>

          <button
            type="button"
            onClick={async () => {
              try {
                await signIn("tiktok", { callbackUrl: "/dashboard" });
              } catch (error) {
                console.error("Erreur OAuth:", error); // Ajoutez ce log
                setErrors({ ...errors, submit: "Une erreur s'est produite lors de la connexion OAuth." });
              }
            }}
            className="w-full py-2 px-4 font-bold rounded bg-black text-white hover:bg-gray-800 mt-2"
          >
            Sign in with TikTok
          </button>
        </div>

        {/* <SignInButton theme={theme} /> */}
        {errors.submit && <p className="text-red-500 text-xs mt-4">{errors.submit}</p>}
        <Link href="/" className="text-lg font-light">Retour</Link>
      </form>
    </div>
  );
}