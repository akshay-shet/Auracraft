import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Star, Plus, Minus, Zap } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useScroll } from '../context/ScrollContext';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { getItemQuantity, incrementItem, decrementItem } = useCart();
  const { saveScrollPosition } = useScroll();

  const isFavorited = isInWishlist(product.id);
  const cartQty = getItemQuantity(product.id);

  const handleCardClick = () => {
    saveScrollPosition('shop_scroll');
    navigate(`/product/${product.id}`);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleAddClick = (e) => {
    e.stopPropagation();
    incrementItem(product);
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    incrementItem(product);
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    decrementItem(product.id);
  };

  return (
    <div className="blinkit-card" onClick={handleCardClick}>
      {/* Top Image Container */}
      <div className="blinkit-card-img-wrap">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          loading="lazy" 
        />
        
        {/* Discount Badge */}
        {product.discountPercent > 0 && (
          <div className="blinkit-card-discount">
            {product.discountPercent}% OFF
          </div>
        )}

        {/* Wishlist Button */}
        <button 
          className={`blinkit-wishlist-btn ${isFavorited ? 'active' : ''}`}
          onClick={handleWishlistClick}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
          title={isFavorited ? 'Saved in Wishlist' : 'Add to Wishlist'}
        >
          <Heart size={16} fill={isFavorited ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Card Body */}
      <div className="blinkit-card-body">
        {/* Delivery Time Badge (Blinkit style) */}
        <div className="blinkit-delivery-tag">
          <Zap size={11} />
          <span>2-3 Days Delivery</span>
        </div>

        {/* Product Title */}
        <h3 className="blinkit-card-title" title={product.name}>
          {product.name}
        </h3>

        {/* Specs / Material Subtitle */}
        <div className="blinkit-card-meta">
          {product.dimensions ? product.dimensions.split('|')[0].trim() : product.category}
        </div>

        {/* Rating & Review count */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.74rem', color: 'var(--color-charcoal-muted)', marginBottom: '8px' }}>
          <Star size={12} fill="#F5A623" stroke="#F5A623" />
          <span style={{ fontWeight: '700', color: 'var(--color-charcoal)' }}>{product.rating}</span>
          <span>({product.reviewCount})</span>
        </div>

        {/* Bottom Price & Blinkit ADD Button / Stepper */}
        <div className="blinkit-card-bottom">
          <div className="blinkit-price-group">
            <span className="blinkit-current-price">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="blinkit-original-price">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Blinkit ADD Button or Counter Stepper */}
          {cartQty > 0 ? (
            <div className="blinkit-stepper" onClick={(e) => e.stopPropagation()}>
              <button 
                type="button" 
                onClick={handleDecrement}
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span>{cartQty}</span>
              <button 
                type="button" 
                onClick={handleIncrement}
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>
          ) : (
            <button 
              type="button" 
              className="blinkit-add-btn"
              onClick={handleAddClick}
              aria-label="Add to cart"
            >
              ADD
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
