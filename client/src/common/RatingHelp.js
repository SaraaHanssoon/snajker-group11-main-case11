export function calculateAverageRating(review) {
    if (!review || review.length === 0) return 0;
    const totalRating = review.reduce((acc, review) => acc + (review.review || 0), 0);
    return totalRating / review.length;
  }