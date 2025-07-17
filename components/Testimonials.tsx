import React from 'react';
import { TESTIMONIALS } from '../constants';
import { StarIcon } from './icons';

const Testimonials: React.FC = () => {
  const duplicatedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section id="testimonials" className="py-20 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">Loved by Movie Fans</h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12">
          Don't just take our word for it. Here's what our customers are saying about their Streameefy experience.
        </p>
      </div>

      <div className="relative group w-full">
        <div className="flex animate-scroll group-hover:[animation-play-state:paused]">
          {duplicatedTestimonials.map((testimonial, index) => (
            <div key={index} className="flex-shrink-0 w-[90vw] max-w-sm sm:w-auto mx-4">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col text-left h-full border border-gray-700">
                <div className="flex items-center mb-4">
                  <img src={testimonial.avatarUrl} alt={testimonial.name} className="w-14 h-14 rounded-full mr-4 border-2 border-orange-400"/>
                  <div>
                    <h4 className="font-bold text-lg text-white">{testimonial.name}</h4>
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarIcon key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-600'}`} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 italic flex-grow">"{testimonial.review}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;