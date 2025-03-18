"use client"; // Obligatoire pour utiliser des hooks côté client

import { useState } from "react";
import { z } from "zod"; // Importation de Zod pour la validation
import { serverSignIn } from "@/db/lib/actionServer";
// import { useRouter } from 'next/navigation';


export default function SignInForm() {

  const [error, setError] = useState<String | null>(null); // Gestion des messages texte d'erreurs au user.
  const [errors, setErrors] = useState<any>({}); // Gestion des messages d'erreurs à afficher au user.

  const [formData, setFormData] = useState({
    usernameOrMail: "",
    password: "",
  });

  // Prend les infos des inputs du formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validation du formulaire avant la soumission
  // const validateForm = () => {
  //   try {
  //     signinSchema.parse(formData);
  //     return true;
  //   } catch (error) {
  //     if (error instanceof z.ZodError) {
  //       const newErrors: any = {};
  //       error.errors.forEach((err) => {
  //         newErrors[err.path[0]] = err.message;
  //       });
  //       // console.log(newErrors);

  //       setErrors(newErrors);
  //       console.log(`signInForm errors validation fn befor soumission:\n${JSON.stringify(errors)}`);


  //     }
  //     return false;
  //   }
  // };

  const handleSignIn = async () => {
    // e.preventDefault();

    // if (!validateForm()) return; // Si la validation échoue, ne pas soumettre
    console.log(`signIn handleSign formData:\n${JSON.stringify(formData)}`);

    // await serverSignIn(formData); // Old Version

  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center bg-white text-black
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
          className={`w-full py-2 px-4 font-bold rounded bg-blue-500 text-white hover:bg-blue-700
            }`}
        >
          Sign In
        </button>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          
        </div>

        {/* <SignInButton theme={theme} /> */}
        {errors.submit && <p className="text-red-500 text-xs mt-4">{errors.submit}</p>}
      </form>

    </div>
  );
}