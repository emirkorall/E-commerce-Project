import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';

const categories = [
  {
    id: 1,
    name: 'Electronics',
    subcategories: ['Smartphones', 'Laptops', 'Accessories', 'Audio']
  },
  {
    id: 2,
    name: 'Fashion',
    subcategories: ['Men', 'Women', 'Kids', 'Accessories']
  },
  {
    id: 3,
    name: 'Home & Living',
    subcategories: ['Furniture', 'Decor', 'Kitchen', 'Bath']
  }
];

const pages = [
  {
    id: 1,
    name: 'Shop',
    subcategories: ['Shop Grid', 'Shop List', 'Shop Details', 'Cart', 'Checkout']
  },
  {
    id: 2,
    name: 'Account',
    subcategories: ['Login', 'Register', 'Forgot Password', 'Profile']
  },
  {
    id: 3,
    name: 'Other',
    subcategories: ['404 Page', 'Coming Soon', 'Maintenance']
  }
];

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (categoryId) => {
    setActiveDropdown(activeDropdown === categoryId ? null : categoryId);
  };

  return (
    <nav className="hidden md:flex space-x-6">
      <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
      <div className="relative">
        <button
          onClick={() => toggleDropdown(1)}
          className="text-gray-600 hover:text-gray-900 bg-transparent border-none p-0 cursor-pointer font-normal flex items-center"
        >
          Categories
          <FaChevronDown className="ml-1 text-xs" />
        </button>
        {activeDropdown === 1 && (
          <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-lg py-2 mt-1 z-50">
            {categories.map((category) => (
              <div key={category.id} className="px-4 py-2">
                <div className="font-semibold text-gray-800 mb-1">{category.name}</div>
                <div className="pl-2">
                  {category.subcategories.map((subcategory, index) => (
                    <Link
                      key={index}
                      to={`/category/${category.name.toLowerCase()}/${subcategory.toLowerCase()}`}
                      className="block py-1 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    >
                      {subcategory}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Link to="/blog" className="text-gray-600 hover:text-gray-900">Blog</Link>
      <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
      <div className="relative">
        <button
          onClick={() => toggleDropdown(2)}
          className="text-gray-600 hover:text-gray-900 bg-transparent border-none p-0 cursor-pointer font-normal flex items-center"
        >
          Pages
          <FaChevronDown className="ml-1 text-xs" />
        </button>
        {activeDropdown === 2 && (
          <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-lg py-2 mt-1 z-50">
            {pages.map((page) => (
              <div key={page.id} className="px-4 py-2">
                <div className="font-semibold text-gray-800 mb-1">{page.name}</div>
                <div className="pl-2">
                  {page.subcategories.map((subcategory, index) => (
                    <Link
                      key={index}
                      to={`/pages/${page.name.toLowerCase()}/${subcategory.toLowerCase().replace(/\s+/g, '-')}`}
                      className="block py-1 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    >
                      {subcategory}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>
    </nav>
  );
};

export default Navbar; 