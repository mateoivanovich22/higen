import reviewsModel from "../models/reviews.js";

class ReviewsManager {
    constructor() {}

    async createReview(productId, review) {

        try {
            let existingReview = await reviewsModel.findOne({ _id: productId });

            if (existingReview) {
                existingReview.reviews.push(review);
                await existingReview.save();
                return existingReview;
            } else {
                const newReview = await reviewsModel.create({
                    _id: productId,
                    reviews: [review],
                });
                return newReview; 
            }
        } catch (error) {
            console.error('Error creating review:', error);
            throw new Error('Could not create review');
        }
    }

    async getReviewsAndAverageRating(productId) {
        try {
            let reviews = await reviewsModel.findOne({ _id: productId });

            if (reviews) {
                const allReviews = reviews.reviews;
                const totalRatings = allReviews.reduce((acc, curr) => acc + curr.rating, 0);
                const averageRating = totalRatings / allReviews.length;

                const response = {
                    reviews: allReviews,
                    averageRating: averageRating.toFixed(2) 
                };

                return response
            } else {
                return {
                    reviews: [],
                    averageRating: 0 
                };
            }
        } catch (error) {
            console.error('Error getting reviews:', error);
            throw new Error('Could not get reviews');
        }
    }
}

export default ReviewsManager