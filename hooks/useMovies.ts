
import { useState, useEffect } from 'react';
import { Movie, NewMovie } from '../types';
import { DEFAULT_MOVIES } from '../constants';

const MOVIES_STORAGE_KEY = 'streameefy_movies';

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    try {
      const storedMovies = localStorage.getItem(MOVIES_STORAGE_KEY);
      if (storedMovies) {
        setMovies(JSON.parse(storedMovies));
      } else {
        // Seed with default movies if nothing is in local storage
        setMovies(DEFAULT_MOVIES);
        localStorage.setItem(MOVIES_STORAGE_KEY, JSON.stringify(DEFAULT_MOVIES));
      }
    } catch (error) {
      console.error("Could not load movies from local storage", error);
      setMovies(DEFAULT_MOVIES);
    }
  }, []);

  const addMovie = (newMovie: NewMovie) => {
    setMovies(prevMovies => {
      const movieToAdd: Movie = {
        ...newMovie,
        id: Date.now(), // Simple unique ID generation
      };
      const updatedMovies = [...prevMovies, movieToAdd];
      localStorage.setItem(MOVIES_STORAGE_KEY, JSON.stringify(updatedMovies));
      return updatedMovies;
    });
  };

  const updateMovie = (updatedMovie: Movie) => {
    setMovies(prevMovies => {
      const updatedMovies = prevMovies.map(movie =>
        movie.id === updatedMovie.id ? updatedMovie : movie
      );
      localStorage.setItem(MOVIES_STORAGE_KEY, JSON.stringify(updatedMovies));
      return updatedMovies;
    });
  };

  const deleteMovie = (id: number) => {
    setMovies(prevMovies => {
      const updatedMovies = prevMovies.filter(movie => movie.id !== id);
      localStorage.setItem(MOVIES_STORAGE_KEY, JSON.stringify(updatedMovies));
      return updatedMovies;
    });
  };

  return { movies, addMovie, updateMovie, deleteMovie };
};
