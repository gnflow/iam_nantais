import Footer from '@/components/UI/footer';
import Header from '@/components/UI/header';
import Image from 'next/image';

export default function Presentation() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-red-500 to-blue-500 p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header />
      
      {/* Hero Section */}
      <section className="text-center max-w-3xl mt-8">
        <h1 className="text-white text-4xl sm:text-6xl font-bold mb-4">Bienvenue!</h1>
        <p className="text-white text-lg sm:text-xl mb-6">Découvrez notre projet en vidéo.</p>
      </section>
      
      {/* Video de Présentation */}
      <div className="w-full max-w-4xl aspect-video mb-10">
        <iframe
          className="w-full h-full rounded-lg shadow-lg"
          src="https://www.youtube.com/embed/1kzfLmrcEJo?si=64qTdG5DqQ6RjzDD"
          title="Présentation"
          // frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      <Footer />
    </div>
  );
}
