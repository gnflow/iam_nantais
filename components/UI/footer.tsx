import Image from "next/image";
export default function Footer(){
    return (
        <footer className="flex gap-6 flex-wrap items-center justify-center mt-10">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/conditions-utilisation"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          CGU
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/politique-confidentialite"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Politique de confidentialité
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/suppression-donnees"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Suppression données →
        </a>
      </footer>
    );
}