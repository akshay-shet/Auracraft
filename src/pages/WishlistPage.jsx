import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

export default function WishlistPage() {
  const { wishlistProducts, removeFromWishlist, moveWishlistItemToCart } = useWishlist();

  return (
    <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '80vh', padding: '40px 0 80px' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '36px' }}>
          <span className="badge badge-rose" style={{ marginBottom: '8px' }}>
            Saved Curations
          </span>
          <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', margin: 0 }}>
            My Wishlist ({wishlistProducts.length} Saved)
          </h1>
          <p style={{ color: 'var(--color-charcoal-muted)', fontSize: '1rem', marginTop: '6px' }}>
            Your personally favored handmade treasures, saved safely on your device.
          </p>
        </div>

        {wishlistProducts.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '28px' }}>
            {wishlistProducts.map(product => (
              <div 
                key={product.id}
                style={{
                  backgroundColor: 'var(--color-cream-light)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: 'var(--shadow-sm)',
                  position: 'relative'
                }}
              >
                {/* Image */}
                <Link to={`/product/${product.id}`} style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', backgroundColor: 'var(--color-warm-beige)' }}>
                  <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {product.discountPercent > 0 && (
                    <span className="badge badge-terracotta" style={{ position: 'absolute', top: '12px', left: '12px' }}>
                      -{product.discountPercent}%
                    </span>
                  )}
                </Link>

                {/* Content */}
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: 'var(--color-sage-dark)', fontWeight: '700' }}>
                    {product.category}
                  </span>
                  <h3 style={{ fontSize: '1.15rem', margin: '4px 0 8px' }}>
                    <Link to={`/product/${product.id}`} style={{ color: 'var(--color-charcoal)' }}>
                      {product.name}
                    </Link>
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginTop: 'auto', marginBottom: '16px' }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--color-charcoal)' }}>
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    {product.originalPrice && (
                      <span style={{ fontSize: '0.9rem', color: 'var(--color-charcoal-subtle)', textDecoration: 'line-through' }}>
                        ₹{product.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => moveWishlistItemToCart(product)}
                      className="btn btn-primary btn-sm"
                      style={{ flex: 1 }}
                    >
                      <ShoppingBag size={15} /> Move to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '8px 12px' }}
                      title="Remove from wishlist"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 20px', backgroundColor: 'var(--color-cream-light)', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--color-border)' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '50%', backgroundColor: 'var(--color-dusty-rose-subtle)', color: 'var(--color-dusty-rose-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Heart size={36} />
            </div>
            <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', marginBottom: '8px' }}>
              Your Wishlist is Empty
            </h2>
            <p style={{ color: 'var(--color-charcoal-muted)', maxWidth: '440px', margin: '0 auto 28px' }}>
              Save your favorite ceramics, hand-knit blankets, and engraved gifts here to revisit later or move to your cart anytime.
            </p>
            <Link to="/shop" className="btn btn-primary btn-lg">
              Explore 50+ Handmade Gifts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
