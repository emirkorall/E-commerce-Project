import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGamepad, FaSearch, FaShoppingCart } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from './Navbar';
import axiosInstance from '../utils/axios';
import { setUser } from '../store/actions/clientActions';

// Define the SVG path for the user icon
const userSvgPath = "M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.client);
  const { itemCount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State and ref for dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    delete axiosInstance.defaults.headers.common['Authorization'];
    dispatch(setUser({}, [], []));
    setIsDropdownOpen(false);
    navigate('/login');
  };

  const handleMyOrdersClick = () => {
    navigate('/orders');
    setIsDropdownOpen(false);
  };

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
            <FaGamepad className="w-6 h-6 text-purple-500" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
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
                  className="w-48 px-3 py-1 rounded-full bg-gray-700 text-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 hover:bg-gray-600"
                />
                <FaSearch className="absolute right-3 top-1.5 text-gray-400 w-3 h-3" />
              </div>
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative group">
              <FaShoppingCart className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors duration-200" />
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center group-hover:scale-110 transform transition-transform duration-200">
                {itemCount || 0}
              </span>
            </Link>

            {/* User Account Dropdown */}
            {user?.id ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  className="flex items-center space-x-2 text-gray-300 hover:text-white hover:scale-105 transform transition-all duration-200 text-xs uppercase tracking-wide font-medium bg-white/5 px-3 py-1.5 rounded-full"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <svg width="16" height="16" viewBox="0 0 448 512" fill="currentColor" className="hover:rotate-12 transition-transform duration-200">
                    <path d={userSvgPath} />
                  </svg>
                  <span className="max-w-[80px] truncate text-xs">
                    {user?.name || 'Account'}
                  </span>
                  <svg 
                    className={`w-3 h-3 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white/10 rounded-xl shadow-2xl py-2 z-50 border border-white/20 backdrop-blur-md transform origin-top-right transition-all duration-200 ease-out">
                    <div className="px-3 py-1.5 border-b border-white/10">
                      <p className="text-xs text-gray-300">Signed in as</p>
                      <p className="text-white text-xs font-medium truncate">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleMyOrdersClick}
                      className="flex items-center w-full text-left px-3 py-2 text-white hover:bg-white/20 transition-all duration-200 group"
                    >
                      <svg className="w-4 h-4 mr-2 text-gray-400 group-hover:text-white transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      My Orders
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-3 py-2 text-red-300 hover:bg-white/20 transition-all duration-200 group mt-1"
                    >
                      <svg className="w-4 h-4 mr-2 text-red-400 group-hover:text-red-300 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-xs text-gray-300 hover:text-white transition-colors duration-200">
                  Login
                </Link>
                <Link to="/signup" className="text-xs text-gray-300 hover:text-white transition-colors duration-200">
                  Sign Up
                </Link>
              </div>
            )}

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