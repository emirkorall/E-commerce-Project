import React, { useState } from 'react';
import { FaFilter, FaSort, FaThList, FaStar, FaShoppingCart, FaHeart, FaMicrochip, FaMemory, FaDesktop, FaGamepad, FaLaptop, FaTv, FaChevronDown, FaSearch } from 'react-icons/fa';
import ProductCard, { featuredProducts } from '../components/ProductCard';

const ShopPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  // const [showFilters, setShowFilters] = useState(false);
  // const [sortBy, setSortBy] = useState('default');
  // const [selectedCategories, setSelectedCategories] = useState([]);
  // const [priceRange, setPriceRange] = useState([0, 3000]);
  // const [expandedFilterSection, setExpandedFilterSection] = useState('categories');

  // const handleSort = (e) => {
  //   setSortBy(e.target.value);
  // };

  // const toggleCategory = (category) => {
  //   if (selectedCategories.includes(category)) {
  //     setSelectedCategories(selectedCategories.filter(cat => cat !== category));
  //   } else {
  //     setSelectedCategories([...selectedCategories, category]);
  //   }
  // };

  // const handlePriceRangeChange = (e, type) => {
  //   const value = parseInt(e.target.value);
  //   if (type === 'min') {
  //     setPriceRange([value, priceRange[1]]);
  //   } else {
  //     setPriceRange([priceRange[0], value]);
  //   }
  // };

  // const toggleFilterSection = (section) => {
  //   setExpandedFilterSection(expandedFilterSection === section ? null : section);
  // };

  // Group products by category
  const productsByCategory = {
    'Graphics Cards': featuredProducts.filter(p => p.category === 'Graphics Cards'),
    'Processors': featuredProducts.filter(p => p.category === 'Processors'),
    'Motherboards': featuredProducts.filter(p => p.category === 'Motherboards'),
    'Monitors': featuredProducts.filter(p => p.category === 'Monitors'),
    'Memory': featuredProducts.filter(p => p.category === 'Memory'),
  };
  
  // Count products in each category
  const categoryCounts = {
    'Graphics Cards': productsByCategory['Graphics Cards'].length,
    'Processors': productsByCategory['Processors'].length,
    'Motherboards': productsByCategory['Motherboards'].length,
    'Monitors': productsByCategory['Monitors'].length,
    'Memory': productsByCategory['Memory'].length,
  };

  // Get all products
  const allProducts = Object.values(productsByCategory).flat();

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Product Grid */}
        <div className="flex-1">
          {/* Products */}
          {allProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allProducts.map((product) => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
              <FaSearch className="mx-auto text-gray-300 text-5xl mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your filters to find what you're looking for.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage; 