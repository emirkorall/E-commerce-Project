import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser, FaGamepad } from 'react-icons/fa';
import Navbar from './Navbar';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: 'New Arrivals', path: '/new-arrivals' },
    { name: 'Best Sellers', path: '/best-sellers' },
    { name: 'Team', path: '/team' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
      {/* RGB Border Effect */}
      <div className="absolute top-0 w-full h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x"></div>
      
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FaGamepad className="w-8 h-8 text-purple-500" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              EpicLoot
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center">
            <Navbar />
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-6">
            {/* Search Bar */}
            <div className="hidden md:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-48 px-4 py-1.5 rounded-full bg-gray-700 text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 hover:bg-gray-600"
                />
                <FaSearch className="absolute right-3 top-2 text-gray-400 w-4 h-4" />
              </div>
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative group">
              <FaShoppingCart className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors duration-200" />
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center group-hover:scale-110 transform transition-transform duration-200">
                0
              </span>
            </Link>

            {/* User */}
            <Link to="/account" className="group">
              <FaUser className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors duration-200" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-300 hover:text-white focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
                <span className={`block h-0.5 w-6 bg-current transform transition duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`block h-0.5 w-6 bg-current transition duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block h-0.5 w-6 bg-current transform transition duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <nav className="px-2 pt-2 pb-4 space-y-2 bg-gray-800 rounded-lg mt-2">
              <Navbar />
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="relative px-3 py-2">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <FaSearch className="absolute right-6 top-5 text-gray-400 w-4 h-4" />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 