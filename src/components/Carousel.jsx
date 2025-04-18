import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Carousel = () => {
  const slides = [
    {
      id: 1,
      image: 'https://picsum.photos/id/1018/2000/600',
      title: 'Summer Collection',
      description: 'Discover our new summer collection with up to 50% off',
      buttonText: 'Shop Now',
      link: '/summer-collection'
    },
    {
      id: 2,
      image: 'https://picsum.photos/id/1019/2000/600',
      title: 'Electronics Sale',
      description: 'Get the latest gadgets with amazing discounts',
      buttonText: 'View Deals',
      link: '/electronics'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0 relative">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-xl text-white">
                  <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                  <p className="text-xl mb-8">{slide.description}</p>
                  <Link
                    to={slide.link}
                    className="inline-block bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300"
                  >
                    {slide.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              currentSlide === index ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white/75 text-gray-800 p-2 rounded-full transition duration-300"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-white/75 text-gray-800 p-2 rounded-full transition duration-300"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Carousel; 