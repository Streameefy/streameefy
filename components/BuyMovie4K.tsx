
import React from 'react';
import { FourKIcon, HdrIcon, AudioWaveIcon, WhatsAppIcon } from './icons';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 transition-all duration-300 hover:border-orange-500 hover:shadow-lg hover:shadow-orange-500/10 text-center">
    <div className="flex items-center justify-center h-16 w-16 mx-auto mb-4 rounded-full bg-orange-500/10 text-orange-500">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

const BuyMovie4K: React.FC = () => {
  return (
    <section id="buy-movie-4k" className="py-20 mt-16 bg-[#111111] rounded-lg shadow-inner shadow-black/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-500">
            Experience Cinema in 4K Ultra HD
          </h2>
          <p className="text-lg text-gray-300 mb-12">
            Don't just watch movies, live them. Our premium 4K links offer unparalleled visual fidelity, vibrant colors, and immersive sound, bringing the theater experience directly to your home.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureCard 
            icon={<FourKIcon />} 
            title="Stunning Resolution" 
            description="With four times the pixels of Full HD, every scene is rendered with breathtaking clarity and detail. You'll see every texture, every expression."
          />
          <FeatureCard 
            icon={<HdrIcon />} 
            title="Vibrant HDR Colors" 
            description="High Dynamic Range (HDR) provides a wider color spectrum, deeper blacks, and brighter whites for a more realistic and lifelike picture."
          />
          <FeatureCard 
            icon={<AudioWaveIcon />} 
            title="Immersive Audio" 
            description="Our 4K streams often come with high-fidelity audio options like Dolby Atmos, putting you right in the middle of the action."
          />
        </div>

        <div className="text-center bg-gray-900/50 p-8 md:p-12 rounded-xl border border-gray-700">
          <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">Ready to Upgrade Your Viewing?</h3>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Getting your exclusive 4K movie link is simple. Just contact our team on WhatsApp, and we'll guide you through the quick and secure process. Elevate your movie nights today!
          </p>
          <a
            href="https://wa.me/923137287777"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-transform transform hover:scale-105"
          >
            <WhatsAppIcon />
            <span>Request Your 4K Movie</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default BuyMovie4K;