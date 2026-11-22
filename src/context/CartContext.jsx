import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('auracraft_cart');
      return saved ? JSON.parse(saved) : [
        {
          id: "p1",
          name: "Hand-Thrown Terracotta Ceramic Mug",
          price: 499,
          originalPrice: 699,
          quantity: 1,
          selectedColor: "Terracotta & Cream",
          customization: "",
          image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&q=80",
          category: "Pottery & Ceramics"
        }
      ];
    } catch {
      return [];
    }
  });

  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('auracraft_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1, options = {}) => {
    setCartItems(prev => {
      const color = options.color || (product.colors && product.colors[0]) || 'Standard';
      const customization = options.customization || '';
      
      const itemKey = `${product.id}-${color}-${customization}`;
      const existingIndex = prev.findIndex(item => 
        `${item.id}-${item.selectedColor}-${item.customization || ''}` === itemKey
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            quantity,
            selectedColor: color,
            customization,
            image: product.images[0],
            category: product.category,
            materials: product.materials
          }
        ];
      }
    });
  };

  const removeFromCart = (itemId, color, customization) => {
    setCartItems(prev =>
      prev.filter(item => {
        if (color !== undefined && customization !== undefined) {
          return !(item.id === itemId && item.selectedColor === color && (item.customization || '') === (customization || ''));
        }
        return item.id !== itemId;
      })
    );
  };

  const updateQuantity = (itemId, color, customization, newQty) => {
    if (newQty <= 0) {
      removeFromCart(itemId, color, customization);
      return;
    }
    setCartItems(prev =>
      prev.map(item => {
        if (item.id === itemId && item.selectedColor === color && (item.customization || '') === (customization || '')) {
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  // Blinkit Fast Card Add / Stepper Helpers
  const getItemQuantity = (productId) => {
    const items = cartItems.filter(item => item.id === productId);
    return items.reduce((acc, curr) => acc + curr.quantity, 0);
  };

  const incrementItem = (product) => {
    const existing = cartItems.find(item => item.id === product.id);
    if (existing) {
      updateQuantity(existing.id, existing.selectedColor, existing.customization, existing.quantity + 1);
    } else {
      addToCart(product, 1);
    }
  };

  const decrementItem = (productId) => {
    const existing = cartItems.find(item => item.id === productId);
    if (existing) {
      if (existing.quantity > 1) {
        updateQuantity(existing.id, existing.selectedColor, existing.customization, existing.quantity - 1);
      } else {
        removeFromCart(existing.id, existing.selectedColor, existing.customization);
      }
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setDiscountAmount(0);
    setCouponCode('');
  };

  const applyCoupon = (code) => {
    setCouponError('');
    setCouponSuccess('');
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'HANDMADE15' || cleanCode === 'WELCOME15') {
      const discount = Math.round(subtotal * 0.15);
      setDiscountAmount(discount);
      setCouponSuccess('15% Artisan Discount Applied!');
      setCouponCode(cleanCode);
      return true;
    } else if (cleanCode === 'FREESHIP') {
      setDiscountAmount(49);
      setCouponSuccess('Free Standard Shipping code applied!');
      setCouponCode(cleanCode);
      return true;
    } else {
      setCouponError('Invalid promo code. Try "HANDMADE15" or "FREESHIP".');
      return false;
    }
  };

  const removeCoupon = () => {
    setCouponCode('');
    setDiscountAmount(0);
    setCouponSuccess('');
    setCouponError('');
  };

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  // Free delivery for orders above ₹499
  const estimatedShipping = subtotal > 499 || couponCode === 'FREESHIP' || subtotal === 0 ? 0 : 49;
  const estimatedTax = Math.round(subtotal * 0.05); // 5% GST
  const finalTotal = Math.max(0, subtotal - discountAmount + estimatedShipping + (subtotal > 0 ? estimatedTax : 0));

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItemsCount,
        subtotal,
        discountAmount,
        estimatedShipping,
        estimatedTax,
        finalTotal,
        couponCode,
        couponError,
        couponSuccess,
        addToCart,
        removeFromCart,
        updateQuantity,
        getItemQuantity,
        incrementItem,
        decrementItem,
        clearCart,
        applyCoupon,
        removeCoupon
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
