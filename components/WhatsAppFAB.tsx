
import React from 'react';
import { WhatsAppIcon } from './icons';

const WHATSAPP_NUMBER = '923137287777';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

const WhatsAppFAB: React.FC = () => {
  return (
    <div className="fixed bottom-6 left-6 z-50 group">
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-black/50 hover:bg-green-600 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-green-500/50"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon className="w-8 h-8 text-white" />
      </a>
      <div className="absolute bottom-1/2 translate-y-1/2 left-full ml-4 px-3 py-1.5 bg-gray-900 text-white text-sm font-semibold rounded-md shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Chat on WhatsApp
      </div>
    </div>
  );
};

export default WhatsAppFAB;