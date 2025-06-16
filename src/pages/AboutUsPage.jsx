import React from 'react';
import { FaUsers, FaLightbulb, FaRocket, FaHandshake } from 'react-icons/fa';

const AboutUsPage = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-white text-gray-900 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About EpicLoot</h1>
            <p className="text-lg md:text-xl text-gray-600">
              Your trusted destination for premium gaming hardware and components
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                At EpicLoot, we're passionate about providing gamers with the highest quality components
                and exceptional service. Our mission is to empower gamers to build their dream setups
                with confidence and ease.
              </p>
              <p className="text-gray-600">
                We believe that every gamer deserves access to premium hardware that enhances their
                gaming experience. That's why we carefully curate our selection of products and
                provide expert guidance to help you make the right choices.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Gaming Setup"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-lg bg-gray-50">
              <FaUsers className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Community First</h3>
              <p className="text-gray-600">
                We prioritize building a strong gaming community and supporting our customers.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-gray-50">
              <FaLightbulb className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-gray-600">
                We stay ahead of the curve with the latest gaming technology and trends.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-gray-50">
              <FaRocket className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Performance</h3>
              <p className="text-gray-600">
                We focus on delivering high-performance components that exceed expectations.
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-gray-50">
              <FaHandshake className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Trust</h3>
              <p className="text-gray-600">
                We build trust through transparency, quality products, and reliable service.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage; 