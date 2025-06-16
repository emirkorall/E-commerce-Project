import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';

const components = [
  'Graphic Cards',
  'Processors',
  'Motherboards',
  'Monitors',
  'Memory'
];

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (dropdownId) => {
    setActiveDropdown(activeDropdown === dropdownId ? null : dropdownId);
  };

  return (
    <div className="flex items-center space-x-8">
      <div className="relative">
        <button
          onClick={() => toggleDropdown('components')}
          className="text-gray-300 hover:text-white hover:scale-105 transform transition-all duration-200 text-sm uppercase tracking-wide font-medium flex items-center bg-transparent"
        >
          Components
          <FaChevronDown className="ml-1 text-xs" />
        </button>
        {activeDropdown === 'components' && (
          <div className="absolute top-full left-0 w-48 bg-gray-800 shadow-lg rounded-lg py-2 mt-1 z-50">
            {components.map((component, index) => (
              <Link
                key={index}
                to={`/shop/${component.toLowerCase().replace(/\s+/g, '-')}`}
                className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700"
              >
                {component}
              </Link>
            ))}
          </div>
        )}
      </div>

      

      <Link to="/about" className="text-gray-300 hover:text-white hover:scale-105 transform transition-all duration-200 text-sm uppercase tracking-wide font-medium">
        About Us
      </Link>

      <Link to="/contact" className="text-gray-300 hover:text-white hover:scale-105 transform transition-all duration-200 text-sm uppercase tracking-wide font-medium">
        Contact Us
      </Link>

      <Link to="/team" className="text-gray-300 hover:text-white hover:scale-105 transform transition-all duration-200 text-sm uppercase tracking-wide font-medium">
        Team
      </Link>
    </div>

  
  );
};

export default Navbar; 