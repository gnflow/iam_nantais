// /app/api/auth/signin/route.ts
import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres'; // Connexion à la base de données
import { queryDatabase, signInSchema } from "@/db/lib/pgDb";

import { z } from 'zod';
import bcrypt from 'bcryptjs';
// import bcrypt from 'bcryptjs';

// Schéma de validation pour les données de connexion
// const signinSchema = z.object({
//   usernameOrMail: z.string().min(3, 'Le pseudo ou email est requis'),
//   password: z.string().min(8, 'Le mot de passe doit être d\'au moins 8 caractères'),
// });


export async function POST(request: Request) {

   // Parse and validate request body
   const body = await request.json();
   console.log(`api/auth/sign zod parsing verification`);
   
  const parsed = signInSchema.safeParse(body);

  // Si la validation zod ne passe pas on retourne les erreurs ici
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.errors.map(e => e.message) },
      { status: 400 }
    );
  }

  console.log(`api/auth/sign zod parsing succeed`);


  const { usernameOrMail, password } = parsed.data;

  try {
    const user = await queryDatabase(
      `SELECT * FROM users WHERE mail = $1 OR username = $1 LIMIT 1`,
      [usernameOrMail]
    );

    if (!user || user.length === 0) {
      return NextResponse.json({ success: false, error: `Utilisateur non trouvé.` }, { status: 404 });
    }

    const userData = user[0];
    const isPasswordValid = await bcrypt.compare(password, userData.password);

    if (!isPasswordValid) {
      return NextResponse.json({ success: false, error:  `Mot de passe inccorect.` }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: userData.id,
        name: userData.username,
        email: userData.mail,
        accountType: userData.account_type,
        accountStatus: userData.account_status,
        subscriptionStatus: userData.subscription_status
      },
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, error: `Une erreur inconnue est survenue check log erreur.\n ${error}` },
      { status: 500 }
    );
  }
}
