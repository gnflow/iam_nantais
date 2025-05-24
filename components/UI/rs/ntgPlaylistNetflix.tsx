'use client';

import { motion } from 'framer-motion';

const instagramReels = [
  'https://www.instagram.com/reel/DB_4BP9sqtY/embed?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==',
  'https://www.instagram.com/reel/DCCzA00xCkT/embed?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
  'https://www.instagram.com/reel/DCE9I8Os7qM/embed?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',
];

export default function InstagramPlaylistScroll() {
  return (
    <div className="w-full px-4">
  <h2 className="text-white text-2xl font-bold mb-4">📲 Reels Instagram</h2>

  <div className="flex overflow-x-auto gap-0 pb-4 snap-x snap-mandatory scroll-smooth">
    {instagramReels.map((url, i) => {
      const embedUrl = `${url}embed`;

      return (
        <div key={i} className="px-4 snap-center flex-shrink-0">
          <motion.div
            whileHover={{ scale: 1 }}
            className="w-[240px] sm:w-[280px] md:w-[320px] lg:w-[360px] rounded-xl overflow-hidden shadow-lg transition-transform duration-300 bg-black"
          >
            <iframe
              src={embedUrl}
              className="w-full aspect-[9/16] rounded-xl border-0"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
            />
          </motion.div>
        </div>
      );
    })}
  </div>
</div>

  );
  
  
  
}
