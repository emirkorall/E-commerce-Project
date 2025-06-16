import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeItemFromCart, updateItemQuantity } from '../store/slices/cartSlice';
import { FaTrash } from 'react-icons/fa';
import axiosInstance from '../utils/axios';
import { autoLogin } from '../store/actions/thunk';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.client);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState(items.map(item => item.id));
  
  const selectedItems = items.filter(item => selectedIds.includes(item.id));
  const selectedCount = selectedItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = selectedItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleProceedToCheckout = async () => {
    try {
      setIsLoading(true);

      if (selectedItems.length === 0) return;

      if (user?.id) {
        navigate('/order');
        return;
      }

      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login', { state: { from: '/order' } });
        return;
      }

      const result = await dispatch(autoLogin());
      
      if (result?.payload?.id) {
        navigate('/order');
      } else {
        navigate('/login', { state: { from: '/order' } });
      }
    } catch (error) {
      navigate('/login', { state: { from: '/order' } });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-2 py-4 min-h-[60vh] flex flex-col justify-start">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Your Shopping Cart</h1>
      {items.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 space-y-2">
            {items.map((item) => (
              <div key={item.id} className="bg-white shadow rounded p-3 flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(item.id)}
                  onChange={() => setSelectedIds(prev => prev.includes(item.id) ? prev.filter(i => i !== item.id) : [...prev, item.id])}
                  className="mr-2 mt-1 sm:mt-0"
                />
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded self-center sm:self-auto" />
                <div className="flex-1">
                  <h2 className="text-base font-semibold text-gray-700 truncate">{item.name}</h2>
                  <p className="text-xs text-gray-500">Price: ${item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-1 space-x-2">
                    <button
                      className="px-2 py-1 bg-gray-200 rounded text-xs font-bold hover:bg-gray-300"
                      onClick={() => dispatch(updateItemQuantity({ id: item.id, quantity: Math.max(1, item.quantity - 1) }))}
                      disabled={item.quantity <= 1}
                    >-</button>
                    <span className="text-xs text-gray-700">{item.quantity}</span>
                    <button
                      className="px-2 py-1 bg-gray-200 rounded text-xs font-bold hover:bg-gray-300"
                      onClick={() => dispatch(updateItemQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                      disabled={item.quantity >= 10}
                    >+</button>
                  </div>
                </div>
                <div className="flex flex-col items-start sm:items-end space-y-1">
                  <p className="text-base font-semibold text-gray-700">${(item.price * item.quantity).toFixed(2)}</p>
                  <button 
                    onClick={() => dispatch(removeItemFromCart(item.id))} 
                    className="bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-200 text-xs px-2 py-1 rounded flex items-center"
                  >
                    <FaTrash className="mr-1" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white shadow rounded p-4 h-fit flex flex-col justify-between min-h-[200px]">
            <h2 className="text-lg font-semibold mb-3 text-gray-700 border-b pb-2">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-gray-600 text-sm">
                <span>Subtotal ({selectedCount} items)</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600 text-sm">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between text-gray-800 font-bold text-base pt-2 border-t mt-2">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={handleProceedToCheckout}
              disabled={selectedItems.length === 0 || isLoading}
              className="w-full bg-purple-600 text-white py-2 px-3 rounded hover:bg-purple-700 transition duration-300 font-semibold text-base mt-auto disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : 'Proceed to Checkout'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage; 