

export const calculateAverageRating=(ratings)=> {
    if (!Array.isArray(ratings) || ratings?.length === 0) {
      return 0; // Return 0 if no ratings or invalid input
    }
  
    // Calculate the sum of all ratings
    const sumOfRatings = ratings.reduce((total, ratings) => total + ratings.rating, 0);
  
    // Calculate the average by dividing the sum by the number of ratings
    const averageRating = sumOfRatings / ratings.length;
  
    // Round the average to a specific number of decimal places if needed
    return Math.round(averageRating * 10) / 10; // Rounded to one decimal place
  }