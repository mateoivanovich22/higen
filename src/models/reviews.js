import mongoose from 'mongoose';
import db from './db.js';

const collection = 'reviews';
const Schema = mongoose.Schema;

const reviewsSchema = new mongoose.Schema({
    _id: {
        type: Schema.Types.ObjectId,
        ref: 'product',
    },
    reviews: [
        {
            message: {
                type: String,
            },
            
            rating: {
                type: Number,
            }

        },
    ],
});

const reviewsModel = db.model(collection, reviewsSchema);

export default reviewsModel;