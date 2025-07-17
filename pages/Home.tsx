import React, { useState, useMemo, useRef } from 'react';
import { Movie, Filters } from '../types';
import { GENRES, LANGUAGES, SERVERS, CHANNELS, OTT_PLATFORMS, IPTV_PLANS, PLAYER_PLANS } from '../constants';
import Header from '../components/Header';
import HeroCarousel from '../components/HeroCarousel';
import FilterSidebar from '../components/FilterSidebar';
import MovieGrid from '../components/MovieGrid';
import ChannelLineup from '../components/ChannelLineup';
import HowItWorks from '../components/HowItWorks';
import IptvPricing from '../components/IptvPricing';
import PlayerPricing from '../components/PlayerPricing';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import { MenuIcon, SearchIcon, TagIcon } from '../components/icons';
import WarrantyFAB from '../components/WarrantyFAB';
import PolicyModal from '../components/PolicyModal';
import BuyMovie4K from '../components/BuyMovie4K';
import WhatsAppFAB from '../components/WhatsAppFAB';
import { MovieDetailModal } from '../components/MovieDetailModal';
import { useMovies } from '../hooks/useMovies';

const Home: React.FC = () => {
  const { movies } = useMovies();
  const [filters, setFilters] = useState<Filters>({
    search: '',
    genre: 'all',
    language: 'all',
    server: 'all',
    price: 100,
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const MOVIES_PER_PAGE = 12; // 3 rows x 4 columns

  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const suggestions = useMemo(() => {
    if (!filters.search.trim()) return [];
    const searchLower = filters.search.toLowerCase();
    return movies
      .filter(m => m.title.toLowerCase().includes(searchLower))
      .slice(0, 5);
  }, [filters.search, movies]);

  // Show latest movies first
  const latestMovies = [...movies].reverse();

  const filteredMovies = useMemo(() => {
    return latestMovies.filter(movie => {
      const searchLower = filters.search.toLowerCase();
      return (
        (movie.title.toLowerCase().includes(searchLower) ||
         movie.server.toLowerCase().includes(searchLower)) &&
        (filters.genre === 'all' || movie.genre === filters.genre) &&
        (filters.language === 'all' || movie.languages.includes(filters.language)) &&
        (filters.server === 'all' || movie.server === filters.server) &&
        (movie.price <= filters.price)
      );
    });
  }, [filters, latestMovies]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredMovies.length / MOVIES_PER_PAGE);
  const paginatedMovies = filteredMovies.slice(
    (currentPage - 1) * MOVIES_PER_PAGE,
    currentPage * MOVIES_PER_PAGE
  );

  // Reset to page 1 if filters change and current page is out of range
  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [filteredMovies, totalPages]);

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="bg-black text-gray-100 min-h-screen font-sans">
      <Header />
      {/* Trending Now - pass latestMovies so newest is first */}
      <HeroCarousel movies={latestMovies} />
      <main className="w-full px-0 py-8">
        <section id="movies" className="relative flex flex-col lg:flex-row gap-8">
          {/* Sidebar Toggle Button for Mobile */}
          <div className="lg:hidden flex justify-end mb-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md bg-gray-900 hover:bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <MenuIcon />
              <span className="ml-2">Filters</span>
            </button>
          </div>

          {/* Sidebar Backdrop */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/60 z-30 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            ></div>
          )}

          {/* Sidebar */}
          <aside
            className={`fixed lg:relative top-0 left-0 h-full lg:h-auto z-40 lg:z-auto w-4/5 sm:w-64 lg:w-1/4 bg-black/95 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-none transition-transform transform ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } lg:translate-x-0 lg:block`}
          >
             <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              genres={GENRES}
              languages={LANGUAGES}
              servers={SERVERS}
              movies={latestMovies}
              onClose={() => setSidebarOpen(false)}
            />
          </aside>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            {/* All Movies Heading and Description */}
            <div className="mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">All Movies</h2>
              <p className="text-lg text-gray-400">Browse our complete movie library below.</p>
            </div>
            {/* Search, Genre, and IPTV Server Filter Row */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
              <div className="w-full flex flex-col sm:flex-row items-center gap-2">
                {/* IPTV Server Filter */}
                <select
                  name="server"
                  value={filters.server}
                  onChange={e => setFilters(prev => ({ ...prev, server: e.target.value }))}
                  className="bg-gray-800 border border-gray-600 rounded-md p-2 text-gray-100 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition min-w-[140px]"
                >
                  <option value="all">All Servers</option>
                  {SERVERS.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {/* Search Movie */}
                <div className="flex items-center bg-gray-800 border border-gray-600 rounded-md p-2 focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-orange-500 transition w-full relative">
                  <SearchIcon className="w-5 h-5 text-orange-400 mr-2" />
                  <input
                    type="text"
                    name="search"
                    placeholder="Search by title..."
                    value={filters.search}
                    onChange={e => {
                      setFilters(prev => ({ ...prev, search: e.target.value }));
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                    autoComplete="off"
                    className="w-full bg-transparent outline-none text-gray-100"
                    ref={searchInputRef}
                  />
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute left-0 top-full mt-1 w-full bg-gray-900 border border-gray-700 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
                      {suggestions.map(s => (
                        <div
                          key={s.id}
                          className="px-4 py-2 cursor-pointer hover:bg-orange-500 hover:text-white text-gray-200"
                          onMouseDown={() => {
                            setFilters(prev => ({ ...prev, search: s.title }));
                            setShowSuggestions(false);
                            if (searchInputRef.current) searchInputRef.current.blur();
                          }}
                        >
                          {s.title}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {/* Genre Filter Dropdown Only */}
                <select
                  name="genre"
                  value={filters.genre}
                  onChange={e => setFilters(prev => ({ ...prev, genre: e.target.value }))}
                  className="bg-gray-800 border border-gray-600 rounded-md p-2 text-gray-100 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                  style={{ minWidth: 120 }}
                >
                  <option value="all">All</option>
                  {GENRES.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
            <MovieGrid movies={paginatedMovies} onMovieSelect={handleMovieSelect} />
            {/* Pagination UI */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8 gap-2 flex-wrap">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md font-semibold ${currentPage === 1 ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-md font-semibold ${currentPage === page ? 'bg-orange-600 text-white' : 'bg-gray-800 text-gray-200 hover:bg-orange-500 hover:text-white'}`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md font-semibold ${currentPage === totalPages ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-orange-500 text-white hover:bg-orange-600'}`}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </section>

        <BuyMovie4K />
        <ChannelLineup channels={CHANNELS} ottPlatforms={OTT_PLATFORMS} />
        <HowItWorks />
        <IptvPricing plans={IPTV_PLANS} />
        <PlayerPricing players={PLAYER_PLANS} />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
      <WarrantyFAB onOpen={() => setIsPolicyModalOpen(true)} />
      <WhatsAppFAB />
      <PolicyModal isOpen={isPolicyModalOpen} onClose={() => setIsPolicyModalOpen(false)} />
      <MovieDetailModal movie={selectedMovie} onClose={handleCloseModal} />
    </div>
  );
};

export default Home;
