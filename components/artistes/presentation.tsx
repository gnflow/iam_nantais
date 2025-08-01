"use client"
import Header from '@/components/UI/header';
import Image from 'next/image';
import { useState } from 'react';
import { Card, CardContent } from "@/components/UI/card";
import { Button } from "@/components/UI/button";
import Footer from '../UI/footer';

const categories = [
    { name: "Musique", key: "musique" },
    { name: "Danse", key: "danse" },
    { name: "Arts Graphique", key: "design" },
    { name: "Mode", key: "mode" },
    { name: "Entrepreneuriat", key: "entrepreneuriat" }
];

const artistsData = {
  musique: [
    { name: "Daft Punk", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Daft_Punk_in_2013.jpg/230px-Daft_Punk_in_2013.jpg", description: "Un duo électro légendaire." },
    { name: "Beyoncé", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Beyonc%C3%A9_-_Tottenham_Hotspur_Stadium_-_1st_June_2023_%2825_of_118%29_%2852946287590%29_%28face_cropped%29.jpg/220px-Beyonc%C3%A9_-_Tottenham_Hotspur_Stadium_-_1st_June_2023_%2825_of_118%29_%2852946287590%29_%28face_cropped%29.jpg", description: "Icône mondiale de la pop et du R&B." }
  ],
  danse: [
    { name: "Misty Copeland", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/From_the_ballet_Coppelia_cropped.jpg/230px-From_the_ballet_Coppelia_cropped.jpg", description: "Danseuse étoile talentueuse." }
  ],
  design: [
    { name: "Pablo Picasso", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Pablo_picasso_1.jpg/230px-Pablo_picasso_1.jpg", description: "Maître du cubisme." }
  ],
  mode: [
    { name: "Philippe Starck", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Phillippe_Starck_2011.jpg/230px-Phillippe_Starck_2011.jpg", description: "Designer aux créations futuristes." }
  ],
  entrepreneuriat: [
    { name: "Elon Musk", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Elon_Musk_Colorado_2022_%28cropped2%29.jpg/230px-Elon_Musk_Colorado_2022_%28cropped2%29.jpg", description: "Visionnaire de la tech et de l’espace." }
  ]
};

type ArtistCategory = keyof typeof artistsData;

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
            className={`px-4 py-2 rounded-lg transition-all ${selectedCategory === category.key ? 'bg-white !text-black font-bold' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
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
              width={200} 
              height={200} 
              className="w-full h-40 object-cover rounded-lg"
            />
            <CardContent className="mt-4 text-center">
              <h3 className="text-lg font-semibold text-gray-900">{artist.name}</h3>
              <p className="text-sm text-gray-600">{artist.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Footer/>
    </div>
  );
}
