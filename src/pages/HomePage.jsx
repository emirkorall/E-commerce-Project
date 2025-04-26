import React from 'react';
import NewArrivals from '../components/NewArrivals';
import Carousel from '../components/Carousel';

const HomePage = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section with Carousel */}
      <section className="w-full">
        <Carousel />
      </section>

      {/* New Arrivals Section */}
      <NewArrivals />
    </div>
  );
};

export default HomePage; 