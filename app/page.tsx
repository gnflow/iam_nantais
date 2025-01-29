// app/page.js
import Header from '@/components/UI/header';
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-red-500 to-blue-500 p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <main className="flex items-center justify-center flex-grow">
        <Image
          src="/iam_nantais.svg" // Chemin vers le fichier SVG
          alt="I am Nantais"     // Texte alternatif
          width={200}            // Largeur de l'image
          height={200}           // Hauteur de l'image
          priority               // Priorise le chargement de cette image
        />
      </main>
      <div className="flex justify-between w-full mt-10">
        <a
          href="#playlist"
          className="flex items-center justify-center bg-red-500 text-white rounded-lg py-2 px-4 w-full max-w-[150px] text-center"
        >
          <Image src="/play.svg" alt="Play" width={16} height={16} />
          <span className="ml-2">PLAY</span>
        </a>
        <a
          href="#shop"
          className="flex items-center justify-center bg-blue-500 text-white rounded-lg py-2 px-4 w-full max-w-[150px] text-center"
        >
          <Image src="/shop.svg" alt="Shop" width={18} height={18} />

          <span className="ml-2">SHOP</span>
        </a>
      </div>
      <footer className="flex gap-6 flex-wrap items-center justify-center mt-10">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
