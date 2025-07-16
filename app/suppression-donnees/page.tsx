import Header from '@/components/UI/header';
import Footer from '@/components/UI/footer';
import Image from "next/image";

export default function SuppressionDonneesPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-red-500 to-blue-500 p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Suppression de vos données personnelles</h1>
  
        <p>Vous pouvez demander la suppression de vos données collectées via le formulaire de contact ou l’inscription à la newsletter.</p>
  
        <h2 className="mt-4 font-semibold">Comment faire ?</h2>
        <p>Envoyez simplement une demande à : contact@votresite.com<br />
        Indiquez l’adresse email que vous souhaitez supprimer et le type de données concernées.</p>
  
        <h2 className="mt-4 font-semibold">Délais de traitement</h2>
        <p>Nous traiterons votre demande dans un délai maximum de 30 jours.</p>
  
        <h2 className="mt-4 font-semibold">Pour rappel</h2>
        <p>- La suppression peut concerner votre email enregistré pour la newsletter.<br />
        - Les messages envoyés via le formulaire de contact peuvent être supprimés ou anonymisés.</p>
      </main>
      <Footer />
      </div>
    );
  }
  