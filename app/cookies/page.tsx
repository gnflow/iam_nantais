import Header from '@/components/UI/header';
import Footer from '@/components/UI/footer';

export default function CookiesPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-red-500 to-blue-500 p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="container mx-auto px-4 py-8">
      <p>Ce site peut utiliser des cookies pour améliorer l’expérience utilisateur ou mesurer l’audience.</p>

<h2 className="mt-4 font-semibold">Qu’est-ce qu’un cookie ?</h2>
<p>Un cookie est un petit fichier stocké sur votre appareil contenant des informations de navigation.</p>

<h2 className="mt-4 font-semibold">Cookies utilisés</h2>
<ul className="list-disc list-inside">
  <li>Cookies essentiels : sécurité et fonctionnement du site.</li>
  <li>Cookies d’audience : Umami ou autre outil analytics.</li>
</ul>

<h2 className="mt-4 font-semibold">Gestion des cookies</h2>
<p>Vous pouvez gérer ou désactiver les cookies via votre navigateur ou via notre bandeau de gestion du consentement.</p>

<h2 className="mt-4 font-semibold">Contact</h2>
<p>Pour questions sur les cookies : contact@imnantais.com</p>
      </main>
      <Footer />
    </div>
  );
}
