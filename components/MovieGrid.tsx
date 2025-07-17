import React from 'react';
import { Movie } from '../types';
import MovieCard from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
  onMovieSelect: (movie: Movie) => void;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, onMovieSelect }) => {
  if (movies.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-800/50 rounded-lg">
        <p className="text-xl text-gray-400">No movies match your criteria.</p>
      </div>
    );
  }

  // Use a key based on the first movie id for animation on page change
  const gridKey = movies.length > 0 ? movies[0].id : 'empty';

  return (
    <div
      key={gridKey}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-500 animate-fade-in-scale w-full"
      style={{ minHeight: 600, width: '100%' }}
    >
      {movies.map((movie, idx) => (
        <div className="flex justify-center items-stretch w-full h-full max-w-[340px] sm:max-w-[380px] md:max-w-[420px] lg:max-w-[480px] xl:max-w-[520px] mx-auto" key={movie.id}>
          <MovieCard movie={movie} onSelect={onMovieSelect} latest={idx === 0} />
        </div>
      ))}
    </div>
  );
};

export default MovieGrid;
