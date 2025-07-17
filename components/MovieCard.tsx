
import React from 'react';
import { Movie } from '../types';
import { ServerIcon, TagIcon } from './icons';

interface MovieCardProps {
  movie: Movie;
  onSelect: (movie: Movie) => void;
  latest?: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onSelect, latest }) => {
  const cardId = `movie-${movie.title.replace(/\s+/g, '-')}`;

  return (
    <button
      id={cardId}
      onClick={() => onSelect(movie)}
      className="bg-gray-900 rounded-lg overflow-hidden shadow-lg group transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-orange-500/30 w-full text-left"
      aria-label={`View details for ${movie.title}`}
    >
      <div className="relative">
        <img
          src={movie.posterUrl || '/placeholder-poster.png'}
          alt={`Poster for ${movie.title}`}
          className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ imageRendering: 'auto' }}
          onError={e => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = '/placeholder-poster.png';
          }}
        />
        {latest && (
          <div className="absolute top-2 left-2 z-10">
            <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg uppercase">Latest</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-2xl font-bold text-white tracking-wide">{movie.title}</h3>
          <span className="text-sm font-semibold text-orange-300 bg-orange-900/60 px-2 py-1 rounded">{movie.genre}</span>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between text-gray-300">
          <div className="flex items-center space-x-2">
            <ServerIcon />
            <span>{movie.server}</span>
          </div>
          <div className="flex items-center space-x-2">
            <TagIcon />
            <span className="font-bold text-lg text-white">${movie.price.toFixed(2)}</span>
            <span className="text-xs text-gray-400">/{movie.priceType}</span>
          </div>
        </div>
        <div className="w-full text-center py-2 px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg group-hover:from-orange-600 group-hover:to-orange-700 transition-all duration-300 ease-in-out transform group-hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75">
          View Details
        </div>
      </div>
    </button>
  );
};

export default MovieCard;
