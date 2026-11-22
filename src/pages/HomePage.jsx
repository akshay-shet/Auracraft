import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  ShoppingBag, 
  Truck, 
  Tag, 
  ChevronRight,
  Gift
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import ProductCarousel from '../components/ProductCarousel';
import { useCart } from '../context/CartContext';

export default function HomePage() {
  const { totalItemsCount, finalTotal } = useCart();
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);

  // 10 Requested Sections (Blinkit Shopping Arrangement)
  const trendingProducts = PRODUCTS.filter(p => p.trending);
  const bestSellers = PRODUCTS.filter(p => p.bestSeller);
  const personalizedGifts = PRODUCTS.filter(p => p.personalized || p.category === 'Personalized & Engraved');
  const birthdayGifts = PRODUCTS.filter(p => p.occasion === 'birthday');
  const anniversaryGifts = PRODUCTS.filter(p => p.occasion === 'anniversary');
  const handmadeJewellery = PRODUCTS.filter(p => p.category === 'Handmade Jewelry');
  const homeDecor = PRODUCTS.filter(p => p.category === 'Home Decor & Wall Art');
  const resinArt = PRODUCTS.filter(p => p.category === 'Resin Art' || p.name.includes('Resin') || (p.materials && p.materials.toLowerCase().includes('resin')));
  const crochetGifts = PRODUCTS.filter(p => p.category === 'Crochet Gifts' || p.category === 'Knitted & Crochet' || p.name.includes('Crochet'));
  const newArrivals = PRODUCTS.filter(p => p.isNew);

  // Promotional Banners (Blinkit style)
  const promoBanners = [
    {
      id: 1,
      title: "Handmade & Gifts Festival",
      subtitle: "Flat 15% OFF On All Studio Creations",
      badge: "CODE: HANDMADE15",
      link: "/shop?filter=trending",
      bgGradient: "linear-gradient(135deg, #C56B50 0%, #A8543B 100%)",
      textColor: "#ffffff",
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      title: "Laser-Engraved Keepsakes",
      subtitle: "Custom Family Names, Dates & Milestones",
      badge: "MADE TO ORDER IN 48 HOURS",
      link: "/shop?filter=personalized",
      bgGradient: "linear-gradient(135deg, #647B5A 0%, #A3B59A 100%)",
      textColor: "#ffffff",
      image: "https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      title: "Botanical Resin & Everlasting Crochet",
      subtitle: "Wildflowers & Hand-Stitched Flower Bouquets",
      badge: "NEW STUDIO DROPS",
      link: "/shop?category=Resin%20Art",
      bgGradient: "linear-gradient(135deg, #BA7C86 0%, #D9A0A8 100%)",
      textColor: "#ffffff",
      image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '100vh', paddingBottom: '90px' }}>
      
      {/* 1. HORIZONTAL CATEGORY NAVIGATION STRIP (Blinkit Style Below Header) */}
      <div style={{ backgroundColor: '#FFFFFF', borderBottom: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
        <div className="container">
          <div className="blinkit-category-rail">
            {CATEGORIES.map(cat => (
              <Link 
                to={`/shop?category=${encodeURIComponent(cat.name)}`}
                key={cat.id}
                className="blinkit-category-pill"
                title={cat.name}
              >
                <div className="blinkit-category-avatar">
                  <img src={cat.image} alt={cat.name} />
                </div>
                <span className="blinkit-category-label">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '20px' }}>
        
        {/* 2. LARGE PROMOTIONAL BANNERS (Blinkit Style) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {promoBanners.map(banner => (
            <Link 
              to={banner.link} 
              key={banner.id}
              className="blinkit-promo-banner"
              style={{
                background: banner.bgGradient,
                color: banner.textColor,
                padding: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                textDecoration: 'none',
                minHeight: '160px'
              }}
            >
              <div style={{ flex: '1 1 auto' }}>
                <span style={{ 
                  display: 'inline-block', 
                  backgroundColor: 'rgba(255, 255, 255, 0.25)', 
                  padding: '3px 8px', 
                  borderRadius: 'var(--radius-xs)', 
                  fontSize: '0.72rem', 
                  fontWeight: '800', 
                  letterSpacing: '0.04em',
                  marginBottom: '8px'
                }}>
                  {banner.badge}
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ffffff', marginBottom: '4px', lineHeight: 1.2 }}>
                  {banner.title}
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '12px' }}>
                  {banner.subtitle}
                </p>
                <span style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '4px', 
                  fontSize: '0.82rem', 
                  fontWeight: '700',
                  color: '#ffffff',
                  textDecoration: 'underline'
                }}>
                  Shop Now <ArrowRight size={14} />
                </span>
              </div>

              <div style={{ width: '90px', height: '90px', borderRadius: 'var(--radius-md)', overflow: 'hidden', flexShrink: 0, boxShadow: 'var(--shadow-md)', border: '2px solid rgba(255,255,255,0.4)' }}>
                <img src={banner.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </Link>
          ))}
        </div>

        {/* 3. MULTIPLE PRODUCT COLLECTION SECTIONS (Blinkit Shopping Arrangement) */}
        
        {/* Section 1: Trending Handmade Products */}
        <ProductCarousel 
          title="Trending Handmade Products" 
          subtitle="Top viewed and ordered handcrafted gifts this week"
          products={trendingProducts}
          seeAllLink="/shop?filter=trending"
        />

        {/* Section 2: Best Sellers */}
        <ProductCarousel 
          title="Best Sellers" 
          subtitle="Proven favorites that collectors and gift-givers love"
          products={bestSellers}
          seeAllLink="/shop?filter=bestseller"
        />

        {/* Section 3: Personalized Gifts */}
        <ProductCarousel 
          title="Personalized Gifts" 
          subtitle="Laser-engraved names, custom coordinates & monograms"
          products={personalizedGifts}
          seeAllLink="/shop?filter=personalized"
        />

        {/* Section 4: Birthday Gifts */}
        <ProductCarousel 
          title="Birthday Gifts" 
          subtitle="Unique gifts to make birthdays memorable"
          products={birthdayGifts}
          seeAllLink="/shop?occasion=birthday"
        />

        {/* Section 5: Anniversary Gifts */}
        <ProductCarousel 
          title="Anniversary Gifts" 
          subtitle="Celebrations of love in clay, timber, and silver"
          products={anniversaryGifts}
          seeAllLink="/shop?occasion=anniversary"
        />

        {/* Section 6: Handmade Jewellery */}
        <ProductCarousel 
          title="Handmade Jewellery" 
          subtitle="Pressed wildflowers, hammered raw brass & baroque pearls"
          products={handmadeJewellery}
          seeAllLink="/shop?category=Handmade%20Jewelry"
        />

        {/* Section 7: Home Decor */}
        <ProductCarousel 
          title="Home Decor" 
          subtitle="Stained glass, tufted tapestries, wreaths & planters"
          products={homeDecor}
          seeAllLink="/shop?category=Home%20Decor%20%26%20Wall%20Art"
        />

        {/* Section 8: Resin Art */}
        <ProductCarousel 
          title="Resin Art" 
          subtitle="Preserved botanical coasters, ocean wave boards & geode trays"
          products={resinArt}
          seeAllLink="/shop?category=Resin%20Art"
        />

        {/* Section 9: Crochet Gifts */}
        <ProductCarousel 
          title="Crochet Gifts" 
          subtitle="Hand-stitched everlasting bouquets, totes & amigurumi keepsakes"
          products={crochetGifts}
          seeAllLink="/shop?category=Crochet%20Gifts"
        />

        {/* Section 10: New Arrivals */}
        <ProductCarousel 
          title="New Arrivals" 
          subtitle="Fresh drops straight from our craftspeople's workshops"
          products={newArrivals}
          seeAllLink="/shop?filter=new"
        />

        {/* Continuous Bottom Banner */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
          padding: '36px 24px',
          textAlign: 'center',
          marginTop: '20px'
        }}>
          <span className="badge badge-terracotta" style={{ marginBottom: '8px' }}>Atelier Collective</span>
          <h3 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '8px' }}>
            Looking for something specific?
          </h3>
          <p style={{ color: 'var(--color-charcoal-muted)', fontSize: '0.92rem', maxWidth: '520px', margin: '0 auto 20px' }}>
            Explore our complete directory of 60 unique handcrafted studio pieces, with filters by price, material, and custom options.
          </p>
          <Link to="/shop" className="btn btn-primary">
            <span>Browse Full Catalog</span>
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>

      {/* 4. BLINKIT FLOATING CART BAR (Signature Blinkit Mobile / Tablet UX) */}
      {totalItemsCount > 0 && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 999,
          width: 'calc(100% - 40px)',
          maxWidth: '520px'
        }}>
          <Link 
            to="/cart"
            style={{
              backgroundColor: 'var(--color-terracotta)',
              color: '#ffffff',
              borderRadius: 'var(--radius-md)',
              padding: '14px 22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-float)',
              textDecoration: 'none',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ 
                width: '34px', 
                height: '34px', 
                borderRadius: '50%', 
                backgroundColor: 'rgba(255, 255, 255, 0.25)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <ShoppingBag size={18} />
              </div>
              <div>
                <p style={{ fontWeight: '800', fontSize: '0.95rem', margin: 0, lineHeight: 1.1 }}>
                  {totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'} in Bag
                </p>
                <p style={{ fontSize: '0.76rem', margin: 0, opacity: 0.9 }}>
                  Total: ₹{finalTotal.toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '800', fontSize: '0.92rem' }}>
              <span>View Cart</span>
              <ArrowRight size={16} />
            </div>
          </Link>
        </div>
      )}

    </div>
  );
}
