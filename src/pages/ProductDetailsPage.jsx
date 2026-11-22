import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Heart, 
  Star, 
  ShoppingBag, 
  Zap, 
  Truck, 
  ShieldCheck, 
  Sparkles, 
  RotateCcw, 
  Gift, 
  Check, 
  CheckCircle2, 
  Info,
  Calendar,
  Share2
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useScroll } from '../context/ScrollContext';
import ReviewSection from '../components/ReviewSection';
import ProductCard from '../components/ProductCard';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { getScrollPosition } = useScroll();

  // Find target product
  const product = PRODUCTS.find(p => p.id === id);

  // Fallback if ID is invalid
  if (!product) {
    return (
      <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Handcrafted Product Not Found</h2>
        <p style={{ marginBottom: '24px' }}>The handmade piece you were searching for has moved or sold out.</p>
        <Link to="/shop" className="btn btn-primary">
          <ArrowLeft size={16} /> Back to Catalog
        </Link>
      </div>
    );
  }

  // Selected Image in Gallery
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Product Selection States
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0] : 'Standard'
  );
  const [customizationText, setCustomizationText] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [includeGiftWrap, setIncludeGiftWrap] = useState(false);
  const [zipCode, setZipCode] = useState('');
  const [deliveryEstimate, setDeliveryEstimate] = useState(null);
  const [addedToast, setAddedToast] = useState(false);

  // Recently Viewed persistence
  useEffect(() => {
    try {
      const stored = localStorage.getItem('auracraft_recently_viewed');
      let recents = stored ? JSON.parse(stored) : [];
      recents = [product.id, ...recents.filter(x => x !== product.id)].slice(0, 8);
      localStorage.setItem('auracraft_recently_viewed', JSON.stringify(recents));
    } catch (e) {
      console.error(e);
    }
    // Scroll page to top when opening this full-screen details page
    window.scrollTo({ top: 0, behavior: 'instant' });
    setActiveImageIndex(0);
  }, [id, product.id]);

  const isFavorited = isInWishlist(product.id);

  // Return to previous listing at EXACT scroll position
  const handleBackNavigation = () => {
    // If there is browser history, navigate back
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/shop');
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, {
      color: selectedColor,
      customization: customizationText.trim() + (includeGiftWrap ? ' [With Botanical Gift Wrap]' : '')
    });
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, {
      color: selectedColor,
      customization: customizationText.trim() + (includeGiftWrap ? ' [With Botanical Gift Wrap]' : '')
    });
    navigate('/cart');
  };

  const handleCheckDelivery = (e) => {
    e.preventDefault();
    if (zipCode.trim().length >= 4) {
      setDeliveryEstimate(`Estimated delivery to ${zipCode.trim()}: in 3 to 5 business days with tracking.`);
    }
  };

  // Sections for CONTINUOUS VERTICAL SCROLLING below reviews:
  // 1. Related Products (same category)
  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  // 2. You May Also Like (complementary items)
  const youMayAlsoLike = PRODUCTS.filter(p => p.collection === product.collection && p.id !== product.id).slice(0, 4);

  // 3. Similar Handmade Gifts (similar price tier or occasion)
  const similarHandmadeGifts = PRODUCTS.filter(p => p.occasion === product.occasion && p.id !== product.id).slice(0, 4);

  // 4. Recently Viewed Products (from localStorage)
  const recentlyViewedIds = (() => {
    try {
      const stored = localStorage.getItem('auracraft_recently_viewed');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  })();
  const recentlyViewedProducts = recentlyViewedIds
    .filter(pid => pid !== product.id)
    .map(pid => PRODUCTS.find(p => p.id === pid))
    .filter(Boolean)
    .slice(0, 4);

  // 5. Trending Products
  const trendingShowcase = PRODUCTS.filter(p => p.trending && p.id !== product.id).slice(0, 4);

  // 6. More Collections
  const moreCollectionsProducts = PRODUCTS.filter(p => p.isNew && p.id !== product.id).slice(0, 4);

  return (
    <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '100vh', padding: '32px 0 100px' }}>
      <div className="container">
        {/* CLEARLY VISIBLE BACK BUTTON - Returns to exact previous scroll position */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <button 
            onClick={handleBackNavigation}
            className="btn btn-secondary"
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '10px', 
              padding: '12px 24px', 
              fontSize: '0.95rem',
              fontWeight: '700',
              borderRadius: 'var(--radius-full)',
              backgroundColor: '#ffffff',
              boxShadow: 'var(--shadow-sm)'
            }}
            title="Return to the previous product listing at exact scroll position"
          >
            <ArrowLeft size={20} style={{ color: 'var(--color-terracotta)' }} />
            <span>← Back to Products</span>
          </button>

          {/* Breadcrumb path */}
          <div style={{ fontSize: '0.85rem', color: 'var(--color-charcoal-muted)' }}>
            <Link to="/" style={{ color: 'var(--color-charcoal-muted)' }}>Home</Link> / {' '}
            <Link to="/shop" style={{ color: 'var(--color-charcoal-muted)' }}>Catalog</Link> / {' '}
            <span style={{ color: 'var(--color-terracotta)', fontWeight: '600' }}>{product.category}</span>
          </div>
        </div>

        {/* Added to Cart Notification Toast */}
        {addedToast && (
          <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 1000, backgroundColor: 'var(--color-charcoal)', color: '#ffffff', padding: '16px 24px', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-xl)', display: 'flex', alignItems: 'center', gap: '14px', border: '1px solid var(--color-terracotta)' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--color-terracotta)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Check size={18} />
            </div>
            <div>
              <p style={{ fontWeight: '700', fontSize: '0.95rem' }}>Added to Shopping Bag!</p>
              <p style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.8)' }}>{quantity}x {product.name}</p>
            </div>
            <Link to="/cart" className="btn btn-primary btn-sm" style={{ marginLeft: '12px' }}>
              View Cart
            </Link>
          </div>
        )}

        {/* FULL-SCREEN HERO PRODUCT SECTION: Gallery (Left) + Purchase Configuration (Right) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1.1fr) minmax(320px, 1fr)', gap: '48px', alignItems: 'start', marginBottom: '64px' }} className="product-details-grid">
          
          {/* LEFT: LARGE PRODUCT IMAGE GALLERY */}
          <div>
            {/* Main Stage Image */}
            <div style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', backgroundColor: 'var(--color-warm-beige-light)', border: '1px solid var(--color-border)', aspectRatio: '1 / 1', marginBottom: '16px', boxShadow: 'var(--shadow-md)' }}>
              <img 
                src={product.images[activeImageIndex] || product.images[0]} 
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              {/* Wishlist Button floating over gallery */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`wishlist-btn-card ${isFavorited ? 'active' : ''}`}
                style={{ position: 'absolute', top: '16px', right: '16px', width: '44px', height: '44px' }}
                aria-label="Save to wishlist"
                title="Add to Wishlist"
              >
                <Heart size={22} fill={isFavorited ? 'currentColor' : 'none'} />
              </button>

              {/* Badges */}
              <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {product.personalized && <span className="badge badge-rose">Personalized</span>}
                {product.discountPercent > 0 && <span className="badge badge-beige">Save {product.discountPercent}%</span>}
              </div>
            </div>

            {/* Thumbnail Row (Multiple Product Images) */}
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${product.images.length}, 1fr)`, gap: '12px' }}>
              {product.images.map((imgSrc, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  style={{
                    aspectRatio: '1 / 1',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    border: activeImageIndex === idx ? '2.5px solid var(--color-terracotta)' : '1px solid var(--color-border)',
                    padding: '2px',
                    backgroundColor: '#ffffff',
                    cursor: 'pointer',
                    transition: 'var(--transition)'
                  }}
                  title={`View image ${idx + 1}`}
                >
                  <img src={imgSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                </button>
              ))}
            </div>

            {/* Craft Specs Cards */}
            <div style={{ marginTop: '28px', backgroundColor: 'var(--color-cream-light)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '12px', color: 'var(--color-charcoal)' }}>
                Artisan Specifications
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem' }}>
                <li><strong>Materials:</strong> {product.materials}</li>
                <li><strong>Dimensions:</strong> {product.dimensions}</li>
                <li><strong>Studio Lead Time:</strong> {product.craftTime}</li>
                <li><strong>Stock Status:</strong> <span style={{ color: 'var(--color-sage-dark)', fontWeight: '600' }}>In Stock ({product.stock} available)</span></li>
              </ul>
            </div>
          </div>

          {/* RIGHT: PRODUCT INFO, CUSTOMIZATION, & ACTIONS */}
          <div style={{ backgroundColor: 'var(--color-cream-light)', padding: '36px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <span className="badge badge-sage" style={{ marginBottom: '10px' }}>
              {product.category}
            </span>

            <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontFamily: 'var(--font-serif)', marginBottom: '12px', lineHeight: 1.2 }}>
              {product.name}
            </h1>

            {/* Rating Stars & Count */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    fill={i < Math.floor(product.rating) ? '#F5A623' : '#F5A623'} 
                    stroke="#F5A623" 
                  />
                ))}
              </div>
              <span style={{ fontWeight: '700', color: 'var(--color-charcoal)' }}>{product.rating}</span>
              <span style={{ color: 'var(--color-charcoal-muted)' }}>• {product.reviewCount} customer reviews</span>
            </div>

            {/* Pricing Section */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid var(--color-border)' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: '700', color: 'var(--color-terracotta)' }}>
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: '1.25rem', color: 'var(--color-charcoal-subtle)', textDecoration: 'line-through' }}>
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {product.discountPercent > 0 && (
                <span className="badge badge-terracotta" style={{ fontSize: '0.85rem' }}>
                  Save ₹{(((product.originalPrice || 0) - product.price)).toLocaleString('en-IN')} ({product.discountPercent}% OFF)
                </span>
              )}
            </div>

            {/* Full Artisanal Description */}
            <div style={{ marginBottom: '28px' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Maker's Story & Description
              </h4>
              <p style={{ fontSize: '0.98rem', lineHeight: '1.7', color: 'var(--color-charcoal-muted)' }}>
                {product.description}
              </p>
            </div>

            {/* COLOR OPTIONS */}
            {product.colors && product.colors.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <label className="form-label">
                  Colour & Glaze: <strong>{selectedColor}</strong>
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {product.colors.map(col => (
                    <button
                      key={col}
                      type="button"
                      onClick={() => setSelectedColor(col)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: 'var(--radius-full)',
                        border: selectedColor === col ? '2px solid var(--color-terracotta)' : '1px solid var(--color-border-dark)',
                        backgroundColor: selectedColor === col ? 'var(--color-terracotta-subtle)' : '#ffffff',
                        color: selectedColor === col ? 'var(--color-terracotta-dark)' : 'var(--color-charcoal)',
                        fontWeight: selectedColor === col ? '700' : '500',
                        fontSize: '0.88rem',
                        transition: 'var(--transition)'
                      }}
                    >
                      {col}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CUSTOMIZATION OPTIONS (if applicable) */}
            {product.customizable && (
              <div style={{ backgroundColor: 'var(--color-dusty-rose-subtle)', padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-dusty-rose-light)', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <Sparkles size={16} style={{ color: 'var(--color-terracotta)' }} />
                  <label htmlFor="customization-input" className="form-label" style={{ margin: 0, fontWeight: '700' }}>
                    Custom Engraving / Personalization
                  </label>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-charcoal-muted)', marginBottom: '10px' }}>
                  {product.customizationPrompt || "Enter names, monogram, date or loving note to be custom made:"}
                </p>
                <input
                  id="customization-input"
                  type="text"
                  className="form-control"
                  placeholder="e.g. 'Emma & Julian 2026' or 'Initial E'"
                  value={customizationText}
                  onChange={(e) => setCustomizationText(e.target.value)}
                />
              </div>
            )}

            {/* Botanical Gift Wrap Add-on */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', cursor: 'pointer', color: 'var(--color-charcoal)' }}>
                <input
                  type="checkbox"
                  checked={includeGiftWrap}
                  onChange={(e) => setIncludeGiftWrap(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: 'var(--color-terracotta)' }}
                />
                <Gift size={18} style={{ color: 'var(--color-terracotta)' }} />
                <span>Add Handwritten Botanical Gift Wrap & Wax Seal (+Free)</span>
              </label>
            </div>

            {/* QUANTITY SELECTOR & PRIMARY ACTION BUTTONS */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
              {/* Quantity Selector */}
              <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--color-border-dark)', borderRadius: 'var(--radius-full)', backgroundColor: '#ffffff', overflow: 'hidden' }}>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ width: '40px', height: '44px', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span style={{ minWidth: '40px', textAlign: 'center', fontWeight: '700', fontSize: '1rem' }}>
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ width: '40px', height: '44px', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="btn btn-primary"
                style={{ flex: '1 1 180px', padding: '14px 28px' }}
              >
                <ShoppingBag size={20} />
                <span>Add to Cart</span>
              </button>

              {/* Buy Now Button */}
              <button
                type="button"
                onClick={handleBuyNow}
                className="btn btn-sage"
                style={{ flex: '1 1 140px', padding: '14px 24px' }}
              >
                <Zap size={20} />
                <span>Buy Now</span>
              </button>

              {/* Wishlist Toggle Button */}
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`btn btn-secondary ${isFavorited ? 'active' : ''}`}
                style={{ padding: '14px', borderRadius: 'var(--radius-full)' }}
                title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
                aria-label="Toggle Wishlist"
              >
                <Heart size={20} fill={isFavorited ? 'var(--color-terracotta)' : 'none'} color={isFavorited ? 'var(--color-terracotta)' : 'currentColor'} />
              </button>
            </div>

            {/* DELIVERY INFORMATION & PINCODE CHECKER */}
            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '24px', marginTop: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <Truck size={18} style={{ color: 'var(--color-sage-dark)' }} />
                <h4 style={{ fontSize: '0.95rem', fontWeight: '700', margin: 0 }}>Delivery Information</h4>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-charcoal-muted)', marginBottom: '14px' }}>
                {product.deliveryInfo}
              </p>

              {/* Zip/Pincode Checker */}
              <form onSubmit={handleCheckDelivery} style={{ display: 'flex', gap: '8px', maxWidth: '320px' }}>
                <input
                  type="text"
                  placeholder="Enter ZIP code..."
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="form-control"
                  style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                />
                <button type="submit" className="btn btn-secondary btn-sm">
                  Estimate
                </button>
              </form>
              {deliveryEstimate && (
                <p style={{ fontSize: '0.82rem', color: 'var(--color-sage-dark)', fontWeight: '600', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={14} /> {deliveryEstimate}
                </p>
              )}
            </div>

            {/* Guarantees Box */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginTop: '24px', paddingTop: '20px', borderTop: '1px dashed var(--color-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--color-charcoal-muted)' }}>
                <RotateCcw size={16} style={{ color: 'var(--color-terracotta)' }} />
                <span>30-Day Artisan Exchange</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--color-charcoal-muted)' }}>
                <ShieldCheck size={16} style={{ color: 'var(--color-terracotta)' }} />
                <span>Secure Checkout Encryption</span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            SECTION 4: PRODUCT REVIEW SYSTEM (Write review + HORIZONTAL scroll boxes)
            ========================================================================= */}
        <ReviewSection productId={product.id} productName={product.name} />

        {/* =========================================================================
            SECTION 5: CONTINUOUS VERTICAL SCROLLING BELOW REVIEWS
            Display continuous natural vertical sections:
            - Related Products
            - You May Also Like
            - Similar Handmade Gifts
            - Recently Viewed Products
            - Trending Products
            - More Collections
            ========================================================================= */}
        <div style={{ marginTop: '56px' }}>
          
          {/* 5.1 Related Products */}
          {relatedProducts.length > 0 && (
            <div style={{ marginBottom: '60px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
                <div>
                  <span className="badge badge-terracotta" style={{ marginBottom: '6px' }}>Matching Medium</span>
                  <h3 style={{ fontSize: '1.85rem' }}>Related in {product.category}</h3>
                </div>
                <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="btn btn-outline btn-sm">
                  View More {product.category}
                </Link>
              </div>
              <div className="product-grid">
                {relatedProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}

          {/* 5.2 You May Also Like */}
          {youMayAlsoLike.length > 0 && (
            <div style={{ marginBottom: '60px', backgroundColor: 'var(--color-warm-beige-light)', padding: '36px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
                <div>
                  <span className="badge badge-sage" style={{ marginBottom: '6px' }}>Artisan Harmony</span>
                  <h3 style={{ fontSize: '1.85rem' }}>You May Also Like</h3>
                  <p style={{ fontSize: '0.9rem' }}>Curated companions that match the same aesthetic atmosphere.</p>
                </div>
              </div>
              <div className="product-grid">
                {youMayAlsoLike.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}

          {/* 5.3 Similar Handmade Gifts */}
          {similarHandmadeGifts.length > 0 && (
            <div style={{ marginBottom: '60px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
                <div>
                  <span className="badge badge-rose" style={{ marginBottom: '6px' }}>Perfect For Occasions</span>
                  <h3 style={{ fontSize: '1.85rem' }}>Similar Handmade Gifts</h3>
                </div>
              </div>
              <div className="product-grid">
                {similarHandmadeGifts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}

          {/* 5.4 Recently Viewed Products */}
          {recentlyViewedProducts.length > 0 && (
            <div style={{ marginBottom: '60px', backgroundColor: 'var(--color-cream-light)', padding: '36px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
              <div style={{ marginBottom: '24px' }}>
                <span className="badge badge-beige" style={{ marginBottom: '6px' }}>Your Journey</span>
                <h3 style={{ fontSize: '1.85rem' }}>Recently Viewed Products</h3>
                <p style={{ fontSize: '0.9rem' }}>Pick up where you left off from your studio exploration.</p>
              </div>
              <div className="product-grid">
                {recentlyViewedProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}

          {/* 5.5 Trending Products */}
          <div style={{ marginBottom: '60px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
              <div>
                <span className="badge badge-terracotta" style={{ marginBottom: '6px' }}>In High Demand</span>
                <h3 style={{ fontSize: '1.85rem' }}>Trending Across The Workshop</h3>
              </div>
              <Link to="/shop?filter=trending" className="btn btn-outline btn-sm">
                Explore All Trending
              </Link>
            </div>
            <div className="product-grid">
              {trendingShowcase.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>

          {/* 5.6 More Collections Continuous Horizon */}
          <div style={{ backgroundColor: 'var(--color-dusty-rose-subtle)', padding: '40px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', textAlign: 'center' }}>
            <span className="badge badge-rose" style={{ marginBottom: '10px' }}>Keep Exploring</span>
            <h3 style={{ fontSize: '2rem', marginBottom: '10px' }}>More Handcrafted Collections</h3>
            <p style={{ maxWidth: '600px', margin: '0 auto 28px', color: 'var(--color-charcoal-muted)' }}>
              Over 50 original studio pieces are waiting for you. Each piece holds a story from a maker's wheel, loom, or workbench.
            </p>
            <div className="product-grid" style={{ marginBottom: '32px' }}>
              {moreCollectionsProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            <Link to="/shop" className="btn btn-primary btn-lg">
              Browse Entire 50+ Product Catalog
            </Link>
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .product-details-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </div>
  );
}
