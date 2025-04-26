import React from 'react';
import { useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { featuredProducts } from '../components/ProductCard';

const ProductDetail = () => {
  const { category } = useParams();

  // Safety check for category
  if (!category) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center">Category not found</h1>
      </div>
    );
  }

  // Convert URL parameter format to actual category name format
  const categoryName = category === 'graphic-cards' ? 'Graphics Cards' : 
    category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  
  // Get products for this category
  const categoryProducts = featuredProducts.filter(p => p.category === categoryName);

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <section className="w-full flex-1 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 capitalize">
              {categoryName}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our selection of high-performance {categoryName} for your gaming setup.
            </p>
          </div>

          {categoryProducts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No products found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {categoryProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-56 object-cover"
                    />
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
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-500">{product.category}</span>
                      <div className="flex items-center">
                        <FaStar className="text-yellow-400 mr-1" />
                        <span className="text-sm text-gray-600">{product.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 hover:text-purple-600 transition duration-300">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-bold text-purple-600">${product.price}</p>
                      {product.discount && (
                        <p className="text-sm text-gray-400 line-through">${(product.price * (1 + product.discount/100)).toFixed(2)}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail; 