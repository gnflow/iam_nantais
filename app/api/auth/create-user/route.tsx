// /app/api/auth/create-user/route.tsx
import { NextResponse } from "next/server";
import { queryDatabase } from "@/db/lib/pgDb";

export async function POST(request: Request) {
  try {
    const { username, mail } = await request.json();

    // Créer un nouvel utilisateur
    const result = await queryDatabase(
      `INSERT INTO users (username, mail, password) VALUES ($1, $2, $3) RETURNING id, username, mail;`,
      [username, mail, null] // Pas de mot de passe pour les utilisateurs tiers
    );

    if (result && result.length > 0) {
      return NextResponse.json({ success: true, user: result[0] });
    } else {
      return NextResponse.json({ success: false, error: "Erreur lors de la création de l'utilisateur." });
    }
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}