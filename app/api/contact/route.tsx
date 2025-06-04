// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { name, email, partner, message } = await req.json();

  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZOHO_USER!,
      pass: process.env.ZOHO_PASS!,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: 'contact@votresite.com', // à adapter selon le partenaire
      subject: `Message pour ${partner}`,
      text: message,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur envoi' }, { status: 500 });
  }
}
