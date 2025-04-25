// /app/api/auth/check-user/route.tsx
import { NextRequest, NextResponse } from "next/server";
import { queryDtbs } from "@/db/lib/vercelNeon";
import { z } from "zod";

// Schéma de validation pour éviter toute donnée incorrecte
const checkUserSchema = z.object({
  username: z.string().min(3, "Le pseudo doit contenir au moins 3 caractères.").optional(),
  mail: z.string().email("Email invalide").optional(),
}).refine((data) => data.username || data.mail, {
  message: "Un pseudo ou un email est requis.",
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = checkUserSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.errors }, { status: 400 });
    }

    const { username, mail } = parsed.data;

    // Vérifier si l'utilisateur existe par email ou username
    const result = await queryDtbs(
      `SELECT id FROM iam_nantais.users WHERE mail = $1 OR username = $2 LIMIT 1`,
      [mail || "", username || ""]
    );

    if (result.length > 0) {
      return NextResponse.json({ success: true, exists: true });
    } else {
      return NextResponse.json({ success: true, exists: false });
    }

  } catch (error) {
    console.error("Erreur check-user:", error);
    return NextResponse.json({ success: false, error: "Erreur serveur." }, { status: 500 });
  }
}
