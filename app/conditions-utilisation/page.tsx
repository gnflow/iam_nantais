import Header from '@/components/UI/header';
import Footer from '@/components/UI/footer';
import Image from "next/image";

export default function ConditionsUtilisation() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-red-500 to-blue-500 p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <Header />
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-4">Conditions Générales d'Utilisation</h1>

                <p><strong>Éditeur du site</strong><br />
                    Ce site est édité par <em>[Nom du projet ou société]</em>,<br />
                    Email de contact : contact@votresite.com</p>

                <h2 className="mt-4 font-semibold">Objet</h2>
                <p>Les présentes conditions générales d'utilisation (CGU) ont pour objet de définir les modalités d'accès et d'utilisation du site [nom du site]. En accédant au site, vous acceptez sans réserve ces conditions.</p>

                <h2 className="mt-4 font-semibold">Accès au site</h2>
                <p>Le site est accessible gratuitement, hors coûts d'accès à internet.</p>

                <h2 className="mt-4 font-semibold">Contenus et propriété intellectuelle</h2>
                <p>Tous les contenus présents sur le site (textes, images, vidéos, graphismes) sont protégés par le droit d’auteur. Toute reproduction ou représentation sans autorisation est interdite.</p>

                <h2 className="mt-4 font-semibold">Responsabilités</h2>
                <p>Le site peut contenir des liens vers d’autres sites. L’éditeur décline toute responsabilité quant aux contenus ou services proposés sur ces sites tiers.</p>

                <h2 className="mt-4 font-semibold">Modifications</h2>
                <p>L’éditeur se réserve le droit de modifier ces conditions à tout moment. Les modifications prennent effet dès leur mise en ligne.</p>

                <h2 className="mt-4 font-semibold">Loi applicable</h2>
                <p>Les présentes conditions sont soumises à la loi française.</p>
            </main>
            <Footer />
        </div>
    );
}
