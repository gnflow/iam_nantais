import Header from '@/components/UI/header';
import Image from 'next/image';
import YouTubePlaylistNetflix from '@/components/UI/rs/ytbPlaylistNetflix'
import InstagramPlaylistScroll from '@/components/UI/rs/ntgPlaylistNetflix'
export default function Presentation() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-red-500 to-blue-500 p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header />
      
      {/* Hero Section */}
      <section className="text-center max-w-3xl mt-8">
        <h1 className="text-white text-4xl sm:text-6xl font-bold mb-4">Notre Emission</h1>
        <p className="text-white text-lg sm:text-xl mb-6">Découvrez notre projet en vidéo et explorez nos playlists exclusives.</p>
      </section>
      
      
      {/* Playlists */}

      
      <YouTubePlaylistNetflix/>
      <InstagramPlaylistScroll/>
      
   
    </div>
  );
}
