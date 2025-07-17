import React, { useState, useEffect } from 'react';
import { Movie, NewMovie, Genre } from '../types';
import { GENRES as DEFAULT_GENRES, LANGUAGES, SERVERS, OTT_PLATFORMS } from '../constants';
import Logo from './Logo';

interface AdminDashboardProps {
  movies: Movie[];
  onAddMovie: (movie: NewMovie) => void;
  onUpdateMovie: (movie: Movie) => void;
  onDeleteMovie: (id: number) => void;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ movies, onAddMovie, onUpdateMovie, onDeleteMovie, onLogout }) => {
    const [categories, setCategories] = useState<string[]>(() => [...DEFAULT_GENRES]);
    const [newCategory, setNewCategory] = useState('');
    const [newMovie, setNewMovie] = useState<NewMovie>({
        title: '',
        posterUrl: '',
        genre: DEFAULT_GENRES[0] || '',
        languages: [],
        server: SERVERS[0],
        price: 0,
        priceType: 'one-time',
        description: '',
        rating: 0,
    });
    const [formErrors, setFormErrors] = useState<string[]>([]);

    // OTT Platforms State
    const [ottPlatforms, setOttPlatforms] = useState(() => [...OTT_PLATFORMS]);
    const [newOtt, setNewOtt] = useState({ name: '', logoUrl: '' });
    const [ottEditIndex, setOttEditIndex] = useState<number | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewMovie(prev => ({ ...prev, [name]: name === 'price' || name === 'rating' ? parseFloat(value) : value }));
    };
    
    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setNewMovie(prev => ({...prev, languages: selectedOptions}));
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewMovie(prev => ({ ...prev, posterUrl: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Basic Validation
        const errors: string[] = [];
        if (!newMovie.title) errors.push('Title is required.');
        if (!newMovie.posterUrl) errors.push('Poster URL or uploaded image is required.');
        if (newMovie.price < 0) errors.push('Price cannot be negative.');
        if (newMovie.rating < 0 || newMovie.rating > 5) errors.push('Rating must be between 0 and 5.');
        if (newMovie.languages.length === 0) errors.push('At least one language must be selected.');

        if(errors.length > 0) {
            setFormErrors(errors);
            return;
        }

        onAddMovie(newMovie);
        setNewMovie(initialFormState); // Reset form
        const fileInput = e.currentTarget.querySelector('#posterUpload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
        setFormErrors([]);
        alert('Movie added successfully!');
    };

    const handleAddCategory = (e: React.FormEvent) => {
        e.preventDefault();
        if (newCategory && !categories.includes(newCategory)) {
            setCategories(prev => {
                const updated = [...prev, newCategory];
                // If this is the first category, set it as selected
                setNewMovie(movie => ({ ...movie, genre: updated[0] }));
                return updated;
            });
            setNewCategory('');
        }
    };
    
    const InputField: React.FC<{name: string, label: string, type?: string, value: string | number, required?: boolean}> = ({name, label, type="text", value, required=true}) => (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
            <input type={type} id={name} name={name} value={value} onChange={handleInputChange} required={required} className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition" />
        </div>
    );
    
    const SelectField: React.FC<{name: string, label: string, value: string, options: string[], required?: boolean}> = ({name, label, value, options, required=true}) => (
         <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
            <select id={name} name={name} value={value} onChange={handleInputChange} required={required} className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition">
                {options.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
        </div>
    );

    const handleOttInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setNewOtt(prev => ({ ...prev, [name]: value }));
    };
    const handleAddOtt = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newOtt.name || !newOtt.logoUrl) return;
      setOttPlatforms(prev => [...prev, { ...newOtt }]);
      setNewOtt({ name: '', logoUrl: '' });
    };
    const handleEditOtt = (index: number) => {
      setOttEditIndex(index);
      setNewOtt(ottPlatforms[index]);
    };
    const handleUpdateOtt = (e: React.FormEvent) => {
      e.preventDefault();
      if (ottEditIndex === null) return;
      setOttPlatforms(prev => prev.map((item, idx) => idx === ottEditIndex ? { ...newOtt } : item));
      setOttEditIndex(null);
      setNewOtt({ name: '', logoUrl: '' });
    };
    const handleDeleteOtt = (index: number) => {
      setOttPlatforms(prev => prev.filter((_, idx) => idx !== index));
      if (ottEditIndex === index) setOttEditIndex(null);
    };

  return (
    <div className="bg-black text-gray-100 min-h-screen font-sans p-4 sm:p-8">
      <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-800">
        <div className="flex items-center space-x-3 text-2xl font-bold">
            <Logo className="h-10 w-10" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-500">
              Admin Panel
            </span>
        </div>
        <button onClick={onLogout} className="py-2 px-4 bg-red-600 hover:bg-red-700 rounded-md font-semibold transition-colors duration-300">
          Logout
        </button>
      </header>
      
      <main className="flex flex-col items-center gap-8 w-full">
        {/* Row for Manage Categories, Add New Movie, and OTT Platforms */}
        <div className="w-full flex flex-col lg:flex-row gap-6 justify-center">
          {/* Manage Categories */}
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 mb-4 w-full max-w-md flex flex-col items-center">
            <h2 className="text-xl font-bold text-white mb-2 text-center">Manage Categories</h2>
            <form onSubmit={handleAddCategory} className="flex gap-2 mb-2 w-full">
              <input
                type="text"
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
                placeholder="Add new category"
                className="flex-1 bg-gray-800 border border-gray-600 rounded-md p-2 text-white"
              />
              <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded">Add</button>
            </form>
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map(cat => (
                <span key={cat} className="bg-gray-700 text-orange-300 px-3 py-1 rounded-full text-xs">{cat}</span>
              ))}
            </div>
          </div>
          {/* Add New Movie */}
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 w-full max-w-md flex flex-col items-center">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Add New Movie</h2>
            <form onSubmit={handleSubmit} className="space-y-4 w-full">
                <InputField name="title" label="Movie Title" value={newMovie.title} />
                <InputField name="posterUrl" label="Poster Image URL" value={newMovie.posterUrl} required={false} />
                
                <div className="text-center text-sm text-gray-400">OR</div>

                <div>
                    <label htmlFor="posterUpload" className="w-full block text-center py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-md font-semibold transition-colors duration-300 cursor-pointer">
                        Upload Poster
                    </label>
                    <input type="file" id="posterUpload" accept="image/*" onChange={handleFileChange} className="hidden" />
                </div>

                {newMovie.posterUrl && (
                    <div className="mt-2">
                        <p className="text-sm font-medium text-gray-300 mb-2">Poster Preview:</p>
                        <img src={newMovie.posterUrl} alt="Poster preview" className="w-full rounded-md object-cover max-h-48 border border-gray-600" />
                    </div>
                )}

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                  <textarea id="description" name="description" value={newMovie.description} onChange={handleInputChange} required rows={4} className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <SelectField name="genre" label="Genre" value={newMovie.genre} options={categories} />
                    <SelectField name="server" label="Server" value={newMovie.server} options={SERVERS} />
                </div>
                 <div>
                    <label htmlFor="languages" className="block text-sm font-medium text-gray-300 mb-1">Languages (Ctrl/Cmd + click to select multiple)</label>
                    <select id="languages" name="languages" value={newMovie.languages} onChange={handleLanguageChange} required multiple className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition h-24">
                        {LANGUAGES.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <InputField name="price" label="Price" type="number" value={newMovie.price} />
                   <SelectField name="priceType" label="Price Type" value={newMovie.priceType} options={['one-time', 'monthly']} />
                </div>
                
                 <div>
                    <label htmlFor="rating" className="block text-sm font-medium text-gray-300 mb-1">Rating (0-5)</label>
                    <input type="range" id="rating" name="rating" min="0" max="5" step="0.1" value={newMovie.rating} onChange={handleInputChange} className="w-full h-2 bg-gray-700 rounded-lg cursor-pointer accent-orange-500" />
                    <span className="text-center mt-2 text-gray-300 block">{newMovie.rating.toFixed(1)}</span>
                 </div>
                 
                 {formErrors.length > 0 && (
                    <div className="bg-red-900/50 border border-red-500 text-red-300 p-3 rounded-md text-sm">
                        <ul className="list-disc list-inside">
                            {formErrors.map((err, i) => <li key={i}>{err}</li>)}
                        </ul>
                    </div>
                 )}

                <button type="submit" className="w-full mt-4 py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 ease-in-out transform hover:scale-105">
                    Add Movie
                </button>
            </form>
           </div>
          {/* Manage OTT Platforms */}
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 w-full max-w-md flex flex-col items-center">
            <h2 className="text-xl font-bold text-white mb-2 text-center">Manage OTT Platforms</h2>
            <form onSubmit={ottEditIndex === null ? handleAddOtt : handleUpdateOtt} className="flex flex-col gap-2 w-full mb-4">
              <input
                type="text"
                name="name"
                value={newOtt.name}
                onChange={handleOttInputChange}
                placeholder="Platform Name"
                className="bg-gray-800 border border-gray-600 rounded-md p-2 text-white"
                required
              />
              <input
                type="text"
                name="logoUrl"
                value={newOtt.logoUrl}
                onChange={handleOttInputChange}
                placeholder="Logo URL"
                className="bg-gray-800 border border-gray-600 rounded-md p-2 text-white"
                required
              />
              {newOtt.logoUrl && (
                <img src={newOtt.logoUrl} alt="Logo Preview" className="w-16 h-16 object-contain mx-auto border border-gray-700 rounded-full bg-white" />
              )}
              <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded">
                {ottEditIndex === null ? 'Add Platform' : 'Update Platform'}
              </button>
              {ottEditIndex !== null && (
                <button type="button" onClick={() => { setOttEditIndex(null); setNewOtt({ name: '', logoUrl: '' }); }} className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded mt-1">Cancel</button>
              )}
            </form>
            <div className="flex flex-col gap-2 w-full max-h-48 overflow-y-auto">
              {ottPlatforms.map((platform, idx) => (
                <div key={platform.name + idx} className="flex items-center gap-2 bg-gray-800 rounded p-2">
                  <img src={platform.logoUrl} alt={platform.name} className="w-8 h-8 object-contain bg-white rounded-full border border-gray-700" />
                  <span className="flex-1 text-white text-sm">{platform.name}</span>
                  <button onClick={() => handleEditOtt(idx)} className="text-xs text-orange-400 hover:underline">Edit</button>
                  <button onClick={() => handleDeleteOtt(idx)} className="text-xs text-red-400 hover:underline">Delete</button>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Movie Library Section below */}
        <div className="w-full">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Current Movie Library ({movies.length})</h2>
          <div className="max-h-[80vh] overflow-y-auto bg-gray-900 p-4 rounded-lg border border-gray-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {movies.slice().reverse().map(movie => (
                <MovieAdminCard key={movie.id} movie={movie} onUpdate={onUpdateMovie} onDelete={onDeleteMovie} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// MovieAdminCard component for edit/delete actions
const MovieAdminCard: React.FC<{ movie: Movie; onUpdate: (m: Movie) => void; onDelete: (id: number) => void }> = ({ movie, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editMovie, setEditMovie] = useState<Movie>({
    ...movie,
    posterUrl: movie.posterUrl && movie.posterUrl.trim() !== '' ? movie.posterUrl : '/placeholder-poster.png',
  });

  // Always reset editMovie state when edit mode is opened
  useEffect(() => {
    if (isEditing) {
      setEditMovie({
        ...movie,
        posterUrl: movie.posterUrl && movie.posterUrl.trim() !== '' ? movie.posterUrl : '/placeholder-poster.png',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing, movie.id]);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditMovie(prev => ({ ...prev, [name]: name === 'price' || name === 'rating' ? parseFloat(value) : value }));
  };

  const handleEditLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setEditMovie(prev => ({ ...prev, languages: selectedOptions }));
  };

  const handleEditSave = () => {
    // If posterUrl is empty, set to placeholder
    const safeMovie = {
      ...editMovie,
      posterUrl: editMovie.posterUrl && editMovie.posterUrl.trim() !== '' ? editMovie.posterUrl : '/placeholder-poster.png',
    };
    onUpdate(safeMovie);
    setIsEditing(false);
  };

  const handleDelete = () => {
    setShowConfirm(false);
    onDelete(movie.id);
  };

  if (isEditing) {
    return (
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md p-3 flex flex-col gap-2">
        <input className="bg-gray-700 text-white rounded p-1 mb-1" name="title" value={editMovie.title} onChange={handleEditChange} />
        <input className="bg-gray-700 text-white rounded p-1 mb-1" name="posterUrl" value={editMovie.posterUrl} onChange={handleEditChange} placeholder="Poster URL" />
        {/* Preview poster image with fallback */}
        <div className="mb-2 flex justify-center">
          <img
            src={editMovie.posterUrl || '/placeholder-poster.png'}
            alt="Poster preview"
            className="w-24 h-32 object-cover rounded border border-gray-600"
            onError={e => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = '/placeholder-poster.png';
            }}
          />
        </div>
        <textarea className="bg-gray-700 text-white rounded p-1 mb-1" name="description" value={editMovie.description} onChange={handleEditChange} />
        <select className="bg-gray-700 text-white rounded p-1 mb-1" name="genre" value={editMovie.genre} onChange={handleEditChange}>
          {categories.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
        <select className="bg-gray-700 text-white rounded p-1 mb-1" name="server" value={editMovie.server} onChange={handleEditChange}>
          {SERVERS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select className="bg-gray-700 text-white rounded p-1 mb-1" name="languages" value={editMovie.languages} onChange={handleEditLanguageChange} multiple>
          {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
        <input className="bg-gray-700 text-white rounded p-1 mb-1" name="price" type="number" value={editMovie.price} onChange={handleEditChange} />
        <select className="bg-gray-700 text-white rounded p-1 mb-1" name="priceType" value={editMovie.priceType} onChange={handleEditChange}>
          <option value="one-time">One-time</option>
          <option value="monthly">Monthly</option>
        </select>
        <input className="bg-gray-700 text-white rounded p-1 mb-1" name="rating" type="number" min={0} max={5} step={0.1} value={editMovie.rating} onChange={handleEditChange} />
        <div className="flex gap-2 mt-2">
          <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded" onClick={handleEditSave}>Save</button>
          <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded" onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md relative">
      <img src={movie.posterUrl} alt={movie.title} className="w-full h-48 object-cover"/>
      <div className="p-3">
        <h3 className="font-bold text-white truncate" title={movie.title}>{movie.title}</h3>
        <p className="text-sm text-gray-400">{movie.genre}</p>
        <div className="flex gap-2 mt-2">
          <button className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs" onClick={() => setShowConfirm(true)}>Delete</button>
        </div>
        {showConfirm && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-10">
            <p className="text-white mb-2">Are you sure you want to delete?</p>
            <div className="flex gap-2">
              <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded" onClick={handleDelete}>Yes</button>
              <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded" onClick={() => setShowConfirm(false)}>No</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;