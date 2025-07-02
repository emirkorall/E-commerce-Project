import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaStar, FaShoppingCart, FaHeart, FaFilter, FaSpinner, FaChevronLeft, FaChevronRight, FaTag, FaSortAmountDown, FaTrash } from 'react-icons/fa';
import { fetchProducts, fetchCategories } from '../store/actions/thunk';
import { addItemToCart, removeItemFromCart } from '../store/slices/cartSlice';
import { addItemToUserCart, removeItemFromUserCart } from '../store/actions/thunk';

const ShopPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productList, total, limit, offset, fetchState } = useSelector(state => state.product);
  const cartItems = useSelector(state => state.cart.items);
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: [0, 3000],
    rating: 'all',
  });
  const user = useSelector(state => state.user);

  // Category mapping for URL and display
  const categoryMap = {
    'graphic-cards': 'Graphics Cards',
    'processors': 'Processors',
    'motherboards': 'Motherboards',
    'monitors': 'Monitors',
    'memory': 'Memory'
  };

  // Reverse mapping for URL generation
  const reverseCategoryMap = Object.entries(categoryMap).reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
  }, {});

  // Update filters when URL category changes
  useEffect(() => {
    if (category) {
      const categoryName = categoryMap[category] || 'all';
      setFilters(prev => ({ ...prev, category: categoryName }));
    }
  }, [category]);

  // Fetch products when filters or pagination changes
  useEffect(() => {
    const params = {
      limit,
      offset,
      category: filters.category,
      rating: filters.rating,
      minPrice: filters.priceRange[0],
      maxPrice: filters.priceRange[1]
    };
    dispatch(fetchProducts(params));
  }, [dispatch, filters, limit, offset]);

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'category') {
      // Update URL when category changes
      if (value === 'all') {
        navigate('/shop');
      } else {
        const urlCategory = reverseCategoryMap[value];
        if (urlCategory) {
          navigate(`/shop/${urlCategory}`);
        }
      }
    }
    
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handlePageChange = (newOffset) => {
    dispatch(setOffset(newOffset));
  };

  const handleProductClick = (e, productId) => {
    e.preventDefault();
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Shop Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="text-purple-600">
                <FaShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Shop</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                {total} products
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with Sidebar */}
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-64 bg-white/80 backdrop-blur-sm border border-gray-100 rounded-xl p-4 h-fit lg:sticky lg:top-24">
            <div className="flex items-center space-x-2 mb-6">
              <FaFilter className="text-purple-600" />
              <h2 className="text-sm font-medium text-gray-800">Filters</h2>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="text-xs font-medium text-gray-500 mb-3">CATEGORIES</h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleFilterChange('category', 'all')}
                  className={`w-full text-left px-3 py-2 text-sm transition-colors rounded-md ${
                    filters.category === 'all'
                      ? 'bg-white text-purple-600 shadow-sm'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  All Categories
                </button>
                {Object.values(categoryMap).map(category => (
                  <button
                    key={category}
                    onClick={() => handleFilterChange('category', category)}
                    className={`w-full text-left px-3 py-2 text-sm transition-colors rounded-md ${
                      filters.category === category
                        ? 'bg-white text-purple-600 shadow-sm'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="mb-6">
              <h3 className="text-xs font-medium text-gray-500 mb-3">PRICE RANGE</h3>
              <div className="px-2">
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="3000"
                    value={filters.priceRange[1]}
                    onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], Number(e.target.value)])}
                    className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                  <input
                    type="range"
                    min="0"
                    max="3000"
                    value={filters.priceRange[0]}
                    onChange={(e) => handleFilterChange('priceRange', [Number(e.target.value), filters.priceRange[1]])}
                    className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-purple-600 mt-2"
                  />
                </div>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="mb-6">
              <h3 className="text-xs font-medium text-gray-500 mb-3">RATING</h3>
              <div className="space-y-2">
                {[
                  { label: 'All Ratings', value: 'all' },
                  { label: '4+ Stars', value: '4' },
                  { label: '3+ Stars', value: '3' },
                  { label: '2+ Stars', value: '2' }
                ].map(rating => (
                  <button
                    key={rating.value}
                    onClick={() => handleFilterChange('rating', rating.value)}
                    className={`w-full text-left px-3 py-2 text-sm transition-colors rounded-md ${
                      filters.rating === rating.value
                        ? 'bg-white text-purple-600 shadow-sm'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {rating.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset Filters Button */}
            <button
              onClick={() => setFilters({ category: 'all', priceRange: [0, 3000], rating: 'all' })}
              className="w-full bg-white text-purple-600 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"
            >
              Reset Filters
            </button>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {fetchState === 'FETCHING' ? (
              <div className="text-center py-8 sm:py-12 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm">
                <p className="text-gray-600">Loading products...</p>
              </div>
            ) : productList.length === 0 ? (
              <div className="text-center py-8 sm:py-12 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm">
                <p className="text-gray-600">No products found matching your filters.</p>
              </div>
            ) : (
              <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {productList.map((product) => {
                    const productInCart = cartItems.find(item => item.id === product.id);
                    return (
                      <div 
                        key={product.id} 
                        className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition duration-300 overflow-hidden group cursor-pointer flex flex-col justify-between"
                        onClick={(e) => handleProductClick(e, product.id)}
                      >
                    {/* Product Image */}
                    <div className="relative overflow-hidden bg-gray-50">
                      <div className="aspect-w-16 aspect-h-9">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain p-4 transform group-hover:scale-105 transition duration-300"
                        />
                      </div>
                      {product.isNew && (
                        <div className="absolute top-2 left-2 bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          NEW
                        </div>
                      )}
                      {product.discount && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          -{product.discount}%
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                        <div className="p-4 sm:p-6 flex flex-col flex-grow">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs sm:text-sm text-gray-500">{product.category}</span>
                        <div className="flex items-center">
                          <FaStar className="text-yellow-400 mr-1" />
                          <span className="text-xs sm:text-sm text-gray-600">{product.rating}</span>
                        </div>
                      </div>

                          <h2 className="text-base sm:text-lg font-semibold mb-2 text-gray-800 group-hover:text-purple-600 transition duration-300 flex-grow">
                        {product.name}
                      </h2>

                      <div className="flex items-center mb-4">
                        <p className="text-lg sm:text-xl font-bold text-purple-600 mr-2">${product.price}</p>
                        {product.discount && (
                          <p className="text-xs sm:text-sm text-gray-400 line-through">
                            ${(product.price * (1 + product.discount/100)).toFixed(2)}
                          </p>
                        )}
                      </div>

                          {product.features && product.features.length > 0 && (
                            <div className="mb-4 flex-grow">
                          <ul className="space-y-1">
                                {product.features.slice(0, 2).map((feature, index) => (
                              <li key={index} className="flex items-center text-xs sm:text-sm text-gray-600">
                                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                          <div className="mt-auto">
                      <div className="flex space-x-2">
                              {productInCart ? (
                                <button 
                                  className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 flex items-center justify-center text-xs sm:text-sm font-medium"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    user?.id ? dispatch(removeItemFromUserCart(product.id)) : dispatch(removeItemFromCart(product.id));
                                  }}
                                >
                                  <FaTrash className="mr-2" />
                                  Remove
                                </button>
                              ) : (
                                <button 
                                  className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 flex items-center justify-center text-xs sm:text-sm font-medium"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    user?.id ? dispatch(addItemToUserCart(product)) : dispatch(addItemToCart(product));
                                  }}
                                >
                          <FaShoppingCart className="mr-2" />
                          Add to Cart
                        </button>
                              )}
                              <button 
                                className="bg-gray-100 text-gray-600 py-2 px-3 rounded-md hover:bg-gray-200 transition duration-300"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Add to wishlist logic here
                                }}
                              >
                          <FaHeart />
                        </button>
                      </div>
                    </div>
                  </div>
                      </div>
                    )}
                  )}
                </div>

                {/* Pagination */}
                {total > limit && (
                  <div className="mt-8 flex justify-center">
                    <div className="flex space-x-2">
                      {Array.from({ length: Math.ceil(total / limit) }, (_, i) => (
                        <button
                          key={i}
                          onClick={() => handlePageChange(i * limit)}
                          className={`px-3 py-1 rounded-md text-sm ${
                            offset === i * limit
                              ? 'bg-purple-600 text-white'
                              : 'bg-white text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {i + 1}
                        </button>
                ))}
              </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage; 