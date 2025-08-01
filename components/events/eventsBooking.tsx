"use client"
import { useEffect, useState } from 'react';
import Header from '@/components/UI/header';
import Link from 'next/link';
import Footer from '../UI/footer';

// Définition du type des événements
interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  link: string;
}

export default function EventsBooking() {
  const [events, setEvents] = useState<Event[]>([]); // ✅ Correction ici

  useEffect(() => {
    // Exemple de récupération des événements (remplacer par une API réelle)
    setEvents([
      { id: 1, title: 'Concert Live', date: '2025-03-15', location: 'Paris', link: 'https://facebook.com/event1' },
      { id: 2, title: 'DJ Set', date: '2025-04-10', location: 'Lyon', link: 'https://instagram.com/event2' },
    ]);
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-gray-900 to-black p-8 sm:p-20 font-[family-name:var(--font-geist-sans)] text-white">
      <Header />

      {/* Section des Événements */}
      <section className="text-center max-w-3xl mt-8">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4">Événements</h1>
        <p className="text-lg sm:text-xl mb-6">Réservez votre place pour nos événements exclusifs !</p>
      </section>

      {/* Liste des Événements */}
      <div className="w-full max-w-4xl grid gap-6 mt-6">
        {events.map((event) => (
          <div key={event.id} className="p-6 bg-gray-800 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-semibold">{event.title}</h2>
            <p className="text-gray-400">📅 {event.date} - 📍 {event.location}</p>
            <Link href={event.link} target="_blank" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
              Réserver
            </Link>
          </div>
        ))}
      </div>

      {/* Playlist Spotify */}
      <div className="w-full max-w-4xl mt-10">
        <h2 className="text-2xl font-semibold text-center mb-4">Ambiance Musicale</h2>
        <iframe className="w-full h-80" src="https://open.spotify.com/embed/playlist/PLAYLIST_ID" allow="encrypted-media"></iframe>
      </div>
      <Footer />
    </div>
  );
}
