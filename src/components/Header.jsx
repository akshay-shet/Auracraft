import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  User, 
  LogOut, 
  MapPin, 
  ChevronDown, 
  Gift, 
  X, 
  Menu, 
  Check, 
  Clock,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function Header() {
  const navigate = useNavigate();
  const { currentUser, isAuthenticated, logOut } = useAuth();
  const { totalItemsCount, finalTotal } = useCart();
  const { wishlistCount } = useWishlist();

  const [searchQuery, setSearchQuery] = useState('');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);

  // Delivery Location State (stored in localStorage for persistence)
  const [currentLocation, setCurrentLocation] = useState(() => {
    try {
      const saved = localStorage.getItem('auracraft_delivery_location');
      return saved || 'Bengaluru, KA 560001';
    } catch {
      return 'Bengaluru, KA 560001';
    }
  });
  const [inputLocation, setInputLocation] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const handleLocationSave = (e) => {
    e.preventDefault();
    if (inputLocation.trim()) {
      setCurrentLocation(inputLocation.trim());
      localStorage.setItem('auracraft_delivery_location', inputLocation.trim());
      setLocationModalOpen(false);
      setInputLocation('');
    }
  };

  const handleLogout = () => {
    logOut();
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate('/');
  };

  return (
    <>
      <header style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--color-border)' }}>
        {/* Top Mini Bar for Announcements */}
        <div style={{ backgroundColor: 'var(--color-cream)', borderBottom: '1px solid var(--color-border-subtle)', padding: '5px 0', fontSize: '0.78rem', color: 'var(--color-charcoal-muted)' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={13} style={{ color: 'var(--color-terracotta)' }} />
              <span>Handcrafted by independent Indian artisans • Free delivery on orders over ₹499</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <Link to="/about" style={{ color: 'var(--color-charcoal-muted)' }}>Our Story</Link>
              <Link to="/contact" style={{ color: 'var(--color-charcoal-muted)' }}>Help & Support</Link>
            </div>
          </div>
        </div>

        {/* Main Blinkit-Style Header Bar */}
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px', padding: '14px 20px' }}>
          
          {/* Left: Brand Logo & Blinkit Delivery Location Pill */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexShrink: 0 }}>
            {/* Unique Handmade Brand Logo */}
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
              <div style={{ 
                width: '38px', 
                height: '38px', 
                borderRadius: '10px', 
                backgroundColor: 'var(--color-terracotta)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: '#ffffff',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <Gift size={22} />
              </div>
              <div>
                <span style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '800', 
                  color: 'var(--color-charcoal)', 
                  letterSpacing: '-0.03em', 
                  display: 'block', 
                  lineHeight: 1 
                }}>
                  Aura<span style={{ color: 'var(--color-terracotta)' }}>Craft</span>
                </span>
                <span style={{ fontSize: '0.65rem', color: 'var(--color-charcoal-muted)', fontWeight: '700', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Handmade & Gifts
                </span>
              </div>
            </Link>

            {/* Vertical Divider */}
            <div style={{ width: '1px', height: '36px', backgroundColor: 'var(--color-border)', display: 'block' }} className="header-divider" />

            {/* Delivery Location Pill (Signature Blinkit UX) */}
            <div 
              onClick={() => setLocationModalOpen(true)}
              style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', padding: '4px 6px', borderRadius: 'var(--radius-sm)' }}
              className="header-location-pill"
              title="Click to change delivery location"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '0.86rem', fontWeight: '800', color: 'var(--color-charcoal)' }}>
                  Delivery in 2-3 Days
                </span>
                <ChevronDown size={14} style={{ color: 'var(--color-terracotta)' }} />
              </div>
              <span style={{ fontSize: '0.74rem', color: 'var(--color-charcoal-muted)', maxWidth: '170px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {currentLocation}
              </span>
            </div>
          </div>

          {/* Middle: Prominent Search Bar (Blinkit Style) */}
          <form 
            onSubmit={handleSearchSubmit} 
            style={{ 
              position: 'relative', 
              flex: '1 1 360px', 
              maxWidth: '560px' 
            }}
            className="blinkit-search-bar"
          >
            <div style={{ position: 'relative', width: '100%' }}>
              <Search 
                size={18} 
                style={{ 
                  position: 'absolute', 
                  left: '16px', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  color: 'var(--color-charcoal-muted)' 
                }} 
              />
              <input
                type="text"
                placeholder='Search "terracotta mugs", "resin coasters", "crochet bouquet"...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 42px 12px 46px',
                  borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--color-border)',
                  backgroundColor: 'var(--color-cream)',
                  fontSize: '0.92rem',
                  color: 'var(--color-charcoal)',
                  outline: 'none',
                  transition: 'var(--transition)'
                }}
                onFocus={(e) => {
                  e.target.style.backgroundColor = '#ffffff';
                  e.target.style.borderColor = 'var(--color-terracotta)';
                  e.target.style.boxShadow = '0 0 0 3px rgba(197, 107, 80, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.backgroundColor = 'var(--color-cream)';
                  e.target.style.borderColor = 'var(--color-border)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-charcoal-muted)' }}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </form>

          {/* Right: Wishlist, Login & Signature Blinkit Cart Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
            {/* Wishlist Link */}
            <Link 
              to="/wishlist" 
              title="My Wishlist" 
              style={{ position: 'relative', padding: '8px', color: 'var(--color-charcoal)', display: 'flex', alignItems: 'center' }}
            >
              <Heart size={22} />
              {wishlistCount > 0 && (
                <span style={{ 
                  position: 'absolute', 
                  top: '2px', 
                  right: '2px', 
                  backgroundColor: 'var(--color-dusty-rose-dark)', 
                  color: '#ffffff', 
                  fontSize: '0.68rem', 
                  fontWeight: '700', 
                  width: '18px', 
                  height: '18px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Login / User Account (Blinkit Style) */}
            {isAuthenticated ? (
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--color-cream)',
                    border: '1px solid var(--color-border)'
                  }}
                >
                  <div style={{ width: '26px', height: '26px', borderRadius: '50%', overflow: 'hidden', backgroundColor: 'var(--color-terracotta-light)' }}>
                    {currentUser.avatar ? (
                      <img src={currentUser.avatar} alt={currentUser.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <User size={16} style={{ color: '#fff', margin: '5px auto' }} />
                    )}
                  </div>
                  <span style={{ fontSize: '0.88rem', fontWeight: '700', maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <ChevronDown size={14} />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div style={{
                    position: 'absolute',
                    right: 0,
                    top: 'calc(100% + 8px)',
                    width: '210px',
                    backgroundColor: '#ffffff',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-lg)',
                    border: '1px solid var(--color-border)',
                    padding: '8px 0',
                    zIndex: 1000
                  }}>
                    <div style={{ padding: '8px 16px', borderBottom: '1px solid var(--color-border-subtle)', marginBottom: '4px' }}>
                      <p style={{ fontWeight: '700', fontSize: '0.88rem', color: 'var(--color-charcoal)' }}>{currentUser.name}</p>
                      <p style={{ fontSize: '0.74rem', color: 'var(--color-charcoal-muted)' }}>{currentUser.email}</p>
                    </div>
                    <Link to="/account" onClick={() => setUserDropdownOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', fontSize: '0.88rem' }}>
                      <User size={15} /> My Account
                    </Link>
                    <Link to="/account?tab=orders" onClick={() => setUserDropdownOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', fontSize: '0.88rem' }}>
                      <Clock size={15} /> My Orders
                    </Link>
                    <Link to="/wishlist" onClick={() => setUserDropdownOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', fontSize: '0.88rem' }}>
                      <Heart size={15} /> My Wishlist
                    </Link>
                    <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '8px 16px', fontSize: '0.88rem', color: 'var(--color-terracotta)', borderTop: '1px solid var(--color-border-subtle)', marginTop: '4px' }}>
                      <LogOut size={15} /> Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                to="/signin" 
                style={{ 
                  fontSize: '0.92rem', 
                  fontWeight: '700', 
                  color: 'var(--color-charcoal)', 
                  padding: '8px 14px', 
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'transparent'
                }}
              >
                Login
              </Link>
            )}

            {/* Signature Blinkit Cart Button (Green/Terracotta Accent with Item Count & Total in INR) */}
            <Link 
              to="/cart" 
              style={{
                backgroundColor: 'var(--color-terracotta)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '11px 18px',
                borderRadius: 'var(--radius-sm)',
                fontWeight: '700',
                fontSize: '0.92rem',
                boxShadow: 'var(--shadow-sm)',
                textDecoration: 'none',
                transition: 'var(--transition)'
              }}
              className="blinkit-cart-btn"
            >
              <ShoppingBag size={20} />
              {totalItemsCount > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.1 }}>
                  <span style={{ fontSize: '0.74rem', opacity: 0.9 }}>{totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}</span>
                  <span style={{ fontSize: '0.92rem', fontWeight: '800' }}>₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              ) : (
                <span>My Cart</span>
              )}
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ display: 'none', padding: '6px' }}
              className="mobile-header-toggle"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search and Menu Drawer */}
        {mobileMenuOpen && (
          <div style={{ backgroundColor: '#ffffff', borderTop: '1px solid var(--color-border)', padding: '16px 20px' }}>
            <form onSubmit={handleSearchSubmit} style={{ marginBottom: '16px' }}>
              <input
                type="text"
                placeholder="Search handmade gifts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-control"
              />
            </form>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link to="/" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: '600' }}>Home</Link>
              <Link to="/shop" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: '600' }}>All Products</Link>
              <Link to="/shop?filter=trending" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: '600' }}>Trending</Link>
              <Link to="/shop?filter=personalized" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: '600' }}>Personalized Gifts</Link>
              <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: '600' }}>Wishlist ({wishlistCount})</Link>
              <Link to="/cart" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: '600' }}>Cart ({totalItemsCount})</Link>
            </nav>
          </div>
        )}
      </header>

      {/* Delivery Location Selection Modal (Blinkit Style) */}
      {locationModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(38, 33, 31, 0.6)',
          backdropFilter: 'blur(3px)',
          zIndex: 1100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            padding: '28px',
            maxWidth: '440px',
            width: '100%',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--color-border)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={20} style={{ color: 'var(--color-terracotta)' }} />
                <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Change Delivery Location</h3>
              </div>
              <button onClick={() => setLocationModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: '0.84rem', color: 'var(--color-charcoal-muted)', marginBottom: '18px' }}>
              Select your city, state or PIN code to see real-time handmade dispatch speeds across India.
            </p>

            <form onSubmit={handleLocationSave}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Enter City, State or PIN (e.g. Bengaluru, KA 560001)"
                  value={inputLocation}
                  onChange={(e) => setInputLocation(e.target.value)}
                  className="form-control"
                  required
                />
              </div>

              {/* Quick Presets */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                {['Bengaluru, KA 560001', 'Mumbai, MH 400001', 'Delhi NCR 110001', 'Hyderabad, TS 500001', 'Chennai, TN 600001'].map(loc => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setInputLocation(loc)}
                    style={{
                      fontSize: '0.78rem',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--color-cream)',
                      border: '1px solid var(--color-border)',
                      color: 'var(--color-charcoal)'
                    }}
                  >
                    {loc}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setLocationModalOpen(false)}
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                >
                  Save Location
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Responsive Inline CSS Helper */}
      <style>{`
        @media (max-width: 900px) {
          .header-divider { display: none !important; }
          .header-location-pill { display: none !important; }
          .blinkit-search-bar { display: none !important; }
          .mobile-header-toggle { display: block !important; }
        }
      `}</style>
    </>
  );
}
