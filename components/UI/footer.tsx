import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white py-10 px-4 sm:px-12 text-sm">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Bloc identité / description */}
        <div>
          <h2 className="text-lg font-bold mb-2">I’m Nantais</h2>
          <p>Un média culturel indépendant. Actualités, musique, mode, danse et entrepreneuriat à Nantes et au-delà.</p>
          <p className="mt-2">Édité par la structure I’m Nantais (en cours de création).</p>
        </div>

        {/* Bloc liens légaux */}
        <div>
          <h3 className="font-semibold mb-2">Informations légales</h3>
          <ul className="space-y-1">
            <li><Link href="/conditions-utilisation" className="hover:underline">Conditions d’utilisation</Link></li>
            <li><Link href="/politique-confidentialite" className="hover:underline">Politique de confidentialité</Link></li>
            <li><Link href="/cookies" className="hover:underline">Politique des cookies</Link></li>
            <li><Link href="/suppression-donnees" className="hover:underline">Suppression de données</Link></li>
            <li><Link href="/contact" className="hover:underline">contact</Link></li>
          </ul>
        </div>

        {/* Bloc crédits techniques */}
        <div>
          <h3 className="font-semibold mb-2">Crédits</h3>
          <p>
            Conception & développement : <br />
            <a href="#" target="_blank" rel="noopener noreferrer" className="underline">
              PHNM Ethica Partners
            </a>
          </p>
          {/* <p className="mt-2 italic text-gray-400">Ce site est propulsé par Next.js, WordPress Headless, Vercel & Umami.</p> */}
        </div>
      </div>

      {/* Bas de page */}
      <div className="mt-10 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} I’m Nantais. Tous droits réservés.
      </div>
    </footer>
  );
}
