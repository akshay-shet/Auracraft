import React from 'react';
import { Link } from 'react-router-dom';
import { Gift, Heart, ShieldCheck, Truck, RefreshCw, Send, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--color-cream-dark)', borderTop: '1px solid var(--color-border)', marginTop: 'auto' }}>
      {/* Value Pillars Banner */}
      <div style={{ borderBottom: '1px solid var(--color-border)', padding: '36px 0', backgroundColor: 'var(--color-warm-beige-light)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--color-terracotta-subtle)', color: 'var(--color-terracotta)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Sparkles size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '2px' }}>100% Handcrafted</h4>
              <p style={{ fontSize: '0.85rem' }}>Individually shaped with patience</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--color-sage-subtle)', color: 'var(--color-sage-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Truck size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '2px' }}>Careful Delivery</h4>
              <p style={{ fontSize: '0.85rem' }}>Eco-padded, plastic-free parcels</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--color-dusty-rose-subtle)', color: 'var(--color-dusty-rose-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Heart size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '2px' }}>Custom Engravings</h4>
              <p style={{ fontSize: '0.85rem' }}>Names, dates & heirloom notes</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--color-warm-beige)', color: 'var(--color-charcoal)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '2px' }}>Artisan Guarantee</h4>
              <p style={{ fontSize: '0.85rem' }}>Love your handmade treasure</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container" style={{ padding: '60px 24px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '48px' }}>
          {/* Brand Info */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--color-terracotta)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
                <Gift size={20} />
              </div>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: '700', color: 'var(--color-charcoal)' }}>
                AuraCraft
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '20px' }}>
              A collective of independent ceramicists, woodworkers, knitters, and jewelry artisans creating timeless gifts meant to be held and cherished.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <span className="badge badge-terracotta">Pottery</span>
              <span className="badge badge-sage">Woodwork</span>
              <span className="badge badge-rose">Merino Wool</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--color-charcoal)' }}>Shop & Explore</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li><Link to="/shop" style={{ color: 'var(--color-charcoal-muted)' }}>All Handmade Creations</Link></li>
              <li><Link to="/shop?filter=trending" style={{ color: 'var(--color-charcoal-muted)' }}>Trending Gifts</Link></li>
              <li><Link to="/shop?filter=personalized" style={{ color: 'var(--color-charcoal-muted)' }}>Personalized Keepsakes</Link></li>
              <li><Link to="/shop?filter=new" style={{ color: 'var(--color-charcoal-muted)' }}>New Arrivals</Link></li>
              <li><Link to="/shop?filter=bestseller" style={{ color: 'var(--color-charcoal-muted)' }}>Best Sellers</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--color-charcoal)' }}>Curated Collections</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li><Link to="/shop?category=Pottery%20%26%20Ceramics" style={{ color: 'var(--color-charcoal-muted)' }}>Pottery & Ceramics</Link></li>
              <li><Link to="/shop?category=Knitted%20%26%20Crochet" style={{ color: 'var(--color-charcoal-muted)' }}>Knitted & Crochet</Link></li>
              <li><Link to="/shop?category=Wooden%20Crafts" style={{ color: 'var(--color-charcoal-muted)' }}>Wooden Crafts</Link></li>
              <li><Link to="/shop?category=Handmade%20Jewelry" style={{ color: 'var(--color-charcoal-muted)' }}>Botanical Jewelry</Link></li>
              <li><Link to="/shop?category=Candles%20%26%20Aromatherapy" style={{ color: 'var(--color-charcoal-muted)' }}>Candles & Scents</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--color-charcoal)' }}>Help & Support</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li><Link to="/about" style={{ color: 'var(--color-charcoal-muted)' }}>Our Artisan Story</Link></li>
              <li><Link to="/contact" style={{ color: 'var(--color-charcoal-muted)' }}>Contact Studio</Link></li>
              <li><Link to="/cart" style={{ color: 'var(--color-charcoal-muted)' }}>Shipping & Packaging</Link></li>
              <li><Link to="/contact" style={{ color: 'var(--color-charcoal-muted)' }}>Custom Commission Orders</Link></li>
              <li><Link to="/account" style={{ color: 'var(--color-charcoal-muted)' }}>Order Tracking</Link></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '12px', color: 'var(--color-charcoal)' }}>Artisan Journal</h4>
            <p style={{ fontSize: '0.85rem', marginBottom: '16px' }}>
              Subscribe for early access to kiln drops, seasonal collections, and crafting stories.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to our Studio Journal!'); }} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="email"
                placeholder="Your email address"
                required
                className="form-control"
                style={{ padding: '8px 12px', fontSize: '0.85rem' }}
              />
              <button type="submit" className="btn btn-primary btn-sm" aria-label="Subscribe">
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Credits */}
        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px', fontSize: '0.85rem', color: 'var(--color-charcoal-subtle)' }}>
          <p>© {new Date().getFullYear()} AuraCraft Handmade & Gifts. Every piece made with love.</p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Terms of Service</span>
            <span>Privacy Policy</span>
            <span>Fair Trade Pledge</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
