import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';
import { useCart } from './CartContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { addToCart } = useCart();
  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      const saved = localStorage.getItem('auracraft_wishlist');
      return saved ? JSON.parse(saved) : ["p7", "p13", "p25"];
    } catch {
      return ["p7", "p13", "p25"];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('auracraft_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  const isInWishlist = (productId) => wishlistIds.includes(productId);

  const toggleWishlist = (productId) => {
    setWishlistIds(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistIds(prev => prev.filter(id => id !== productId));
  };

  const moveWishlistItemToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  // Resolve full product objects for the current wishlist ids
  const wishlistProducts = wishlistIds
    .map(id => PRODUCTS.find(p => p.id === id))
    .filter(Boolean);

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistProducts,
        wishlistCount: wishlistIds.length,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        moveWishlistItemToCart
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
