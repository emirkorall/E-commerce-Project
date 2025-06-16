import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaStar, FaShoppingCart, FaHeart, FaArrowLeft, FaTruck, FaUndo, FaShieldAlt, FaCheck, FaTrash } from 'react-icons/fa';
import { featuredProducts } from '../components/ProductCard';
import { addItemToCart, removeItemFromCart, updateItemQuantity } from '../store/slices/cartSlice';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  
  const cartItems = useSelector(state => state.cart.items);
  const productInCart = cartItems.find(item => item.id === parseInt(id));
  const product = featuredProducts.find(p => p.id === parseInt(id));

  useEffect(() => {
    if (!product) {
      navigate('/shop');
    }
  }, [product, navigate]);

  useEffect(() => {
    if (productInCart) {
      setQuantity(productInCart.quantity);
    }
  }, [productInCart]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
      if (productInCart) {
        dispatch(updateItemQuantity({ id: productInCart.id, quantity: newQuantity }));
      }
    }
  };

  const totalPrice = product.price * quantity;
  const originalPrice = product.discount 
    ? (product.price * (1 + product.discount/100)) * quantity 
    : null;
  const totalSavings = originalPrice 
    ? originalPrice - totalPrice 
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/shop')}
            className="flex items-center text-gray-600 hover:text-purple-600 transition duration-300 bg-white px-4 py-2 rounded-md border border-gray-200 hover:border-purple-200"
          >
            <FaArrowLeft className="mr-2" />
            Back to Shop
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            <div>
              <div className="relative bg-gray-50 rounded-lg overflow-hidden aspect-square">
                      <img
                        src={product.image}
                        alt={product.name}
                  className="w-full h-full object-contain p-8"
                      />
                    {product.isNew && (
                  <div className="absolute top-4 left-4 bg-purple-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                        NEW
                      </div>
                    )}
                    {product.discount && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                        -{product.discount}%
                      </div>
                    )}
              </div>
                  </div>

            <div className="flex flex-col">
              <div className="mb-6">
                      <span className="text-sm text-gray-500">{product.category}</span>
                <h1 className="text-3xl font-bold text-gray-800 mt-1">{product.name}</h1>
                <div className="flex items-center mt-2">
                      <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 ml-2">({product.rating})</span>
                      </div>
                    </div>

              <div className="mb-6">
                <div className="flex items-center">
                  <p className="text-4xl font-bold text-purple-600 mr-3">${product.price}</p>
                  {product.discount && (
                    <p className="text-xl text-gray-400 line-through">
                      ${(product.price * (1 + product.discount/100)).toFixed(2)}
                    </p>
                  )}
                </div>
                      {product.discount && (
                  <p className="text-sm text-green-600 mt-1">
                    Save ${((product.price * (1 + product.discount/100)) - product.price).toFixed(2)} ({product.discount}% off)
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="w-10 h-10 rounded-md border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 bg-white"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-gray-700">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-10 h-10 rounded-md border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 bg-white"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Unit Price:</span>
                  <span className="text-gray-800">${product.price}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="text-gray-800">{quantity}</span>
                </div>
                <div className="border-t border-gray-200 my-2"></div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-800">Total Price:</span>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-purple-600">${totalPrice.toFixed(2)}</p>
                    {originalPrice && (
                      <p className="text-sm text-gray-400 line-through">${originalPrice.toFixed(2)}</p>
                    )}
                  </div>
                </div>
                {totalSavings && (
                  <p className="text-sm text-green-600 mt-1 text-right">
                    You save: ${totalSavings.toFixed(2)}
                  </p>
                      )}
                    </div>

              <div className="space-y-3 mb-8">
                {productInCart ? (
                  <div className="space-y-3">
                    <button 
                      className="w-full bg-purple-600 text-white py-3 px-6 rounded-md hover:bg-purple-700 transition duration-300 flex items-center justify-center font-medium"
                      onClick={() => dispatch(removeItemFromCart(product.id))}
                    >
                      <FaTrash className="mr-2" />
                      Remove from Cart
                    </button>
                    <p className="text-center text-sm text-green-600">Item is in your cart. Quantity: {productInCart.quantity}</p>
                    <p className="text-center text-xs text-gray-500">Adjust quantity above or remove.</p>
                  </div>
                ) : (
                  <button 
                    className="w-full bg-purple-600 text-white py-3 px-6 rounded-md hover:bg-purple-700 transition duration-300 flex items-center justify-center font-medium"
                    onClick={() => dispatch(addItemToCart({ ...product, quantity }))}
                  >
                    <FaShoppingCart className="mr-2" />
                    Add to Cart
                  </button>
                )}
                <button className="w-full bg-white text-purple-600 py-3 px-6 rounded-md border border-purple-600 hover:bg-purple-50 transition duration-300 flex items-center justify-center font-medium">
                  <FaHeart className="mr-2" />
                  Add to Wishlist
                </button>
              </div>

                    {product.features && (
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Key Features</h2>
                  <ul className="space-y-3">
                          {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <FaCheck className="text-green-500 mr-3 flex-shrink-0" />
                        <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

              <div className="border-t border-gray-200 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <FaTruck className="text-purple-600 mr-3" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-800">Free Shipping</h3>
                      <p className="text-xs text-gray-500">On orders over $100</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaUndo className="text-purple-600 mr-3" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-800">Easy Returns</h3>
                      <p className="text-xs text-gray-500">30 day return policy</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaShieldAlt className="text-purple-600 mr-3" />
                    <div>
                      <h3 className="text-sm font-medium text-gray-800">Warranty</h3>
                      <p className="text-xs text-gray-500">2 year warranty</p>
                    </div>
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

export default ProductDetailPage; 