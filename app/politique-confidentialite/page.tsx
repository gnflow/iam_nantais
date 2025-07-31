import Header from '@/components/UI/header';
import Footer from '@/components/UI/footer';
import Image from "next/image";

export default function PolitiqueConfidentialite() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-red-500 to-blue-500 p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">Politique de Confidentialité</h1>

                <h2 className="mt-4 font-semibold">Responsable du traitement</h2>
                <p>I’m Nantais (structure en cours de création), contact@imnantais.com</p>

                <h2 className="mt-4 font-semibold">Quelles données collectons-nous ?</h2>
                <p>- Informations transmises via le formulaire de contact (nom, email, message)<br />
                    - Adresse email lors de l’inscription à la newsletter</p>

                <h2 className="mt-4 font-semibold">Pourquoi collectons-nous ces données ?</h2>
                <p>- Répondre à vos messages<br />
                    - Vous envoyer des actualités et informations via la newsletter</p>

                <h2 className="mt-4 font-semibold">Durée de conservation</h2>
                <p>Les données sont conservées pendant une durée maximale de 3 ans à compter du dernier contact.</p>

                <h2 className="mt-4 font-semibold">Destinataires des données</h2>
                <p>Les données peuvent être partagées avec nos sous-traitants techniques :
                    hébergeur (Vercel), outil d’emailing, Big Cartel pour la boutique.</p>

                <h2 className="mt-4 font-semibold">Vos droits</h2>
                <p>Vous disposez d’un droit d’accès, de rectification, de suppression et d’opposition. Pour exercer vos droits :  contact@imnantais.com</p>

                <h2 className="mt-4 font-semibold">Cookies</h2>
                <p>Des cookies peuvent être déposés pour mesurer l’audience ou améliorer la navigation. Vous pouvez gérer vos préférences depuis votre navigateur.</p>

                <h2 className="mt-4 font-semibold">Contact</h2>
                <p>Pour toute question RGPD ou vie privée : contact@imnantais.com</p>
            </main>
            <Footer />
        </div>
    );
}
