
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import AdminLogin from '../components/AdminLogin';
import AdminDashboard from '../components/AdminDashboard';
import { useMovies } from '../hooks/useMovies';

const Admin: React.FC = () => {
    const { isLoggedIn, login, logout } = useAuth();
    const { movies, addMovie, updateMovie, deleteMovie } = useMovies();

    const handleLogin = (password: string) => {
        const success = login(password);
        if (!success) {
            alert('Incorrect password');
        }
    };

    if (!isLoggedIn) {
        return <AdminLogin onLogin={handleLogin} />;
    }

    return <AdminDashboard movies={movies} onAddMovie={addMovie} onUpdateMovie={updateMovie} onDeleteMovie={deleteMovie} onLogout={logout} />;
};

export default Admin;
