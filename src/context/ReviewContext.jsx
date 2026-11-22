import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_REVIEWS } from '../data/products';

const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const [reviewsByProduct, setReviewsByProduct] = useState(() => {
    try {
      const saved = localStorage.getItem('auracraft_reviews');
      if (saved) {
        return JSON.parse(saved);
      }
      return INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('auracraft_reviews', JSON.stringify(reviewsByProduct));
    } catch (e) {
      console.error(e);
    }
  }, [reviewsByProduct]);

  const getReviewsForProduct = (productId) => {
    return reviewsByProduct[productId] || [
      // If no custom reviews exist for this product yet, provide 2 warm default reviews
      {
        id: `seed-1-${productId}`,
        name: "Clara Vance",
        rating: 5,
        date: "November 12, 2026",
        verified: true,
        comment: "Exceeded all expectations! The craftsmanship is breathtaking and the materials feel so authentic and soulful."
      },
      {
        id: `seed-2-${productId}`,
        name: "Evelyn Thorne",
        rating: 5,
        date: "October 29, 2026",
        verified: true,
        comment: "Arrived beautifully packaged with lovely handwritten care notes. Will definitely be ordering more handmade gifts from this studio."
      }
    ];
  };

  const addReview = (productId, reviewData) => {
    const newReview = {
      id: `rev-${Date.now()}`,
      name: reviewData.name.trim(),
      rating: Number(reviewData.rating),
      comment: reviewData.comment.trim(),
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }),
      verified: true
    };

    setReviewsByProduct(prev => {
      const currentList = prev[productId] || getReviewsForProduct(productId);
      const updated = [newReview, ...currentList];
      return {
        ...prev,
        [productId]: updated
      };
    });

    return newReview;
  };

  // Get total count of user reviews
  const getAllUserReviews = (userName) => {
    const all = [];
    Object.entries(reviewsByProduct).forEach(([pId, revList]) => {
      revList.forEach(r => {
        if (!userName || r.name.toLowerCase() === userName.toLowerCase()) {
          all.push({ ...r, productId: pId });
        }
      });
    });
    return all;
  };

  return (
    <ReviewContext.Provider
      value={{
        getReviewsForProduct,
        addReview,
        getAllUserReviews,
        reviewsByProduct
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviews = () => useContext(ReviewContext);
