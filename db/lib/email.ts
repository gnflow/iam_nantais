// lib/email.ts
import nodemailer from "nodemailer";

type MailOptions = {
  name: string;
  email: string;
  partner: string;
  message: string;
};

export async function sendContactEmail({ name, email, partner, message }: MailOptions) {
  const partnerEmails: Record<string, string> = {
    support: "iamnantais@proton.me",
    commercial: "kns.mb@icloud.com",
    autre: "contact@phnmethicapartners.agency",
  };

  const to = partnerEmails[partner] || "contact@phnmethicapartners.agency";

  // Choix du transporteur selon EMAIL_PROVIDER
  let transporter;

  if (process.env.EMAIL_PROVIDER === "zoho") {
    transporter = nodemailer.createTransport({
      host: "smtp.zoho.eu",
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZOHO_USER!,
        pass: process.env.ZOHO_PASS!,
      },
      logger: true,
      debug: true,
    });
  } else if (process.env.EMAIL_PROVIDER === "gmail") {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER!,
        pass: process.env.GMAIL_PASS!,
      },
    });
  } else {
    throw new Error("EMAIL_PROVIDER must be 'zoho' or 'gmail'");
  }

  // Envoi du mail
  await transporter.sendMail({
    from: `"${name}" <${process.env.ZOHO_USER || process.env.GMAIL_USER}>`,
    replyTo: email,
    to,
    subject: `Message pour ${partner}`,
    text: message,
  });
}
