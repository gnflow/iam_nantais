// app/api/newsletter/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { email } = await req.json();

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
      from: process.env.ZOHO_USER!,
      to: process.env.ZOHO_USER!, // ou liste de diffusion
      subject: 'Nouvelle inscription à la newsletter',
      text: `Nouvel inscrit : ${email}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur envoi' }, { status: 500 });
  }
}
