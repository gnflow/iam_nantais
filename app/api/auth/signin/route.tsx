// /app/api/auth/signin/route.tsx
import { NextResponse } from "next/server";
import { queryDtbs, signInSchema } from "@/db/lib/vercelNeon";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    // 🔹 Récupération et validation du body
    const body = await request.json();
    console.log("🔍 api/auth/signin - Vérification des données avec Zod");

    const parsed = signInSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: parsed.error.errors.map((e) => e.message) },
        { status: 400 }
      );
    }

    console.log("✅ api/auth/signin - Validation des données réussie");

    const { usernameOrMail, password } = parsed.data;

    // 🔹 Vérification si l'utilisateur existe
    const user = await queryDtbs(
      `SELECT id, username, mail, password FROM iam_nantais.users WHERE mail = $1 OR username = $1 LIMIT 1`,
      [usernameOrMail]
    );

    if (!user || user.length === 0) {
      console.warn("⚠️ api/auth/signin - Utilisateur non trouvé");
      return NextResponse.json(
        { success: false, error: "Utilisateur non trouvé." },
        { status: 404 }
      );
    }

    const userData = user[0];

    // Vérification que password et userData.password sont bien des chaînes
    if (!password || typeof password !== "string") {
      console.warn("⚠️ api/auth/signin - Mot de passe fourni invalide");
      return NextResponse.json(
        { success: false, error: "Mot de passe invalide." },
        { status: 400 }
      );
    }

    if (!userData.password || typeof userData.password !== "string") {
      console.warn("⚠️ api/auth/signin - Aucun mot de passe stocké pour cet utilisateur");
      return NextResponse.json(
        { success: false, error: "Mot de passe non défini." },
        { status: 401 }
      );
    }

    // 🔹 Vérification du mot de passe avec bcrypt
    const isPasswordValid = await bcrypt.compare(password, userData.password);


    console.log("✅ api/auth/signin - Connexion réussie pour l'utilisateur:", userData.username);

    return NextResponse.json({
      success: true,
      user: {
        id: userData.id,
        name: userData.username,
        email: userData.mail,
      },
    });

  } catch (error) {
    console.error("❌ api/auth/signin - Erreur serveur:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

