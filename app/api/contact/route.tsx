// app/api/contact/route.tsx
import { sendContactEmail } from "@/db/lib/email";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { hcaptchaToken, name, email, partner, message } = await req.json();
  console.log({
    HCAPTCHA_SECRET: process.env.HCAPTCHA_SECRET,
    ZOHO_USER: process.env.ZOHO_USER,
  });
  console.log("ZOHO_PASS:", process.env.ZOHO_PASS ? "✅ loaded" : "❌ missing");

  console.log({
    hcaptchaToken: hcaptchaToken,
    name: name,
    email: email,
    partner: partner,
    message: message,
  });

  // Vérifier captcha...
  const res = await fetch("https://hcaptcha.com/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `response=${hcaptchaToken}&secret=${process.env.HCAPTCHA_SECRET}`,
  });
  console.log("Captcha verification result:", res);
  const result = await res.json();
  if (!result.success) {
    return new Response("Captcha invalide", { status: 400 });
  }

  try {
    await sendContactEmail({ name, email, partner, message });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur envoi email:", error);
    return NextResponse.json({ error: "Erreur envoi" }, { status: 500 });
  }
}
