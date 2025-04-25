// /app/api/auth/signup/route.tsx
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { queryDtbs } from "@/db/lib/vercelNeon";
import { z } from "zod";

const userSchema = z.object({
  username: z.string().min(3, "Le pseudo doit contenir au moins 3 caractères."),
  mail: z.string().email("Email invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères."),
});

export async function POST(request: NextRequest) {
  try {
    const { username, mail, password } = userSchema.parse(await request.json());

    const existingUser = await queryDtbs(
      `SELECT * FROM iam_nantais.users WHERE mail = $1 OR username = $2 LIMIT 1`,
      [mail, username]
    );

    if (existingUser.length > 0) {
      return NextResponse.json({ success: false, error: "Utilisateur déjà existant." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await queryDtbs(
      `INSERT INTO iam_nantais.users (username, mail, password) VALUES ($1, $2, $3) RETURNING id;`,
      [username, mail, hashedPassword]
    );

    return NextResponse.json({ success: true, userId: result[0].id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Erreur serveur." }, { status: 500 });
  }
}
