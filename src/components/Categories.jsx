import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: 'Electronics',
    description: 'Latest gadgets and devices',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    link: '/category/electronics'
  },
  {
    id: 2,
    name: 'Fashion',
    description: 'Trendy clothing and accessories',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
    link: '/category/fashion'
  },
  {
    id: 3,
    name: 'Home & Living',
    description: 'Furniture and decor',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2032&q=80',
    link: '/category/home'
  }
];

const Categories = () => {
  return (
    <section className="w-full py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our curated collections designed to meet your every need
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.link}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition duration-300"
            >
              <div className="relative h-64">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-gray-200">{category.description}</p>
                <div className="mt-4 flex items-center">
                  <span className="text-sm font-medium">Shop Now</span>
                  <svg
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories; 