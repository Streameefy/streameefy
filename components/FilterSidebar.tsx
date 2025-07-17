
import React, { useState, useMemo, useEffect } from 'react';
import { Filters, Movie } from '../types';
import { XIcon } from './icons';

interface FilterSidebarProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  genres: string[];
  languages: string[];
  servers: string[];
  movies: Movie[];
  onClose: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  setFilters,
  genres,
  languages,
  servers,
  movies,
  onClose,
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const movieTitles = useMemo(() => movies.map(m => m.title), [movies]);

  // Random 3 movies logic
  const [randomMovies, setRandomMovies] = useState<Movie[]>([]);
  useEffect(() => {
    const pickRandom = () => {
      if (!movies || movies.length === 0) return setRandomMovies([]);
      if (movies.length <= 5) return setRandomMovies(movies);
      const shuffled = [...movies].sort(() => 0.5 - Math.random());
      setRandomMovies(shuffled.slice(0, 5));
    };
    pickRandom();
    const interval = setInterval(pickRandom, 30000);
    return () => clearInterval(interval);
  }, [movies]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: name === 'price' ? Number(value) : value }));
  };

  const handleMovieTitleClick = (title: string) => {
    setFilters(prev => ({ ...prev, search: title }));
    setIsSearchFocused(false); // Hide list after selection
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      genre: 'all',
      language: 'all',
      server: 'all',
      price: 100,
    });
  };

  const FilterGroup: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-orange-400 mb-3 border-b border-gray-700 pb-2">{title}</h3>
      {children}
    </div>
  );

  const SelectInput: React.FC<{ name: string, value: string, options: string[] }> = ({ name, value, options }) => (
    <select
      name={name}
      value={value}
      onChange={handleInputChange}
      className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
    >
      <option value="all">All</option>
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  );

  return (
    <div className="p-4 h-full flex flex-col rounded-lg lg:rounded-none">
       <div className="flex justify-between items-center lg:hidden mb-4">
        <h2 className="text-xl font-bold text-white">Filters</h2>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-700">
          <XIcon />
        </button>
      </div>

      {/* Removed empty flex-grow overflow-y-auto div as per user request */}

      {/* Random Movies Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-orange-400 mb-3 text-center">Random Movies</h3>
        <div className="flex flex-col items-center gap-4">
          {randomMovies.map(movie => (
            <img
              key={movie.id}
              src={movie.posterUrl}
              alt={movie.title}
              className="w-40 h-60 object-cover rounded shadow border border-gray-700"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
