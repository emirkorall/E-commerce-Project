import React from 'react';
import { Link } from 'react-router-dom';

export const featuredProducts = [
  {
    id: 1,
    name: 'Ray-Ban Wayfarer Sunglasses',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Accessories'
  },
  {
    id: 2,
    name: 'Premium Headphones',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Electronics'
  },
  {
    id: 3,
    name: 'Apple Watch Series 7',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Wearables'
  },
  {
    id: 4,
    name: 'Apple AirPods Pro',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'Electronics'
  }
];

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
          <p className="text-gray-600 mb-2">{product.category}</p>
          <p className="text-xl font-bold text-blue-600">${product.price}</p>
        </div>
      </Link>
      <div className="p-4 pt-0">
        <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 