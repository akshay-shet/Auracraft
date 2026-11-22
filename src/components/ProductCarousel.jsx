import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';

export default function ProductCarousel({ 
  title, 
  subtitle, 
  products, 
  seeAllLink = "/shop" 
}) {
  const trackRef = useRef(null);

  const scrollLeft = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -460, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 460, behavior: 'smooth' });
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <section style={{ marginBottom: '32px' }}>
      {/* Blinkit Style Section Header */}
      <div className="blinkit-section-header">
        <div className="blinkit-section-title-group">
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        <Link to={seeAllLink} className="blinkit-see-all-btn">
          <span>see all</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* Horizontal Carousel Track with Left / Right Arrows */}
      <div className="blinkit-carousel-wrapper">
        {/* Left Arrow Button */}
        <button 
          onClick={scrollLeft}
          className="blinkit-arrow-btn left"
          aria-label={`Scroll ${title} left`}
        >
          <ChevronLeft size={20} />
        </button>

        {/* Scrolling Items */}
        <div className="blinkit-carousel-track" ref={trackRef}>
          {products.map(product => (
            <div key={product.id} className="blinkit-carousel-item">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Right Arrow Button */}
        <button 
          onClick={scrollRight}
          className="blinkit-arrow-btn right"
          aria-label={`Scroll ${title} right`}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
