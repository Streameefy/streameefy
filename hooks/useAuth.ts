
import { useState, useEffect } from 'react';

const AUTH_STORAGE_KEY = 'isAdminLoggedIn';
const ADMIN_PASSWORDS = ['admin', 'adnan']; // Allow both 'admin' and 'adnan' as valid passwords

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Check session storage on initial load
    const loggedInStatus = sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const login = (password: string): boolean => {
    if (ADMIN_PASSWORDS.includes(password)) {
      sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    setIsLoggedIn(false);
  };

  return { isLoggedIn, login, logout };
};
