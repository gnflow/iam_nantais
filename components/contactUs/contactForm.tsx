// app/components/ContactForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import HCaptcha from '@hcaptcha/react-hcaptcha';

const schema = z.object({
  name: z.string().min(2, 'Nom requis'),
  email: z.string().email('Email invalide'),
  partner: z.string().min(1, 'Sélectionnez un partenaire'),
  message: z.string().min(10, 'Message trop court'),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [token, setToken] = useState<string | null>(null);
  const captchaRef = useRef<HCaptcha>(null);

  const onSubmit = async (data: FormData) => {
    if (!token) {
      toast.error("Veuillez valider le captcha.");
      captchaRef.current?.execute();
      return;
    }

    const res = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify({ ...data, hcaptchaToken: token }),
    });

    if (res.ok) {
      toast.success("Message envoyé !");
      reset();
    } else {
      toast.error("Erreur lors de l'envoi.");
    }

    setToken(null);
    captchaRef.current?.resetCaptcha();
  };

  return (
    <section className="p-6 m-4 bg-white rounded-lg text-black shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Contactez nous</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">Nom</label>
          <input {...register('name')} className="w-full p-2 border rounded" />
          {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input type="email" {...register('email')} className="w-full p-2 border rounded" />
          {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block font-medium">Destinataire</label>
          <select {...register('partner')} className="w-full p-2 border rounded">
            <option value="">Choisissez le destinataire</option>
            <option value="support">Support</option>
            <option value="commercial">Commercial</option>
            <option value="autre">Autre</option>
          </select>
          {errors.partner && <p className="text-sm text-red-600">{errors.partner.message}</p>}
        </div>
        <div>
          <label className="block font-medium">Message</label>
          <textarea rows={4} {...register('message')} className="w-full p-2 border rounded" />
          {errors.message && <p className="text-sm text-red-600">{errors.message.message}</p>}
        </div>

        <HCaptcha
          sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
          onVerify={(token) => setToken(token)}
          ref={captchaRef}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Envoyer
        </button>
      </form>
    </section>
  );
}
