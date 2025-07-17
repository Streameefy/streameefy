
import React from 'react';
import { Movie } from '../types';

interface HeroCarouselProps {
  movies: Movie[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ movies }) => {
  if (movies.length === 0) {
    return null; // Don't render if there are no movies
  }
  // Duplicate movies for a seamless loop
  const duplicatedMovies = [...movies, ...movies];

  return (
    <section className="w-full overflow-hidden py-20 bg-black" aria-label="Trending Movies">
      <div className="container mx-auto px-4 text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500">
          Trending Now
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mt-2">
          Our most popular movies, updated weekly for you.
        </p>
      </div>

      <div className="relative group">
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-black via-transparent to-black"></div>
        <div className="flex animate-scroll group-hover:[animation-play-state:paused]">
          {duplicatedMovies.map((movie, index) => {
            // Show 'Latest' badge on the first 2 unique movies
            const isLatest = index === 0 || index === 1;
            return (
              <div key={`${movie.id}-${index}`} className="flex-shrink-0 mx-2 sm:mx-4 w-40 sm:w-48">
                <div className="relative rounded-lg shadow-lg shadow-black/40 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-orange-500/30">
                  <img
                    src={movie.posterUrl}
                    alt={`Poster for ${movie.title}`}
                    className="w-full h-64 sm:h-72 object-cover rounded-lg"
                  />
                  {isLatest && (
                    <div className="absolute top-2 left-2 z-10">
                      <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg uppercase">Latest</span>
                    </div>
                  )}
                </div>
                <h4 className="mt-3 text-sm font-semibold text-center text-gray-200 px-1 truncate" title={movie.title}>
                  {movie.title}
                </h4>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
