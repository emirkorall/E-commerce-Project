import React from 'react';
import ProductCard, { newArrivalProducts } from './ProductCard';
import { FaStar } from 'react-icons/fa';

const NewArrivals = () => {
  return (
    <section className="w-full py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 relative inline-block group">
            New Arrivals
            <span className="absolute bottom-0 left-0 w-full h-1 bg-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Be the first to experience our latest gaming gear. Fresh drops of cutting-edge hardware and accessories.
          </p>
        </div>
        
        {/* Simple grid with 5 equal-sized products */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {newArrivalProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
              <div className="relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-56 object-cover"
                />
                <div className="absolute top-2 left-2 bg-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  NEW
                </div>
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals; 