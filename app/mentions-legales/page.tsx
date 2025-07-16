import Header from '@/components/UI/header';
import Footer from '@/components/UI/footer';

export default function MentionsLegales() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-red-500 to-blue-500 p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Mentions Légales</h1>

        <h2 className="mt-4 font-semibold">Éditeur du site</h2>
        <p>
          Ce site est édité par <em>[Nom du projet ou de l’association]</em>,<br />
          Siège social : [Adresse complète]<br />
          Email : contact@votresite.com
        </p>

        <h2 className="mt-4 font-semibold">Responsable de la publication</h2>
        <p>[Nom du responsable / fondateur]</p>

        <h2 className="mt-4 font-semibold">Hébergement</h2>
        <p>
          Le site est hébergé par :<br />
          Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA<br />
          Site : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="underline text-blue-100">vercel.com</a>
        </p>

        <h2 className="mt-4 font-semibold">Propriété intellectuelle</h2>
        <p>
          Tous les contenus (textes, images, vidéos) présents sur ce site sont protégés par le droit d’auteur. Toute reproduction est interdite sans autorisation préalable.
        </p>

        <h2 className="mt-4 font-semibold">Contact</h2>
        <p>Pour toute question : contact@votresite.com</p>
      </main>
      <Footer />
    </div>
  );
}
