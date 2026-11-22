import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  RotateCcw, 
  ArrowUpDown, 
  Check, 
  Filter
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useScroll } from '../context/ScrollContext';

export default function ShopPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { getScrollPosition } = useScroll();
  const hasRestoredScroll = useRef(false);

  // Parse URL search parameters
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || 'All';
  const initialFilter = queryParams.get('filter') || 'all';
  const initialSearch = queryParams.get('search') || '';
  const initialOccasion = queryParams.get('occasion') || '';
  const initialCollection = queryParams.get('collection') || '';

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedFilter, setSelectedFilter] = useState(initialFilter);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [priceSort, setPriceSort] = useState('featured'); // 'featured', 'low-high', 'high-low', 'rating', 'discount'
  const [priceRange, setPriceRange] = useState('all'); // 'all', 'under35', '35to75', 'over75'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state when URL query params change
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.has('category')) setSelectedCategory(params.get('category'));
    if (params.has('filter')) setSelectedFilter(params.get('filter'));
    if (params.has('search')) setSearchQuery(params.get('search'));
  }, [location.search]);

  // Restore scroll position when returning from product details!
  useEffect(() => {
    if (!hasRestoredScroll.current) {
      const savedY = getScrollPosition('shop_scroll');
      if (savedY > 0) {
        window.scrollTo({ top: savedY, behavior: 'instant' });
      }
      hasRestoredScroll.current = true;
    }
  }, [getScrollPosition]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

      // Special Filter
      if (selectedFilter === 'personalized' && !product.personalized) return false;
      if (selectedFilter === 'trending' && !product.trending) return false;
      if (selectedFilter === 'bestseller' && !product.bestSeller) return false;
      if (selectedFilter === 'new' && !product.isNew) return false;

      // Occasion filter (if set in query)
      if (initialOccasion && product.occasion !== initialOccasion) return false;

      // Collection filter (if set in query)
      if (initialCollection && product.collection !== initialCollection) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        const matchesMaterials = product.materials && product.materials.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat && !matchesMaterials) {
          return false;
        }
      }

      // Price Range filter (Indian Rupees)
      if (priceRange === 'under500' && product.price >= 500) return false;
      if (priceRange === '500to1500' && (product.price < 500 || product.price > 1500)) return false;
      if (priceRange === 'over1500' && product.price <= 1500) return false;

      return true;
    }).sort((a, b) => {
      if (priceSort === 'low-high') return a.price - b.price;
      if (priceSort === 'high-low') return b.price - a.price;
      if (priceSort === 'rating') return b.rating - a.rating;
      if (priceSort === 'discount') return b.discountPercent - a.discountPercent;
      return 0; // 'featured' retains curated order
    });
  }, [selectedCategory, selectedFilter, searchQuery, priceSort, priceRange, initialOccasion, initialCollection]);

  const resetAllFilters = () => {
    setSelectedCategory('All');
    setSelectedFilter('all');
    setSearchQuery('');
    setPriceSort('featured');
    setPriceRange('all');
    navigate('/shop', { replace: true });
  };

  return (
    <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '80vh', padding: '40px 0 80px' }}>
      <div className="container">
        {/* Page Title & Breadcrumbs */}
        <div style={{ marginBottom: '32px' }}>
          <span className="badge badge-terracotta" style={{ marginBottom: '8px' }}>
            Curated Catalog
          </span>
          <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', marginBottom: '8px' }}>
            The Artisan Marketplace
          </h1>
          <p style={{ color: 'var(--color-charcoal-muted)', fontSize: '1rem' }}>
            Discover 50+ unique studio gifts, crafted with earth, fiber, wood, and metal.
          </p>
        </div>

        {/* Top Controls Bar: Search, Sorting, and Mobile Filter Toggle */}
        <div style={{ backgroundColor: 'var(--color-cream-light)', padding: '18px 24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'space-between', alignItems: 'center', marginBottom: '36px', boxShadow: 'var(--shadow-sm)' }}>
          {/* Live Search Input */}
          <div style={{ position: 'relative', flex: '1 1 280px', maxWidth: '420px' }}>
            <input
              type="text"
              placeholder="Search by craft, material, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control"
              style={{ paddingLeft: '40px', paddingRight: searchQuery ? '36px' : '14px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--color-cream)' }}
            />
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-charcoal-muted)' }} />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-charcoal-muted)' }}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            {/* Price & Rating Sorting */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ArrowUpDown size={16} style={{ color: 'var(--color-terracotta)' }} />
              <label htmlFor="price-sort-select" style={{ fontSize: '0.85rem', fontWeight: '600' }}>Sort:</label>
              <select
                id="price-sort-select"
                value={priceSort}
                onChange={(e) => setPriceSort(e.target.value)}
                style={{ padding: '8px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border-dark)', backgroundColor: '#ffffff', fontSize: '0.88rem', color: 'var(--color-charcoal)', outline: 'none' }}
              >
                <option value="featured">Featured (Curated)</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="discount">Biggest Discount %</option>
              </select>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="btn btn-secondary btn-sm mobile-filter-btn"
              style={{ display: 'none' }}
            >
              <SlidersHorizontal size={16} />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Main Content Layout: Sidebar Filters + Products Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '36px', alignItems: 'start' }} className="shop-layout">
          {/* Desktop Sidebar Filters */}
          <aside className={`shop-sidebar ${mobileFilterOpen ? 'mobile-open' : ''}`} style={{ backgroundColor: 'var(--color-cream-light)', padding: '24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', position: 'sticky', top: '100px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Filter size={18} style={{ color: 'var(--color-terracotta)' }} />
                <h3 style={{ fontSize: '1.15rem' }}>Filters</h3>
              </div>
              <button 
                onClick={resetAllFilters} 
                style={{ fontSize: '0.8rem', color: 'var(--color-terracotta)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}
                title="Reset all filters"
              >
                <RotateCcw size={13} /> Reset
              </button>
            </div>

            {/* Category Filter */}
            <div style={{ marginBottom: '28px' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-charcoal)' }}>
                Categories
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <button
                  onClick={() => setSelectedCategory('All')}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.9rem',
                    textAlign: 'left',
                    backgroundColor: selectedCategory === 'All' ? 'var(--color-terracotta-subtle)' : 'transparent',
                    color: selectedCategory === 'All' ? 'var(--color-terracotta-dark)' : 'var(--color-charcoal)',
                    fontWeight: selectedCategory === 'All' ? '700' : '400'
                  }}
                >
                  <span>All Categories</span>
                  <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>52</span>
                </button>

                {CATEGORIES.map(cat => {
                  const count = PRODUCTS.filter(p => p.category === cat.name).length;
                  const isSelected = selectedCategory === cat.name;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.name)}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.9rem',
                        textAlign: 'left',
                        backgroundColor: isSelected ? 'var(--color-terracotta-subtle)' : 'transparent',
                        color: isSelected ? 'var(--color-terracotta-dark)' : 'var(--color-charcoal)',
                        fontWeight: isSelected ? '700' : '400'
                      }}
                    >
                      <span>{cat.name}</span>
                      <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Special Feature Filter */}
            <div style={{ marginBottom: '28px' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-charcoal)' }}>
                Curated Badges
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { id: 'all', label: 'All Items' },
                  { id: 'personalized', label: 'Personalized & Engraved' },
                  { id: 'trending', label: 'Trending Pieces' },
                  { id: 'bestseller', label: 'Best Sellers' },
                  { id: 'new', label: 'New Kiln Drops' }
                ].map(item => (
                  <label key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', cursor: 'pointer', color: 'var(--color-charcoal)' }}>
                    <input
                      type="radio"
                      name="specialFilter"
                      checked={selectedFilter === item.id}
                      onChange={() => setSelectedFilter(item.id)}
                      style={{ accentColor: 'var(--color-terracotta)' }}
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-charcoal)' }}>
                Price Range
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  { id: 'all', label: 'All Prices' },
                  { id: 'under500', label: 'Under ₹500' },
                  { id: '500to1500', label: '₹500 to ₹1,500' },
                  { id: 'over1500', label: 'Over ₹1,500' }
                ].map(pr => (
                  <label key={pr.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', cursor: 'pointer', color: 'var(--color-charcoal)' }}>
                    <input
                      type="radio"
                      name="priceRangeFilter"
                      checked={priceRange === pr.id}
                      onChange={() => setPriceRange(pr.id)}
                      style={{ accentColor: 'var(--color-terracotta)' }}
                    />
                    <span>{pr.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Listing Grid Area */}
          <div>
            {/* Active Filter Pills Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-charcoal)' }}>
                Showing <strong>{filteredProducts.length}</strong> of <strong>{PRODUCTS.length}</strong> handmade products
              </p>

              {(selectedCategory !== 'All' || selectedFilter !== 'all' || priceRange !== 'all' || searchQuery) && (
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {selectedCategory !== 'All' && (
                    <span className="badge badge-terracotta" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }} onClick={() => setSelectedCategory('All')}>
                      Category: {selectedCategory} <X size={12} />
                    </span>
                  )}
                  {selectedFilter !== 'all' && (
                    <span className="badge badge-rose" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }} onClick={() => setSelectedFilter('all')}>
                      Badge: {selectedFilter} <X size={12} />
                    </span>
                  )}
                  {priceRange !== 'all' && (
                    <span className="badge badge-sage" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }} onClick={() => setPriceRange('all')}>
                      Price: {priceRange} <X size={12} />
                    </span>
                  )}
                  {searchQuery && (
                    <span className="badge badge-beige" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }} onClick={() => setSearchQuery('')}>
                      Search: "{searchQuery}" <X size={12} />
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="product-grid">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '64px 20px', backgroundColor: 'var(--color-cream-light)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--color-border-dark)' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--color-terracotta-subtle)', color: 'var(--color-terracotta)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <Search size={28} />
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>No handmade treasures match your filters</h3>
                <p style={{ color: 'var(--color-charcoal-muted)', maxWidth: '420px', margin: '0 auto 20px' }}>
                  Try relaxing your search terms or resetting filters to browse all 50+ handcrafted items.
                </p>
                <button onClick={resetAllFilters} className="btn btn-primary btn-sm">
                  <RotateCcw size={16} />
                  <span>Reset All Filters</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .shop-layout {
            grid-template-columns: 1fr !important;
          }
          .mobile-filter-btn {
            display: inline-flex !important;
          }
          .shop-sidebar {
            display: none;
          }
          .shop-sidebar.mobile-open {
            display: block !important;
            margin-bottom: 24px;
          }
        }
      `}</style>
    </div>
  );
}
