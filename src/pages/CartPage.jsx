import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trash2, 
  ShoppingBag, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  Tag, 
  Gift
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function CartPage() {
  const navigate = useNavigate();
  const { 
    cartItems, 
    subtotal, 
    discountAmount, 
    estimatedShipping, 
    estimatedTax, 
    finalTotal, 
    couponCode, 
    couponError, 
    couponSuccess, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    applyCoupon, 
    removeCoupon 
  } = useCart();
  const { currentUser, isAuthenticated, addOrder } = useAuth();

  const [inputCoupon, setInputCoupon] = useState('');
  const [checkoutModal, setCheckoutModal] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState('');

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (inputCoupon.trim()) {
      applyCoupon(inputCoupon);
      setInputCoupon('');
    }
  };

  const handlePlaceOrder = () => {
    const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
      id: orderId,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      status: 'Processing in Studio',
      total: finalTotal,
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        color: item.selectedColor,
        customization: item.customization,
        image: item.image
      }))
    };

    if (isAuthenticated) {
      addOrder(newOrder);
    }

    setPlacedOrderId(orderId);
    setOrderPlaced(true);
    clearCart();

    // Trigger celebratory confetti effect
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  if (orderPlaced) {
    return (
      <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '80vh', padding: '80px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: '540px', width: '100%', backgroundColor: 'var(--color-cream-light)', padding: '48px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', textAlign: 'center', boxShadow: 'var(--shadow-lg)' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--color-sage-subtle)', color: 'var(--color-sage-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <CheckCircle2 size={36} />
          </div>
          <span className="badge badge-sage" style={{ marginBottom: '12px' }}>Order Confirmed</span>
          <h1 style={{ fontSize: '2.4rem', fontFamily: 'var(--font-serif)', marginBottom: '12px' }}>
            Thank You for Supporting Handcrafted Art!
          </h1>
          <p style={{ color: 'var(--color-charcoal-muted)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '24px' }}>
            Your order <strong>#{placedOrderId}</strong> has been received by our studio workshop. Our artisans are carefully preparing and packaging your pieces with botanical wrap.
          </p>

          <div style={{ backgroundColor: 'var(--color-warm-beige-light)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '32px', fontSize: '0.9rem', color: 'var(--color-charcoal)' }}>
            <p>A confirmation email and tracking number will be dispatched upon courier pickup.</p>
          </div>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {isAuthenticated && (
              <Link to="/account?tab=orders" className="btn btn-secondary">
                View My Orders
              </Link>
            )}
            <Link to="/shop" className="btn btn-primary">
              Continue Browsing
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '80vh', padding: '40px 0 80px' }}>
      <div className="container">
        {/* Title & Back to Shop */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span className="badge badge-terracotta" style={{ marginBottom: '6px' }}>Artisan Bag</span>
            <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', margin: 0 }}>
              Shopping Bag ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} Items)
            </h1>
          </div>
          <Link to="/shop" className="btn btn-secondary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
        </div>

        {cartItems.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1.8fr) minmax(300px, 1fr)', gap: '36px', alignItems: 'start' }} className="cart-layout">
            
            {/* Left: Cart Items Table/Cards */}
            <div style={{ backgroundColor: 'var(--color-cream-light)', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {cartItems.map((item, idx) => (
                  <div 
                    key={`${item.id}-${item.selectedColor}-${item.customization}-${idx}`}
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      gap: '20px',
                      paddingBottom: '20px',
                      borderBottom: idx === cartItems.length - 1 ? 'none' : '1px solid var(--color-border)'
                    }}
                  >
                    {/* Item Image */}
                    <Link to={`/product/${item.id}`} style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', flexShrink: 0, backgroundColor: 'var(--color-warm-beige)' }}>
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Link>

                    {/* Item Info */}
                    <div style={{ flex: '1 1 200px' }}>
                      <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-sage-dark)', fontWeight: '700' }}>
                        {item.category}
                      </span>
                      <h3 style={{ fontSize: '1.1rem', margin: '2px 0 6px' }}>
                        <Link to={`/product/${item.id}`} style={{ color: 'var(--color-charcoal)' }}>
                          {item.name}
                        </Link>
                      </h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-charcoal-muted)' }}>
                        Option: <strong>{item.selectedColor}</strong>
                      </p>
                      {item.customization && (
                        <p style={{ fontSize: '0.82rem', color: 'var(--color-terracotta)', fontWeight: '600', marginTop: '2px' }}>
                          Customization: "{item.customization}"
                        </p>
                      )}
                    </div>

                    {/* Quantity Controls */}
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-border-dark)', borderRadius: 'var(--radius-full)', backgroundColor: '#ffffff' }}>
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedColor, item.customization, item.quantity - 1)}
                        style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span style={{ minWidth: '32px', textAlign: 'center', fontWeight: '700', fontSize: '0.9rem' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedColor, item.customization, item.quantity + 1)}
                        style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {/* Price and Total */}
                    <div style={{ textAlign: 'right', minWidth: '90px' }}>
                      <span style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--color-charcoal)', display: 'block' }}>
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--color-charcoal-muted)' }}>
                        (₹{item.price.toLocaleString('en-IN')} each)
                      </span>
                    </div>

                    {/* Remove Action */}
                    <button
                      onClick={() => removeFromCart(item.id, item.selectedColor, item.customization)}
                      style={{ color: '#C0392B', padding: '6px' }}
                      title="Remove item"
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Clear Cart Button */}
              <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px', marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  onClick={clearCart}
                  style={{ fontSize: '0.85rem', color: 'var(--color-charcoal-muted)', textDecoration: 'underline' }}
                >
                  Clear all items
                </button>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-sage-dark)', fontWeight: '600' }}>
                  ✓ Hand-packed in recyclable materials
                </span>
              </div>
            </div>

            {/* Right: Order Summary & Checkout */}
            <div style={{ backgroundColor: 'var(--color-cream-light)', padding: '28px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
              <h2 style={{ fontSize: '1.35rem', fontFamily: 'var(--font-serif)', marginBottom: '20px', borderBottom: '1px solid var(--color-border)', paddingBottom: '12px' }}>
                Order Summary
              </h2>

              {/* Promo Code Input */}
              <form onSubmit={handleApplyCoupon} style={{ marginBottom: '24px' }}>
                <label className="form-label" style={{ fontSize: '0.85rem' }}>Promo or Gift Code</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="Try HANDMADE15"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    className="form-control"
                    style={{ padding: '8px 12px', fontSize: '0.88rem' }}
                  />
                  <button type="submit" className="btn btn-secondary btn-sm">
                    Apply
                  </button>
                </div>
                {couponSuccess && (
                  <p style={{ color: 'var(--color-sage-dark)', fontSize: '0.82rem', fontWeight: '600', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={14} /> {couponSuccess}
                  </p>
                )}
                {couponError && (
                  <p style={{ color: '#C0392B', fontSize: '0.82rem', marginTop: '6px' }}>
                    {couponError}
                  </p>
                )}
              </form>

              {/* Calculation Rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.95rem', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-charcoal-muted)' }}>
                  <span>Cart Subtotal</span>
                  <span style={{ fontWeight: '600', color: 'var(--color-charcoal)' }}>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-terracotta)' }}>
                    <span>Artisan Promo Discount ({couponCode})</span>
                    <span style={{ fontWeight: '600' }}>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-charcoal-muted)' }}>
                  <span>Estimated Shipping</span>
                  <span style={{ fontWeight: '600', color: estimatedShipping === 0 ? 'var(--color-sage-dark)' : 'var(--color-charcoal)' }}>
                    {estimatedShipping === 0 ? 'FREE' : `₹${estimatedShipping.toLocaleString('en-IN')}`}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-charcoal-muted)' }}>
                  <span>Estimated Tax (5% GST)</span>
                  <span style={{ fontWeight: '600', color: 'var(--color-charcoal)' }}>₹{estimatedTax.toLocaleString('en-IN')}</span>
                </div>

                <div style={{ borderTop: '2px solid var(--color-border)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '1.15rem', fontWeight: '700' }}>Order Total</span>
                  <span style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--color-terracotta)' }}>
                    ₹{finalTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => setCheckoutModal(true)}
                className="btn btn-primary"
                style={{ width: '100%', padding: '16px', fontSize: '1.05rem', marginBottom: '16px' }}
              >
                <span>Proceed to Studio Checkout</span>
                <ArrowRight size={18} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--color-charcoal-muted)' }}>
                <ShieldCheck size={16} style={{ color: 'var(--color-sage-dark)' }} />
                <span>Encrypted 256-bit Artisan Checkout</span>
              </div>
            </div>

          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 20px', backgroundColor: 'var(--color-cream-light)', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--color-border)' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '50%', backgroundColor: 'var(--color-terracotta-subtle)', color: 'var(--color-terracotta)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <ShoppingBag size={36} />
            </div>
            <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', marginBottom: '8px' }}>
              Your shopping bag is empty
            </h2>
            <p style={{ color: 'var(--color-charcoal-muted)', maxWidth: '440px', margin: '0 auto 28px' }}>
              You haven't welcomed any handcrafted pottery, merino knits, or engraved keepsakes into your bag yet.
            </p>
            <Link to="/shop" className="btn btn-primary btn-lg">
              Explore 50+ Handmade Gifts
            </Link>
          </div>
        )}
      </div>

      {/* Simulated Checkout Modal */}
      {checkoutModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(44, 37, 35, 0.6)', backdropFilter: 'blur(3px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: 'var(--radius-lg)', padding: '36px', maxWidth: '500px', width: '100%', boxShadow: 'var(--shadow-xl)', border: '1px solid var(--color-border)' }}>
            <h3 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-serif)', marginBottom: '10px' }}>
              Confirm Studio Order
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-charcoal-muted)', marginBottom: '20px' }}>
              Review your delivery details before dispatching to our makers:
            </p>

            <div style={{ backgroundColor: 'var(--color-warm-beige-light)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '20px', fontSize: '0.88rem' }}>
              <p><strong>Customer:</strong> {currentUser ? currentUser.name : 'Guest Collector'}</p>
              <p><strong>Total Items:</strong> {cartItems.reduce((acc, i) => acc + i.quantity, 0)} handcrafted pieces</p>
              <p><strong>Total Amount:</strong> ₹{finalTotal.toLocaleString('en-IN')}</p>
              <p><strong>Packaging:</strong> Eco-padded with handwritten wax seal</p>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setCheckoutModal(false)}
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                Back to Cart
              </button>
              <button
                onClick={handlePlaceOrder}
                className="btn btn-primary"
                style={{ flex: 1 }}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 850px) {
          .cart-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
