'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';

export default function YouTubePlaylistNetflix() {
  const [videos, setVideos] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 6;

  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch('/api/youtube')
      .then((res) => res.json())
      .then((data) => setVideos(data));
  }, []);

  const startIndex = (currentPage - 1) * videosPerPage;
  const currentVideos = videos.slice(startIndex, startIndex + videosPerPage);
  const totalPages = Math.ceil(videos.length / videosPerPage);

  const openModal = (videoId: string) => {
    setSelectedVideo(videoId);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedVideo(null);
  };

  return (
    <div className="w-full px-4">
      <h2 className="text-white text-2xl font-bold mb-4">🎬 Notre Playlist YouTube</h2>
  
      {/* Grid responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pb-4">
        {currentVideos.map((video: any) => {
          const { videoId } = video.snippet.resourceId;
          const thumbnail = video.snippet.thumbnails.medium.url;
          const title = video.snippet.title;
  
          return (
            <motion.button
              key={videoId}
              onClick={() => openModal(videoId)}
              className="rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform duration-300 text-left bg-zinc-900"
            >
              <img src={thumbnail} alt={title} className="w-full h-auto" />
              <div className="text-white text-sm p-2 truncate">{title}</div>
            </motion.button>
          );
        })}
      </div>
  
      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-4 flex-wrap">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded-full text-sm transition ${
              currentPage === i + 1
                ? 'bg-white text-black font-bold'
                : 'bg-white/30 text-white hover:bg-white/50'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
  
      {/* Modal */}
      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-3xl rounded-xl overflow-hidden shadow-lg bg-black relative">
            {selectedVideo && (
              <iframe
                className="w-full aspect-video"
                src={`https://www.youtube.com/embed/${selectedVideo}`}
                allowFullScreen
              />
            )}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white text-2xl hover:scale-110 transition"
            >
              ✕
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
  
}
