// app/api/contact/route.tsx
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

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

  const res = await fetch("https://hcaptcha.com/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `response=${hcaptchaToken}&secret=${process.env.HCAPTCHA_SECRET}`
  });
  const result = await res.json();
  console.log("Captcha verification result:", result);

  if (!result.success) {
    return new Response("Captcha invalide", { status: 400 });
  }

  const partnerEmails: Record<string, string> = {
    support: "iamnantais@proton.me",
    commercial: "colonelsorder@gmail.com",
    autre: "contact@phnmethicapartners.agency",
  };

  const to = partnerEmails[partner] || "ngobungi@icloud.com";

  // continue: envoi mail ou sauvegard

  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.eu",
    port: 465,
    secure: true,
    logger: true,
    debug: true,

    auth: {
      user: process.env.ZOHO_USER!,
      pass: process.env.ZOHO_PASS!,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.ZOHO_USER}>`,
      replyTo: email,
      to: to, // à adapter selon le partenaire
      subject: `Message pour ${partner}`,
      text: message,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Erreur Nodemailer:", error);
    return NextResponse.json({ error: "Erreur envoi" }, { status: 500 });
  }
}
