
import React from 'react';
import Home from './pages/Home';
import Admin from './pages/Admin';

const App: React.FC = () => {
  const path = window.location.pathname;

  if (path.startsWith('/admin')) {
    return <Admin />;
  }
  
  return <Home />;
};

export default App;
