'use client';

import { motion } from 'framer-motion';

const instagramReels = [
  'https://www.instagram.com/reel/DB_4BP9sqtY/embed?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==',
  'https://www.instagram.com/reel/DCCzA00xCkT/embed?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
  'https://www.instagram.com/reel/DCE9I8Os7qM/embed?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
];

export default function InstagramPlaylistScroll() {
  return (
    <div className="w-full">
      <h2 className="text-white text-2xl font-bold mb-4">📲 Reels Instagram</h2>

      <div className="flex gap-6 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth">
        {instagramReels.map((url, i) => {
          const embedUrl = `${url}embed`;

          return (
            <motion.div
              key={i}
              className="snap-center flex-shrink-0 w-[320px] md:w-[360px] lg:w-[400px] rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <iframe
                src={embedUrl}
                className="w-full aspect-[9/16] rounded-xl border-0"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                allowFullScreen
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
