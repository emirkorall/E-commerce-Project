import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from './layout/Header';
import Footer from './layout/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ContactPage from './pages/ContactPage';
import ProductDetailPage from './pages/ProductDetailPage';
import TeamPage from './pages/TeamPage';
import AboutUsPage from './pages/AboutUsPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import ProtectedRoute from './components/ProtectedRoute';
import { fetchRoles, autoLogin } from './store/actions/thunk';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check for token and verify it on app start
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(autoLogin());
    }
    // Fetch roles
    dispatch(fetchRoles());
  }, [dispatch]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-1 w-full">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop/:category" element={<ShopPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route 
              path="/order" 
              element={
                <ProtectedRoute>
                  <OrderPage />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
