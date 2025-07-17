
import React, { useState } from 'react';
import Logo from './Logo';

interface AdminLoginProps {
  onLogin: (password: string) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(password);
  };

  return (
    <div className="bg-black text-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-gray-900 p-8 rounded-xl shadow-2xl shadow-black/50 border border-gray-700">
          <div className="text-center mb-8">
             <a href="/" className="flex items-center justify-center space-x-3 text-2xl font-bold mb-2">
                <Logo className="h-12 w-12" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-500 text-3xl">
                Streameefy
                </span>
            </a>
            <h1 className="text-2xl font-bold text-white mt-4">Admin Panel Login</h1>
            <p className="text-gray-400">Please enter the password to access the dashboard.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded-md p-3 text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition placeholder-gray-500"
                placeholder="Password"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-orange-500"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
