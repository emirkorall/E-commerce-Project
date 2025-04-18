import React from 'react';
import Carousel from '../components/Carousel';
import FeaturedProducts from '../components/FeaturedProducts';
import Categories from '../components/Categories';

const HomePage = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section with Carousel */}
      <section className="w-full">
        <Carousel />
      </section>

      {/* Featured Products Section */}
      <FeaturedProducts />

      {/* Categories Section */}
      <Categories />
    </div>
  );
};

export default HomePage; 