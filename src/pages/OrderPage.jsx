import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaCreditCard, FaLock, FaShoppingBag, FaPlus, FaCheck, FaHome, FaBuilding, FaPhone, FaUser } from 'react-icons/fa';
import { placeOrder } from '../store/actions/thunk';
import axiosInstance from '../utils/axios';
import { setUser } from '../store/actions/clientActions';

const OrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const { user, adressList, creditCards } = useSelector((state) => state.client);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [showNewCardForm, setShowNewCardForm] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [error, setError] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Form states
  const [newAddress, setNewAddress] = useState({
    title: '',
    name: '',
    surname: '',
    phone: '',
    city: '',
    district: '',
    neighborhood: '',
  });

  const [newCard, setNewCard] = useState({
    card_no: '',
    expire_month: '',
    expire_year: '',
    name_on_card: '',
    cvv: '',
  });

  // Generate months and years for dropdowns
  const months = Array.from({ length: 12 }, (_, i) => {
    const month = i + 1;
    return { value: month.toString().padStart(2, '0'), label: month.toString().padStart(2, '0') };
  });

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => {
    const year = currentYear + i;
    return { value: year.toString().slice(-2), label: year.toString() };
  });

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Validate card number
  const validateCardNumber = (number) => {
    const regex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
    return regex.test(number.replace(/\s/g, ''));
  };

  // Validate CVV
  const validateCVV = (cvv) => {
    return /^[0-9]{3,4}$/.test(cvv);
  };

  // Calculate totals
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  // Check authentication and cart items
  useEffect(() => {
    const checkAuthAndCart = async () => {
      const token = localStorage.getItem('token');
      
      // If no token, redirect to login
      if (!token) {
        navigate('/login');
        return;
      }

      // If no items in cart, redirect to cart
      if (!items || items.length === 0) {
        navigate('/cart');
        return;
      }

      try {
        // Set the token in axios headers
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Only fetch user data if we don't have it
        if (!user?.id) {
          const response = await axiosInstance.get('/user/profile');
          dispatch(setUser(response.data.user, response.data.adressList || [], response.data.creditCards || []));
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndCart();
  }, [dispatch, navigate, user?.id, items]);

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/user/address', newAddress);
      console.log('Address saved:', response.data);
      
      // Update the address list in the state
      const savedAddress = response.data[0];
      dispatch(setUser(user, [...adressList, savedAddress], creditCards));
      
      setShowNewAddressForm(false);
      setNewAddress({
        title: '',
        name: '',
        surname: '',
        phone: '',
        city: '',
        district: '',
        neighborhood: '',
      });
    } catch (error) {
      console.error('Error saving address:', error);
      setError(error.response?.data?.message || 'Failed to save address. Please try again.');
    }
  };

  const handleCardSubmit = async (e) => {
    e.preventDefault();

    // Validate card number and CVV
    const cardNumber = newCard.card_no.replace(/\s/g, '');
    if (!validateCardNumber(cardNumber)) {
      alert('Please enter a valid card number');
      return;
    }

    if (!validateCVV(newCard.cvv)) {
      alert('Please enter a valid CVV (3 or 4 digits)');
      return;
    }

    try {
      const response = await axiosInstance.post('/user/card', {
        ...newCard,
        card_no: cardNumber, // Send without spaces
      });
      console.log('Card saved:', response.data);

      // Update the credit cards list in the state (assuming backend returns the saved card object directly)
      // If your backend response structure is different, you might need to adjust this line
      dispatch(setUser(user, adressList, [...creditCards, response.data]));

      setShowNewCardForm(false);
      setNewCard({
        card_no: '',
        expire_month: '',
        expire_year: '',
        name_on_card: '',
        cvv: '',
      });
    } catch (error) {
      console.error('Error saving card:', error);
      setError(error.response?.data?.message || 'Failed to save card. Please try again.');
    }
  };

  const handlePlaceOrder = async () => {
    try {
      setIsPlacingOrder(true);
      setError(null);
      const orderData = {
        address: {},
        card: {},
        items: items.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        total: total,
        userId: user.id
      };
      await dispatch(placeOrder(orderData));
      setOrderSuccess(true);
      navigate('/order-success');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return null;
  }

  if (!user?.id) {
    return null;
  }

  if (orderSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="bg-white p-10 rounded-xl shadow-lg border border-gray-100 text-center">
          <h1 className="text-3xl font-bold text-purple-700 mb-4">Congratulations!</h1>
          <p className="text-lg text-gray-700 mb-6">Your order has been placed successfully.</p>
          <button
            className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors duration-200"
            onClick={() => navigate('/orders')}
          >
            View Previous Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Complete Your Order</h1>
        <p className="text-gray-600 text-center mb-8">Review your items and provide shipping & payment details</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Shipping & Payment */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Address Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="bg-white p-2 rounded-lg shadow-sm mr-3">
                    <FaMapMarkerAlt className="text-purple-600 w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">Shipping Address</h2>
                </div>
              </div>

              <div className="p-6">
                {/* Existing Addresses */}
                <div className="space-y-4 mb-6">
                  {adressList?.map((address) => (
                    <div
                      key={address.id}
                      className={`p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
                        selectedAddress?.id === address.id
                          ? 'border-purple-500 bg-purple-50 shadow-sm'
                          : 'border-gray-200 hover:border-purple-300 hover:shadow-sm'
                      }`}
                      onClick={() => setSelectedAddress(address)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            {address.title && address.title.toLowerCase().includes('home') ? (
                              <FaHome className="text-purple-600 w-4 h-4 mr-2" />
                            ) : (
                              <FaBuilding className="text-purple-600 w-4 h-4 mr-2" />
                            )}
                            <h3 className="font-medium text-gray-800">{address.title}</h3>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-600 flex items-center">
                              <FaUser className="w-3 h-3 mr-2 text-gray-400" />
                              {address.name} {address.surname}
                            </p>
                            <p className="text-sm text-gray-600">
                              {address.neighborhood}, {address.district}, {address.city}
                            </p>
                            <p className="text-sm text-gray-600 flex items-center">
                              <FaPhone className="w-3 h-3 mr-2 text-gray-400" />
                              {address.phone}
                            </p>
                          </div>
                        </div>
                        {selectedAddress?.id === address.id && (
                          <div className="ml-4 bg-purple-100 p-2 rounded-full">
                            <FaCheck className="text-purple-600 w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* New Address Form */}
                {showNewAddressForm ? (
                  <form onSubmit={handleAddressSubmit} className="space-y-6 bg-gray-50 rounded-xl p-6 border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address Title</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={newAddress.title}
                            onChange={(e) => setNewAddress({ ...newAddress, title: e.target.value })}
                            className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                            placeholder="e.g., Home, Work"
                            required
                          />
                          <FaHome className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={newAddress.name}
                            onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                            className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                            required
                          />
                          <FaUser className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Surname</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={newAddress.surname}
                            onChange={(e) => setNewAddress({ ...newAddress, surname: e.target.value })}
                            className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                            required
                          />
                          <FaUser className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <div className="relative">
                          <input
                            type="tel"
                            value={newAddress.phone}
                            onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                            className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                            required
                          />
                          <FaPhone className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={newAddress.city}
                            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                            className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                            required
                          />
                          <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={newAddress.district}
                            onChange={(e) => setNewAddress({ ...newAddress, district: e.target.value })}
                            className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                            required
                          />
                          <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Neighborhood</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={newAddress.neighborhood}
                            onChange={(e) => setNewAddress({ ...newAddress, neighborhood: e.target.value })}
                            className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                            required
                          />
                          <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowNewAddressForm(false)}
                        className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2.5 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors duration-200"
                      >
                        Save Address
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={() => setShowNewAddressForm(true)}
                    className="w-full px-4 py-3 text-sm font-medium text-purple-600 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors duration-200 flex items-center justify-center"
                  >
                    <FaPlus className="w-4 h-4 mr-2" />
                    Add New Address
                  </button>
                )}
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-4 border-b border-gray-100">
                <div className="flex items-center">
                  <div className="bg-white p-2 rounded-lg shadow-sm mr-3">
                    <FaCreditCard className="text-purple-600 w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">Payment Method</h2>
                </div>
              </div>

              <div className="p-6">
                {/* Existing Cards */}
                <div className="space-y-4 mb-6">
                  {creditCards?.map((card) => (
                    <div
                      key={card.id}
                      className={`p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
                        selectedCard?.id === card.id
                          ? 'border-purple-500 bg-purple-50 shadow-sm'
                          : 'border-gray-200 hover:border-purple-300 hover:shadow-sm'
                      }`}
                      onClick={() => setSelectedCard(card)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center mr-3">
                              <FaCreditCard className="text-purple-600 w-4 h-4" />
                            </div>
                            <div>
                              <span className="font-medium text-gray-800">
                                •••• •••• •••• {card.card_no.slice(-4)}
                              </span>
                              <p className="text-sm text-gray-500 mt-0.5">
                                Expires {card.expire_month}/{card.expire_year}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{card.name_on_card}</p>
                        </div>
                        {selectedCard?.id === card.id && (
                          <div className="ml-4 bg-purple-100 p-2 rounded-full">
                            <FaCheck className="text-purple-600 w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* New Card Form */}
                {showNewCardForm ? (
                  <form onSubmit={handleCardSubmit} className="space-y-6 bg-gray-50 rounded-xl p-6 border border-gray-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={newCard.card_no}
                            onChange={(e) => {
                              const formatted = formatCardNumber(e.target.value);
                              if (formatted.length <= 19) {
                                setNewCard({ ...newCard, card_no: formatted });
                              }
                            }}
                            className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                            placeholder="1234 5678 9012 3456"
                            maxLength="19"
                            required
                            autoComplete="cc-number"
                          />
                          <FaCreditCard className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name on Card</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={newCard.name_on_card}
                            onChange={(e) => setNewCard({ ...newCard, name_on_card: e.target.value })}
                            className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                            required
                            autoComplete="cc-name"
                          />
                          <FaUser className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Month</label>
                        <select
                          value={newCard.expire_month}
                          onChange={(e) => setNewCard({ ...newCard, expire_month: e.target.value })}
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                          required
                          autoComplete="cc-exp-month"
                        >
                          <option value="">MM</option>
                          {months.map((month) => (
                            <option key={month.value} value={month.value}>
                              {month.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Year</label>
                        <select
                          value={newCard.expire_year}
                          onChange={(e) => setNewCard({ ...newCard, expire_year: e.target.value })}
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                          required
                          autoComplete="cc-exp-year"
                        >
                          <option value="">YY</option>
                          {years.map((year) => (
                            <option key={year.value} value={year.value}>
                              {year.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                        <div className="relative">
                          <input
                            type="password"
                            value={newCard.cvv}
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^0-9]/g, '');
                              if (value.length <= 4) {
                                setNewCard({ ...newCard, cvv: value });
                              }
                            }}
                            className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                            placeholder="123"
                            maxLength="4"
                            required
                            autoComplete="cc-csc"
                          />
                          <div className="absolute right-3 top-3 text-gray-400">
                            <FaCreditCard className="w-4 h-4" />
                          </div>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">3 or 4 digits on the back of your card</p>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setShowNewCardForm(false)}
                        className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2.5 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors duration-200"
                      >
                        Save Card
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={() => setShowNewCardForm(true)}
                    className="w-full px-4 py-3 text-sm font-medium text-purple-600 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors duration-200 flex items-center justify-center"
                  >
                    <FaPlus className="w-4 h-4 mr-2" />
                    Add New Card
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-8">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-2 rounded-lg mr-3">
                  <FaShoppingBag className="text-purple-600 w-5 h-5" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
              </div>

              {/* Items List */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      <p className="text-sm font-medium text-purple-600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Totals */}
              <div className="border-t border-gray-100 pt-4 space-y-3">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <div className="flex justify-between text-base font-semibold text-gray-800 pt-3 border-t border-gray-100">
                  <span>Total</span>
                  <span className="text-purple-600">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={isPlacingOrder}
                className="w-full mt-6 px-4 py-3.5 text-base font-medium text-white bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg hover:from-purple-700 hover:to-purple-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-200 shadow-sm"
              >
                {isPlacingOrder ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <FaLock className="w-4 h-4 mr-2" />
                    Place Order
                  </>
                )}
              </button>

              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600 text-center">{error}</p>
                </div>
              )}

              {/* Security Notice */}
              <p className="mt-4 text-xs text-center text-gray-500 flex items-center justify-center">
                <FaLock className="w-3 h-3 mr-1.5 text-gray-400" />
                Your payment information is encrypted and secure
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage; 