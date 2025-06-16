import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const OrderSuccessPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="bg-white p-10 rounded-xl shadow-lg border border-gray-100 text-center">
        <FaCheckCircle className="text-green-500 w-16 h-16 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h1>
        <p className="text-lg text-gray-600 mb-8">Thank you for your purchase. Your order has been confirmed.</p>
        <Link
          to="/orders"
          className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors duration-200 shadow-md"
        >
          View My Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccessPage; 