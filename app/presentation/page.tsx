import Header from '@/components/UI/header';
import Image from 'next/image';

export default function Presentation() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-red-500 to-blue-500 p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header />
      
      {/* Hero Section */}
      <section className="text-center max-w-3xl mt-8">
        <h1 className="text-white text-4xl sm:text-6xl font-bold mb-4">Bienvenue sur notre Présentation</h1>
        <p className="text-white text-lg sm:text-xl mb-6">Découvrez notre projet en vidéo et explorez nos playlists exclusives.</p>
      </section>
      
      {/* Video de Présentation */}
      <div className="w-full max-w-4xl aspect-video mb-10">
        <iframe
          className="w-full h-full rounded-lg shadow-lg"
          src="https://www.youtube.com/embed/TON_VIDEO_ID"
          title="Présentation"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      
      {/* Playlists */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Playlist YouTube */}
        <div>
          <h2 className="text-white text-2xl font-semibold mb-4">Playlist YouTube</h2>
          <div className="grid gap-4">
            <iframe className="w-full aspect-video" src="https://www.youtube.com/embed/VIDEO_ID_1" allowFullScreen></iframe>
            <iframe className="w-full aspect-video" src="https://www.youtube.com/embed/VIDEO_ID_2" allowFullScreen></iframe>
          </div>
        </div>
        
        {/* Playlist Instagram */}
        <div>
          <h2 className="text-white text-2xl font-semibold mb-4">Playlist Instagram</h2>
          <div className="grid gap-4">
            <iframe className="w-full aspect-video" src="https://www.instagram.com/reel/INSTAGRAM_VIDEO_1/embed" allowFullScreen></iframe>
            <iframe className="w-full aspect-video" src="https://www.instagram.com/reel/INSTAGRAM_VIDEO_2/embed" allowFullScreen></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
