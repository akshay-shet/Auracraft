import React, { useState, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, CheckCircle2, MessageSquarePlus } from 'lucide-react';
import { useReviews } from '../context/ReviewContext';

export default function ReviewSection({ productId, productName }) {
  const { getReviewsForProduct, addReview } = useReviews();
  const reviews = getReviewsForProduct(productId);

  const scrollRef = useRef(null);

  // Form states
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState({});
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = 'Please provide your name.';
    if (!rating || rating < 1 || rating > 5) errs.rating = 'Please choose a rating between 1 and 5 stars.';
    if (!comment.trim() || comment.trim().length < 10) {
      errs.comment = 'Please write a review with at least 10 characters.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    addReview(productId, {
      name,
      rating,
      comment
    });

    setSubmittedSuccess(true);
    setName('');
    setRating(5);
    setComment('');
    setErrors({});

    // Auto scroll the track to the very left to highlight the newly added review
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      }
    }, 100);

    setTimeout(() => {
      setSubmittedSuccess(false);
      setIsFormOpen(false);
    }, 3500);
  };

  return (
    <div style={{ backgroundColor: 'var(--color-cream-dark)', borderRadius: 'var(--radius-lg)', padding: '40px 32px', margin: '48px 0', border: '1px solid var(--color-border)' }}>
      {/* Section Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px', marginBottom: '28px' }}>
        <div>
          <span className="badge badge-sage" style={{ marginBottom: '8px' }}>Customer Feedback</span>
          <h2 style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', marginBottom: '6px' }}>
            Artisan Stories & Verified Reviews
          </h2>
          <p style={{ fontSize: '0.95rem' }}>
            Read genuine reflections from collectors who welcomed this handcrafted piece home ({reviews.length} reviews).
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Scroll Navigation Arrows */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={handleScrollLeft} 
              className="scroll-arrow-btn"
              title="Scroll reviews left"
              aria-label="Previous reviews"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={handleScrollRight} 
              className="scroll-arrow-btn"
              title="Scroll reviews right"
              aria-label="Next reviews"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Toggle Write Review Button */}
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => setIsFormOpen(!isFormOpen)}
          >
            <MessageSquarePlus size={16} />
            <span>{isFormOpen ? 'Close Review Form' : 'Write a Review'}</span>
          </button>
        </div>
      </div>

      {/* Write a Review Collapsible Form */}
      {isFormOpen && (
        <div style={{ backgroundColor: 'var(--color-cream-light)', padding: '28px', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--color-terracotta)', marginBottom: '36px', boxShadow: 'var(--shadow-md)' }}>
          <h3 style={{ fontSize: '1.35rem', marginBottom: '8px' }}>Write a Review for {productName}</h3>
          <p style={{ fontSize: '0.88rem', marginBottom: '20px', color: 'var(--color-charcoal-muted)' }}>
            Share your experience with the craftsmanship, packaging, and tactile texture. Your review is saved instantly.
          </p>

          {submittedSuccess && (
            <div style={{ backgroundColor: 'var(--color-sage-subtle)', border: '1px solid var(--color-sage)', borderRadius: 'var(--radius-sm)', padding: '14px 18px', color: 'var(--color-sage-dark)', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <CheckCircle2 size={20} />
              <span style={{ fontWeight: '600' }}>Thank you! Your handmade review has been saved and displayed below!</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              {/* Customer Name */}
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" htmlFor="review-name">Your Full Name *</label>
                <input
                  id="review-name"
                  type="text"
                  className="form-control"
                  placeholder="e.g. Amelia Vance"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <span className="form-error">{errors.name}</span>}
              </div>

              {/* Star Rating Selector (1-5) */}
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Select Rating (1 to 5 Stars) *</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', height: '45px' }}>
                  {[1, 2, 3, 4, 5].map((starValue) => {
                    const isFilled = starValue <= (hoverRating || rating);
                    return (
                      <button
                        type="button"
                        key={starValue}
                        onClick={() => setRating(starValue)}
                        onMouseEnter={() => setHoverRating(starValue)}
                        onMouseLeave={() => setHoverRating(0)}
                        style={{ padding: '4px', cursor: 'pointer' }}
                        title={`${starValue} Stars`}
                      >
                        <Star
                          size={28}
                          fill={isFilled ? '#F5A623' : 'transparent'}
                          stroke="#F5A623"
                          style={{ transition: 'transform 0.15s ease' }}
                        />
                      </button>
                    );
                  })}
                  <span style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--color-charcoal)', marginLeft: '10px' }}>
                    {rating} out of 5
                  </span>
                </div>
                {errors.rating && <span className="form-error">{errors.rating}</span>}
              </div>
            </div>

            {/* Review Comment */}
            <div className="form-group">
              <label className="form-label" htmlFor="review-comment">Detailed Review *</label>
              <textarea
                id="review-comment"
                className="form-control"
                placeholder="What did you love about this handmade piece? Describe the finish, weight, details, and how it was received..."
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              {errors.comment && <span className="form-error">{errors.comment}</span>}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button 
                type="button" 
                className="btn btn-secondary btn-sm"
                onClick={() => setIsFormOpen(false)}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-primary btn-sm"
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
      )}

      {/* HORIZONTAL REVIEW BOXES - Scroll LEFT and RIGHT */}
      <div className="horizontal-scroll-container">
        <div 
          className="horizontal-scroll-track" 
          ref={scrollRef}
          aria-label="Customer review cards scrolling track"
        >
          {reviews.map((rev) => (
            <div key={rev.id} className="review-card-horizontal">
              <div>
                <div className="review-card-header">
                  <div>
                    <h4 className="reviewer-name">{rev.name}</h4>
                    <p className="review-date">{rev.date}</p>
                  </div>

                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={15} 
                        fill={i < rev.rating ? '#F5A623' : 'transparent'} 
                        stroke="#F5A623" 
                      />
                    ))}
                  </div>
                </div>

                <p className="review-text">"{rev.comment}"</p>
              </div>

              <div className="review-verified">
                <CheckCircle2 size={14} />
                <span>Verified Collector Purchase</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
