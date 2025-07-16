import Header from '@/components/UI/header';
import Footer from '@/components/UI/footer';

export default function CookiesPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-red-500 to-blue-500 p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Politique relative aux cookies</h1>

        <p>
          Ce site utilise des cookies afin d’améliorer votre expérience de navigation et de mesurer l’audience.
        </p>

        <h2 className="mt-4 font-semibold">Qu’est-ce qu’un cookie ?</h2>
        <p>
          Un cookie est un petit fichier texte stocké sur votre terminal lors de votre visite sur un site. Il contient des informations relatives à votre navigation.
        </p>

        <h2 className="mt-4 font-semibold">Cookies utilisés sur ce site</h2>
        <ul className="list-disc list-inside">
          <li>Cookies de fonctionnement : nécessaires au bon affichage et à la sécurité du site.</li>
          <li>Cookies de mesure d’audience : utilisés pour suivre les statistiques de fréquentation via Google Analytics (ou outil alternatif).</li>
        </ul>

        <h2 className="mt-4 font-semibold">Gestion des cookies</h2>
        <p>
          Vous pouvez gérer ou désactiver les cookies via les paramètres de votre navigateur ou via notre bandeau de gestion du consentement (si intégré).
        </p>

        <h2 className="mt-4 font-semibold">Contact</h2>
        <p>
          Pour toute question concernant les cookies : contact@votresite.com
        </p>
      </main>
      <Footer />
    </div>
  );
}
