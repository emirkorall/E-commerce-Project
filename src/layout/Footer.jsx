import React from 'react';
import { Link } from 'react-router-dom';
import { FaGamepad, FaDiscord, FaTwitch, FaYoutube, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      {/* RGB Border Effect */}
      <div className="absolute bottom-0 w-full h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x"></div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <FaGamepad className="w-8 h-8 text-purple-500" />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
                EpicLoot
              </span>
            </Link>
            <p className="text-gray-400">
              Your ultimate destination for premium gaming gear and PC components.
            </p>
            <div className="flex space-x-4">
              <a href="https://discord.gg" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-500 transition-colors">
                <FaDiscord className="w-6 h-6" />
              </a>
              <a href="https://twitch.tv" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-500 transition-colors">
                <FaTwitch className="w-6 h-6" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-500 transition-colors">
                <FaYoutube className="w-6 h-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-500 transition-colors">
                <FaTwitter className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/new-arrivals" className="text-gray-400 hover:text-purple-500 transition-colors">New Arrivals</Link>
              </li>
              <li>
                <Link to="/best-sellers" className="text-gray-400 hover:text-purple-500 transition-colors">Best Sellers</Link>
              </li>
              <li>
                <Link to="/build-pc" className="text-gray-400 hover:text-purple-500 transition-colors">Build Your PC</Link>
              </li>
              <li>
                <Link to="/deals" className="text-gray-400 hover:text-purple-500 transition-colors">Special Deals</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-purple-500 transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-purple-500 transition-colors">FAQs</Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-purple-500 transition-colors">Shipping Info</Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-purple-500 transition-colors">Returns Policy</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Join the Squad</h3>
            <p className="text-gray-400 mb-4">Subscribe for exclusive deals and gaming gear updates!</p>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 EpicLoot. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-purple-500 text-sm transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-400 hover:text-purple-500 text-sm transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 