"use client"
import Header from '@/components/UI/header';
import Image from 'next/image';
import { useState } from 'react';
import { Card, CardContent } from "@/components/UI/card";
import { Button } from "@/components/UI/button";
import { FaInstagram, FaYoutube, FaGlobe, FaTwitter } from "react-icons/fa";

const categories = [
  { name: "Musique", key: "musique" },
  { name: "Danse", key: "danse" },
  { name: "Peinture", key: "peinture" },
  { name: "Design", key: "design" },
  { name: "Entrepreneuriat", key: "entrepreneuriat" }
];

type ArtistLink = {
  site?: string;
  instagram?: string;
  youtube?: string;
  twitter?: string;
};

type Artist = {
  name: string;
  image: string;
  description: string;
  links: ArtistLink;
};

type ArtistCategory = 'musique' | 'danse' | 'peinture' | 'design' | 'entrepreneuriat';

const artistsData: Record<ArtistCategory, Artist[]> = {
  musique: [
    {
      name: "Daft Punk",
      image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Daft_Punk_at_Grand_Journal.jpg",
      description: "Un duo électro légendaire.",
      links: {
        site: "https://www.daftpunk.com",
        instagram: "https://www.instagram.com/daftpunk",
        youtube: "https://www.youtube.com/user/daftpunkalive"
      }
    },
    {
      name: "Beyoncé",
      image: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Beyonc%C3%A9_-_Roseland.jpg",
      description: "Icône mondiale de la pop et du R&B.",
      links: {
        instagram: "https://www.instagram.com/beyonce",
        youtube: "https://www.youtube.com/beyonce",
        site: "https://www.beyonce.com"
      }
    }
  ],
  danse: [
    {
      name: "Misty Copeland",
      image: "https://upload.wikimedia.org/wikipedia/commons/3/38/Misty_Copeland.jpg",
      description: "Danseuse étoile talentueuse.",
      links: {
        site: "https://mistycopeland.com",
        instagram: "https://www.instagram.com/mistyonpointe"
      }
    }
  ],
  peinture: [
    {
      name: "Pablo Picasso",
      image: "https://upload.wikimedia.org/wikipedia/commons/9/99/Pablo_picasso_1.jpg",
      description: "Maître du cubisme.",
      links: {
        site: "https://www.picasso.fr/en/"
      }
    }
  ],
  design: [
    {
      name: "Philippe Starck",
      image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Philippe_Starck_%282009%29.jpg",
      description: "Designer aux créations futuristes.",
      links: {
        site: "https://www.starck.com/en"
      }
    }
  ],
  entrepreneuriat: [
    {
      name: "Elon Musk",
      image: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Elon_Musk_Royal_Society_%28crop1%29.jpg",
      description: "Visionnaire de la tech et de l’espace.",
      links: {
        site: "https://www.spacex.com",
        twitter: "https://twitter.com/elonmusk"
      }
    }
  ]
};

export default function Presentation() {
  const [selectedCategory, setSelectedCategory] = useState<ArtistCategory>("musique");

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-red-500 to-blue-500 p-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Header />
      <section className="text-center max-w-3xl mt-8">
        <h1 className="text-white text-4xl sm:text-6xl font-bold mb-4">Artistes</h1>
        <p className="text-white text-lg sm:text-xl mb-6">Découvrez les talents classés par catégorie.</p>
      </section>

      {/* Boutons Catégories */}
      <div className="flex flex-wrap gap-4 justify-center my-6">
        {categories.map(category => (
          <Button 
            key={category.key} 
            onClick={() => setSelectedCategory(category.key as ArtistCategory)}
            className={`px-4 py-2 rounded-lg transition-all ${selectedCategory === category.key ? 'bg-white text-black' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Affichage des Artistes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {artistsData[selectedCategory].map(artist => (
          <Card key={artist.name} className="bg-white p-4 rounded-2xl shadow-lg">
            <Image 
              src={artist.image} 
              alt={artist.name} 
              width={300} 
              height={200} 
              className="w-full h-40 object-cover rounded-lg"
            />
            <CardContent className="mt-4 text-center">
              <h3 className="text-lg font-semibold text-gray-900">{artist.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{artist.description}</p>
              <div className="flex justify-center gap-4 mt-2">
                {artist.links.site && (
                  <a href={artist.links.site} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:scale-110 transition-transform duration-200">
                    <FaGlobe size={20} title="Site Web" />
                  </a>
                )}
                {artist.links.instagram && (
                  <a href={artist.links.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-700 hover:scale-110 transition-transform duration-200">
                    <FaInstagram size={20} title="Instagram" />
                  </a>
                )}
                {artist.links.youtube && (
                  <a href={artist.links.youtube} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800 hover:scale-110 transition-transform duration-200">
                    <FaYoutube size={20} title="YouTube" />
                  </a>
                )}
                {artist.links.twitter && (
                  <a href={artist.links.twitter} target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:text-sky-700 hover:scale-110 transition-transform duration-200">
                    <FaTwitter size={20} title="Twitter" />
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
