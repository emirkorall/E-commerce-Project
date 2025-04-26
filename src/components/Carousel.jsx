import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import carousel1 from '../assets/Carousel.jpg';
import carousel2 from '../assets/Carousel2.jpg';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const slides = [
    {
      image: carousel1,
      title: 'Ultimate Gaming Setup',
      description: 'RGB Perfection with GeForce RTX',
      button: {
        text: 'Shop Now',
        link: '/shop'
      }
    },
    {
      image: carousel2,
      title: 'Next-Gen Hardware',
      description: 'Powered by NVIDIA GeForce RTX'
    }
  ];

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[700px] overflow-hidden group">
      {/* Slides Container */}
      <div 
        className="flex h-full transition-transform duration-500 ease-out" 
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 relative">
            {/* RGB Border Effect */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 animate-gradient-x"></div>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 animate-gradient-x"></div>
              <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-gradient-to-b from-blue-500 via-purple-500 to-red-500"></div>
              <div className="absolute top-0 bottom-0 right-0 w-[2px] bg-gradient-to-b from-red-500 via-purple-500 to-blue-500"></div>
            </div>
            
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
              {/* Content Container */}
              <div className="absolute bottom-0 left-0 right-0 p-12">
                <div className="max-w-7xl mx-auto">
                  <h2 className="text-6xl font-bold text-white mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-red-400">
                    {slide.title}
                  </h2>
                  <p className="text-2xl text-gray-300 mb-8 font-light">
                    {slide.description}
                  </p>
                  {slide.button && (
                    <Link 
                      to={slide.button.link}
                      className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-8 rounded-lg font-medium text-lg hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    >
                      {slide.button.text}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white 
          p-4 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all 
          duration-300 hover:scale-110 transform disabled:opacity-50 disabled:cursor-not-allowed
          border border-white/20 hover:border-white/40"
        disabled={isTransitioning}
      >
        <FaChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white 
          p-4 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all 
          duration-300 hover:scale-110 transform disabled:opacity-50 disabled:cursor-not-allowed
          border border-white/20 hover:border-white/40"
        disabled={isTransitioning}
      >
        <FaChevronRight className="w-6 h-6" />
      </button>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 transition-all duration-500 ease-out"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default Carousel; 