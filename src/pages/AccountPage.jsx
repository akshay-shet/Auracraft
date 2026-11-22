import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Package, 
  Truck, 
  CheckCircle2, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Edit3, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useReviews } from '../context/ReviewContext';
import { PRODUCTS } from '../data/products';

export default function AccountPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, isAuthenticated, logOut, updateProfile } = useAuth();
  const { cartItems, subtotal } = useCart();
  const { wishlistProducts, removeFromWishlist, moveWishlistItemToCart } = useWishlist();
  const { getAllUserReviews } = useReviews();

  // Check URL query for default tab (e.g. ?tab=orders)
  const queryParams = new URLSearchParams(location.search);
  const defaultTab = queryParams.get('tab') || 'profile';

  const [activeTab, setActiveTab] = useState(defaultTab);

  // Settings form state
  const [profileForm, setProfileForm] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: ''
  });
  const [settingsSuccess, setSettingsSuccess] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin', { state: { from: '/account' } });
    } else if (currentUser) {
      setProfileForm({
        name: currentUser.name || '',
        phone: currentUser.phone || '',
        street: currentUser.shippingAddress?.street || '',
        city: currentUser.shippingAddress?.city || '',
        state: currentUser.shippingAddress?.state || '',
        zipCode: currentUser.shippingAddress?.zipCode || ''
      });
    }
  }, [isAuthenticated, currentUser, navigate]);

  if (!currentUser) return null;

  const handleLogout = () => {
    logOut();
    navigate('/');
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    updateProfile({
      name: profileForm.name,
      phone: profileForm.phone,
      shippingAddress: {
        street: profileForm.street,
        city: profileForm.city,
        state: profileForm.state,
        zipCode: profileForm.zipCode,
        country: 'United States'
      }
    });
    setSettingsSuccess(true);
    setTimeout(() => setSettingsSuccess(false), 3000);
  };

  const userReviews = getAllUserReviews(currentUser.name);

  return (
    <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '85vh', padding: '40px 0 80px' }}>
      <div className="container">
        {/* Account Header Hero */}
        <div style={{ backgroundColor: 'var(--color-cream-light)', padding: '32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '24px', marginBottom: '36px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--color-terracotta)', boxShadow: 'var(--shadow-md)' }}>
              {currentUser.avatar ? (
                <img src={currentUser.avatar} alt={currentUser.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', backgroundColor: 'var(--color-terracotta)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <User size={36} />
                </div>
              )}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h1 style={{ fontSize: '1.9rem', fontFamily: 'var(--font-serif)', margin: 0 }}>
                  {currentUser.name}
                </h1>
                <span className="badge badge-sage">Verified Collector</span>
              </div>
              <p style={{ color: 'var(--color-charcoal-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
                {currentUser.email} • Member since {currentUser.joinedDate || '2025'}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="btn btn-outline btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <LogOut size={16} />
            <span>Log Out</span>
          </button>
        </div>

        {/* Account Dashboard Layout: Sidebar Tabs + Content Pane */}
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '32px', alignItems: 'start' }} className="account-grid">
          
          {/* Navigation Tabs Sidebar */}
          <div style={{ backgroundColor: 'var(--color-cream-light)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', padding: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <button
              onClick={() => setActiveTab('profile')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.95rem',
                fontWeight: activeTab === 'profile' ? '700' : '500',
                backgroundColor: activeTab === 'profile' ? 'var(--color-terracotta)' : 'transparent',
                color: activeTab === 'profile' ? '#ffffff' : 'var(--color-charcoal)',
                textAlign: 'left',
                transition: 'var(--transition)'
              }}
            >
              <User size={18} />
              <span>Customer Profile</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.95rem',
                fontWeight: activeTab === 'orders' ? '700' : '500',
                backgroundColor: activeTab === 'orders' ? 'var(--color-terracotta)' : 'transparent',
                color: activeTab === 'orders' ? '#ffffff' : 'var(--color-charcoal)',
                textAlign: 'left',
                transition: 'var(--transition)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Package size={18} />
                <span>My Orders</span>
              </div>
              <span className="badge" style={{ backgroundColor: activeTab === 'orders' ? 'rgba(255,255,255,0.2)' : 'var(--color-warm-beige)', color: activeTab === 'orders' ? '#fff' : 'inherit' }}>
                {currentUser.orders?.length || 0}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('wishlist')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.95rem',
                fontWeight: activeTab === 'wishlist' ? '700' : '500',
                backgroundColor: activeTab === 'wishlist' ? 'var(--color-terracotta)' : 'transparent',
                color: activeTab === 'wishlist' ? '#ffffff' : 'var(--color-charcoal)',
                textAlign: 'left',
                transition: 'var(--transition)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Heart size={18} />
                <span>My Wishlist</span>
              </div>
              <span className="badge" style={{ backgroundColor: activeTab === 'wishlist' ? 'rgba(255,255,255,0.2)' : 'var(--color-warm-beige)', color: activeTab === 'wishlist' ? '#fff' : 'inherit' }}>
                {wishlistProducts.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('cart')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.95rem',
                fontWeight: activeTab === 'cart' ? '700' : '500',
                backgroundColor: activeTab === 'cart' ? 'var(--color-terracotta)' : 'transparent',
                color: activeTab === 'cart' ? '#ffffff' : 'var(--color-charcoal)',
                textAlign: 'left',
                transition: 'var(--transition)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <ShoppingBag size={18} />
                <span>My Cart</span>
              </div>
              <span className="badge" style={{ backgroundColor: activeTab === 'cart' ? 'rgba(255,255,255,0.2)' : 'var(--color-warm-beige)', color: activeTab === 'cart' ? '#fff' : 'inherit' }}>
                {cartItems.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.95rem',
                fontWeight: activeTab === 'reviews' ? '700' : '500',
                backgroundColor: activeTab === 'reviews' ? 'var(--color-terracotta)' : 'transparent',
                color: activeTab === 'reviews' ? '#ffffff' : 'var(--color-charcoal)',
                textAlign: 'left',
                transition: 'var(--transition)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <MessageSquare size={18} />
                <span>My Reviews</span>
              </div>
              <span className="badge" style={{ backgroundColor: activeTab === 'reviews' ? 'rgba(255,255,255,0.2)' : 'var(--color-warm-beige)', color: activeTab === 'reviews' ? '#fff' : 'inherit' }}>
                {userReviews.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.95rem',
                fontWeight: activeTab === 'settings' ? '700' : '500',
                backgroundColor: activeTab === 'settings' ? 'var(--color-terracotta)' : 'transparent',
                color: activeTab === 'settings' ? '#ffffff' : 'var(--color-charcoal)',
                textAlign: 'left',
                transition: 'var(--transition)'
              }}
            >
              <Settings size={18} />
              <span>Account Settings</span>
            </button>

            <div style={{ borderTop: '1px solid var(--color-border)', margin: '8px 0', paddingTop: '8px' }}>
              <button
                onClick={handleLogout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  color: 'var(--color-terracotta)',
                  textAlign: 'left',
                  width: '100%'
                }}
              >
                <LogOut size={18} />
                <span>Log Out</span>
              </button>
            </div>
          </div>

          {/* Tab Content Display Area */}
          <div style={{ backgroundColor: 'var(--color-cream-light)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', padding: '36px', boxShadow: 'var(--shadow-sm)' }}>
            
            {/* 1. CUSTOMER PROFILE TAB */}
            {activeTab === 'profile' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid var(--color-border)', paddingBottom: '16px' }}>
                  <h2 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-serif)', margin: 0 }}>
                    Collector Profile
                  </h2>
                  <button onClick={() => setActiveTab('settings')} className="btn btn-secondary btn-sm">
                    <Edit3 size={14} /> Edit Profile
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                  <div style={{ backgroundColor: 'var(--color-cream)', padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-terracotta)', marginBottom: '8px' }}>
                      <User size={18} />
                      <strong style={{ fontSize: '0.9rem' }}>Full Name</strong>
                    </div>
                    <p style={{ fontSize: '1rem', color: 'var(--color-charcoal)', fontWeight: '600' }}>{currentUser.name}</p>
                  </div>

                  <div style={{ backgroundColor: 'var(--color-cream)', padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-terracotta)', marginBottom: '8px' }}>
                      <Mail size={18} />
                      <strong style={{ fontSize: '0.9rem' }}>Email Address</strong>
                    </div>
                    <p style={{ fontSize: '1rem', color: 'var(--color-charcoal)', fontWeight: '600' }}>{currentUser.email}</p>
                  </div>

                  <div style={{ backgroundColor: 'var(--color-cream)', padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-terracotta)', marginBottom: '8px' }}>
                      <Phone size={18} />
                      <strong style={{ fontSize: '0.9rem' }}>Mobile Number</strong>
                    </div>
                    <p style={{ fontSize: '1rem', color: 'var(--color-charcoal)', fontWeight: '600' }}>{currentUser.phone || 'Not provided'}</p>
                  </div>

                  <div style={{ backgroundColor: 'var(--color-cream)', padding: '18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-terracotta)', marginBottom: '8px' }}>
                      <MapPin size={18} />
                      <strong style={{ fontSize: '0.9rem' }}>Default Delivery Address</strong>
                    </div>
                    <p style={{ fontSize: '0.95rem', color: 'var(--color-charcoal)' }}>
                      {currentUser.shippingAddress?.street ? (
                        <>
                          {currentUser.shippingAddress.street}<br />
                          {currentUser.shippingAddress.city}, {currentUser.shippingAddress.state} {currentUser.shippingAddress.zipCode}
                        </>
                      ) : (
                        'No address saved yet.'
                      )}
                    </p>
                  </div>
                </div>

                {/* Quick Account Highlights */}
                <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Account Activity</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                  <div style={{ backgroundColor: 'var(--color-warm-beige-light)', padding: '20px', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                    <span style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--color-terracotta)' }}>
                      {currentUser.orders?.length || 0}
                    </span>
                    <p style={{ fontSize: '0.85rem', fontWeight: '600' }}>Total Orders Placed</p>
                  </div>

                  <div style={{ backgroundColor: 'var(--color-sage-subtle)', padding: '20px', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                    <span style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--color-sage-dark)' }}>
                      {wishlistProducts.length}
                    </span>
                    <p style={{ fontSize: '0.85rem', fontWeight: '600' }}>Saved to Wishlist</p>
                  </div>

                  <div style={{ backgroundColor: 'var(--color-dusty-rose-subtle)', padding: '20px', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                    <span style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--color-dusty-rose-dark)' }}>
                      {cartItems.length}
                    </span>
                    <p style={{ fontSize: '0.85rem', fontWeight: '600' }}>Items in Cart</p>
                  </div>
                </div>
              </div>
            )}

            {/* 2. MY ORDERS TAB */}
            {activeTab === 'orders' && (
              <div>
                <h2 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-serif)', marginBottom: '20px' }}>
                  My Orders & Commissions
                </h2>

                {currentUser.orders && currentUser.orders.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {currentUser.orders.map((order) => (
                      <div key={order.id} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden', backgroundColor: '#ffffff' }}>
                        <div style={{ backgroundColor: 'var(--color-warm-beige-light)', padding: '16px 20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--color-border)' }}>
                          <div>
                            <span style={{ fontWeight: '700', color: 'var(--color-charcoal)' }}>Order #{order.id}</span>
                            <span style={{ fontSize: '0.85rem', color: 'var(--color-charcoal-muted)', marginLeft: '12px' }}>Placed on {order.date}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span className={`badge ${order.status === 'Delivered' ? 'badge-sage' : 'badge-terracotta'}`}>
                              {order.status}
                            </span>
                            <strong style={{ fontSize: '1.05rem', color: 'var(--color-charcoal)' }}>₹{order.total.toLocaleString('en-IN')}</strong>
                          </div>
                        </div>

                        <div style={{ padding: '20px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            {order.items.map((item, idx) => (
                              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <img src={item.image} alt={item.name} style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                                <div style={{ flexGrow: 1 }}>
                                  <h4 style={{ fontSize: '0.98rem', margin: 0 }}>{item.name}</h4>
                                  <p style={{ fontSize: '0.82rem', color: 'var(--color-charcoal-muted)' }}>
                                    Qty: {item.quantity} • Option: {item.color} {item.customization ? `• Custom: "${item.customization}"` : ''}
                                  </p>
                                </div>
                                <span style={{ fontWeight: '600', color: 'var(--color-charcoal)' }}>
                                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '48px 20px', border: '1px dashed var(--color-border)' }}>
                    <Package size={48} style={{ color: 'var(--color-terracotta)', marginBottom: '12px' }} />
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>No orders yet</h3>
                    <p style={{ color: 'var(--color-charcoal-muted)', marginBottom: '20px' }}>Discover unique handcrafted gifts in our studio catalog.</p>
                    <Link to="/shop" className="btn btn-primary btn-sm">Explore Shop</Link>
                  </div>
                )}
              </div>
            )}

            {/* 3. MY WISHLIST TAB */}
            {activeTab === 'wishlist' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h2 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-serif)', margin: 0 }}>
                    My Saved Wishlist ({wishlistProducts.length})
                  </h2>
                  <Link to="/wishlist" className="btn btn-outline btn-sm">
                    Open Wishlist Page
                  </Link>
                </div>

                {wishlistProducts.length > 0 ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
                    {wishlistProducts.map(p => (
                      <div key={p.id} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '16px', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column' }}>
                        <img src={p.images[0]} alt={p.name} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: 'var(--radius-sm)', marginBottom: '12px' }} />
                        <h4 style={{ fontSize: '0.95rem', marginBottom: '6px' }}>{p.name}</h4>
                        <strong style={{ color: 'var(--color-terracotta)', marginBottom: '12px' }}>₹{p.price.toLocaleString('en-IN')}</strong>
                        <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                          <button onClick={() => moveWishlistItemToCart(p)} className="btn btn-primary btn-sm" style={{ flex: 1, padding: '6px 10px', fontSize: '0.8rem' }}>
                            Move to Cart
                          </button>
                          <button onClick={() => removeFromWishlist(p.id)} className="btn btn-secondary btn-sm" style={{ padding: '6px 10px' }} title="Remove">
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '48px 20px', border: '1px dashed var(--color-border)' }}>
                    <Heart size={48} style={{ color: 'var(--color-dusty-rose-dark)', marginBottom: '12px' }} />
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Your wishlist is empty</h3>
                    <p style={{ color: 'var(--color-charcoal-muted)', marginBottom: '20px' }}>Save your favorite handcrafted pieces while browsing.</p>
                    <Link to="/shop" className="btn btn-primary btn-sm">Explore Gifts</Link>
                  </div>
                )}
              </div>
            )}

            {/* 4. MY CART TAB */}
            {activeTab === 'cart' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h2 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-serif)', margin: 0 }}>
                    My Shopping Bag ({cartItems.length} items)
                  </h2>
                  <Link to="/cart" className="btn btn-primary btn-sm">
                    Open Full Cart & Checkout <ArrowRight size={14} />
                  </Link>
                </div>

                {cartItems.length > 0 ? (
                  <div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
                      {cartItems.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', backgroundColor: '#ffffff' }}>
                          <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', borderRadius: '4px', objectFit: 'cover' }} />
                          <div style={{ flexGrow: 1 }}>
                            <h4 style={{ fontSize: '0.95rem', margin: 0 }}>{item.name}</h4>
                            <p style={{ fontSize: '0.8rem', color: 'var(--color-charcoal-muted)' }}>Qty: {item.quantity} • {item.selectedColor}</p>
                          </div>
                          <span style={{ fontWeight: '700', color: 'var(--color-charcoal)' }}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                    </div>

                    <div style={{ backgroundColor: 'var(--color-warm-beige-light)', padding: '16px', borderRadius: 'var(--radius-sm)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>Subtotal:</span>
                      <strong style={{ fontSize: '1.2rem', color: 'var(--color-terracotta)' }}>₹{subtotal.toLocaleString('en-IN')}</strong>
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '48px 20px', border: '1px dashed var(--color-border)' }}>
                    <ShoppingBag size={48} style={{ color: 'var(--color-terracotta)', marginBottom: '12px' }} />
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>Your shopping bag is empty</h3>
                    <Link to="/shop" className="btn btn-primary btn-sm">Start Shopping</Link>
                  </div>
                )}
              </div>
            )}

            {/* 5. MY REVIEWS TAB */}
            {activeTab === 'reviews' && (
              <div>
                <h2 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-serif)', marginBottom: '20px' }}>
                  My Product Reviews ({userReviews.length})
                </h2>

                {userReviews.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {userReviews.map((rev) => {
                      const reviewedProd = PRODUCTS.find(p => p.id === rev.productId);
                      return (
                        <div key={rev.id} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '20px', backgroundColor: '#ffffff' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                            <div>
                              <span style={{ fontSize: '0.8rem', color: 'var(--color-terracotta)', fontWeight: '700', textTransform: 'uppercase' }}>
                                Product: {reviewedProd ? reviewedProd.name : rev.productId}
                              </span>
                              <div className="stars" style={{ marginTop: '4px' }}>
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} size={15} fill={i < rev.rating ? '#F5A623' : 'none'} stroke="#F5A623" />
                                ))}
                              </div>
                            </div>
                            <span style={{ fontSize: '0.8rem', color: 'var(--color-charcoal-muted)' }}>{rev.date}</span>
                          </div>
                          <p style={{ fontSize: '0.92rem', color: 'var(--color-charcoal-muted)', fontStyle: 'italic' }}>
                            "{rev.comment}"
                          </p>
                          {reviewedProd && (
                            <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--color-border)' }}>
                              <Link to={`/product/${reviewedProd.id}`} style={{ fontSize: '0.85rem', color: 'var(--color-terracotta)', fontWeight: '600' }}>
                                View Product Page →
                              </Link>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '48px 20px', border: '1px dashed var(--color-border)' }}>
                    <MessageSquare size={48} style={{ color: 'var(--color-sage-dark)', marginBottom: '12px' }} />
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>No reviews submitted yet</h3>
                    <p style={{ color: 'var(--color-charcoal-muted)', marginBottom: '20px' }}>Share your feedback on any product page using the Write a Review form.</p>
                    <Link to="/shop" className="btn btn-primary btn-sm">Explore Products</Link>
                  </div>
                )}
              </div>
            )}

            {/* 6. ACCOUNT SETTINGS TAB */}
            {activeTab === 'settings' && (
              <div>
                <h2 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-serif)', marginBottom: '20px' }}>
                  Account & Delivery Settings
                </h2>

                {settingsSuccess && (
                  <div style={{ backgroundColor: 'var(--color-sage-subtle)', border: '1px solid var(--color-sage)', borderRadius: 'var(--radius-sm)', padding: '12px 16px', color: 'var(--color-sage-dark)', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                    <CheckCircle2 size={18} />
                    <span style={{ fontWeight: '600' }}>Your account profile and shipping details have been saved successfully!</span>
                  </div>
                )}

                <form onSubmit={handleSaveSettings}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">Mobile Number</label>
                      <input
                        type="tel"
                        className="form-control"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', marginTop: '16px' }}>Default Delivery Address</h3>
                  <div className="form-group">
                    <label className="form-label">Street Address</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. 742 Evergreen Terrace"
                      value={profileForm.street}
                      onChange={(e) => setProfileForm({ ...profileForm, street: e.target.value })}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px', marginBottom: '28px' }}>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">City</label>
                      <input
                        type="text"
                        className="form-control"
                        value={profileForm.city}
                        onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                      />
                    </div>

                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">State</label>
                      <input
                        type="text"
                        className="form-control"
                        value={profileForm.state}
                        onChange={(e) => setProfileForm({ ...profileForm, state: e.target.value })}
                      />
                    </div>

                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">Zip Code</label>
                      <input
                        type="text"
                        className="form-control"
                        value={profileForm.zipCode}
                        onChange={(e) => setProfileForm({ ...profileForm, zipCode: e.target.value })}
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Save Profile Changes
                  </button>
                </form>
              </div>
            )}

          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 850px) {
          .account-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
