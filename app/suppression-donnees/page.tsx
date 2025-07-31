import Header from '@/components/UI/header';
import Footer from '@/components/UI/footer';
import Image from "next/image";

export default function SuppressionDonneesPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-red-500 to-blue-500 p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <Header />
      <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Suppression de vos données personnelles</h1>
        <p>Vous pouvez demander la suppression des données collectées via le formulaire de contact ou la newsletter.</p>

        <h2 className="mt-4 font-semibold">Comment faire ?</h2>
        <p>Envoyez un message à contact@imnantais.com avec l’adresse email concernée et le type de données.</p>

        <h2 className="mt-4 font-semibold">Délai de traitement</h2>
        <p>Nous traiterons votre demande sous 30 jours maximum.</p>

        <h2 className="mt-4 font-semibold">À savoir</h2>
        <p>- Suppression possible du message de contact ou anonymisation à votre demande.<br />- Suppression du contact newsletter également disponible.</p>
      </main>
      <Footer />
      </div>
    );
  }
  