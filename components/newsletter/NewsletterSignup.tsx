// app/components/NewsletterSignup.tsx
'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useRef, useState } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

const schema = z.object({
  email: z.string().email('Email invalide'),
});

type FormData = z.infer<typeof schema>;

export default function NewsletterSignup() {
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

    const res = await fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ ...data, hcaptchaToken: token }),
    });

    if (res.ok) {
      toast.success("Inscription réussie !");
      reset();
    } else {
      toast.error("Erreur d'inscription.");
    }

    setToken(null);
    captchaRef.current?.resetCaptcha();
  };

  return (
    <section className="p-6 bg-gray-100 rounded-lg text-black shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Inscription à la newsletter</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">Email</label>
          <input {...register('email')} className="w-full p-2 border rounded" placeholder="votre@email.com" />
          {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
        </div>

        <HCaptcha
          sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY!}
          onVerify={(token) => setToken(token)}
          ref={captchaRef}
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          S'inscrire
        </button>
      </form>
    </section>
  );
}

