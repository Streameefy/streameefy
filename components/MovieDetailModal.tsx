
import React from 'react';
import { Movie } from '../types';
import { XIcon, StarIcon, ServerIcon, GlobeIcon, TagIcon, InfoIcon, WhatsAppIcon } from './icons';

interface MovieDetailModalProps {
  movie: Movie | null;
  onClose: () => void;
}

const DetailItem: React.FC<{ icon: React.ReactNode; label: string; value: React.ReactNode }> = ({ icon, label, value }) => (
    <div className="flex items-start space-x-2">
        <div className="text-orange-400 mt-1">{icon}</div>
        <div>
            <p className="text-sm text-gray-400">{label}</p>
            <p className="font-semibold text-white">{value}</p>
        </div>
    </div>
);

export const MovieDetailModal: React.FC<MovieDetailModalProps> = ({ movie, onClose }) => {
  if (!movie) {
    return null;
  }

  const WHATSAPP_NUMBER = '923137287777';
  const message = `Hi! I'm interested in getting access to the movie: ${movie.title}.`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-900 border border-orange-500/50 rounded-xl shadow-2xl shadow-orange-500/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto mx-auto relative transform animate-fade-in-scale"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-20 bg-gray-900/50 rounded-full p-1"
          aria-label="Close movie details"
        >
          <XIcon />
        </button>

        <div className="grid md:grid-cols-12 gap-0 md:gap-8">
            <div className="md:col-span-4 h-80 md:h-auto">
                <img 
                    src={movie.posterUrl || '/placeholder-poster.png'} 
                    alt={`Poster for ${movie.title}`} 
                    className="w-full h-full object-cover rounded-t-xl md:rounded-l-xl md:rounded-t-none"
                    onError={e => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = '/placeholder-poster.png';
                    }}
                />
            </div>
            <div className="md:col-span-8 p-6 md:p-8">
                <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-2">{movie.title}</h2>
                <div className="flex items-center gap-4 mb-6">
                    <span className="text-sm font-semibold text-orange-300 bg-orange-900/60 px-3 py-1 rounded-full">{movie.genre}</span>
                     <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <StarIcon key={i} className={`w-5 h-5 ${i < movie.rating ? 'text-yellow-400' : 'text-gray-600'}`} />
                        ))}
                        <span className="text-white font-bold ml-1">{movie.rating.toFixed(1)}</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-2 mb-6">
                    <DetailItem icon={<ServerIcon />} label="Server" value={movie.server} />
                    <DetailItem icon={<GlobeIcon />} label="Languages" value={movie.languages.join(', ')} />
                    <DetailItem icon={<TagIcon />} label="Price" value={
                        <div className="flex items-baseline">
                           <span className="text-lg text-white">${movie.price.toFixed(2)}</span>
                           <span className="text-xs text-gray-400 ml-1">/{movie.priceType}</span>
                        </div>
                    }/>
                </div>
                
                <div className="mb-8">
                    <h3 className="text-lg font-bold text-orange-400 mb-2 flex items-center gap-2">
                        <InfoIcon />
                        <span>Description</span>
                    </h3>
                    <p className="text-gray-300 text-base leading-relaxed">{movie.description}</p>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors transform hover:scale-105"
                >
                  <WhatsAppIcon />
                  Get Access on WhatsApp
                </a>
            </div>
        </div>
      </div>
    </div>
  );
};
