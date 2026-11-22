import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ReviewProvider } from './context/ReviewContext';
import { ScrollProvider } from './context/ScrollContext';

import Header from './components/Header';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import AccountPage from './pages/AccountPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <ReviewProvider>
              <ScrollProvider>
                <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                  <Header />
                  <main style={{ flex: '1 0 auto' }}>
                    <Routes>
                      {/* 1. Homepage */}
                      <Route path="/" element={<HomePage />} />
                      
                      {/* 2. Product Listing Page */}
                      <Route path="/shop" element={<ShopPage />} />
                      
                      {/* 3. FULL-SCREEN PRODUCT DETAILS PAGE */}
                      <Route path="/product/:id" element={<ProductDetailsPage />} />
                      
                      {/* 4. Cart and Wishlist */}
                      <Route path="/cart" element={<CartPage />} />
                      <Route path="/wishlist" element={<WishlistPage />} />
                      
                      {/* 5. Login & Signup */}
                      <Route path="/signin" element={<SignInPage />} />
                      <Route path="/signup" element={<SignUpPage />} />
                      <Route path="/account" element={<AccountPage />} />
                      
                      {/* 6. Information Pages */}
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                      
                      {/* Fallback */}
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </ScrollProvider>
            </ReviewProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
