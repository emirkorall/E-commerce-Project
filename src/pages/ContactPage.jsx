import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Get in Touch
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you. Reach out using the form below or through our contact details.
          </p>
        </div>

        {/* Contact Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-3xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="p-4 sm:p-6 order-2 lg:order-1">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Send us a message</h2>
              <form className="space-y-3">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    id="name"
                    type="text"
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 ease-in-out bg-white text-gray-900"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    id="email"
                    type="email"
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 ease-in-out bg-white text-gray-900"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    id="subject"
                    type="text"
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 ease-in-out bg-white text-gray-900"
                    placeholder="What's this about?"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200 ease-in-out bg-white text-gray-900"
                    rows="3"
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 px-4 rounded-md text-sm font-semibold shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-4 sm:p-6 text-white order-1 lg:order-2 flex flex-col justify-center">
              <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="w-5 h-5 text-purple-200" />
                  <div>
                    <h3 className="text-sm font-semibold">Email</h3>
                    <a href="mailto:support@epicloot.com" className="text-xs text-purple-100 hover:text-white transition duration-200">support@epicloot.com</a>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FaPhone className="w-5 h-5 text-purple-200" />
                  <div>
                    <h3 className="text-sm font-semibold">Phone</h3>
                    <a href="tel:+15551234567" className="text-xs text-purple-100 hover:text-white transition duration-200">+1 (555) 123-4567</a>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FaMapMarkerAlt className="w-5 h-5 text-purple-200" />
                  <div>
                    <h3 className="text-sm font-semibold">Address</h3>
                    <p className="text-xs text-purple-100">Santa Monica, California, USA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 