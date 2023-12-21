import mongoose from 'mongoose';
import db from './db.js';

const collection = 'products';
const Schema = mongoose.Schema;

const productsSchema = new Schema({
  imageFront: {
    type: String,
    required: true,
  },
  imageBack: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  reviews: {
    type: Schema.Types.ObjectId,
    ref: 'review',
  },
  timeOfCreation: {
    type: Date,
    default: Date.now,
  }
});

const productsModel = db.model(collection, productsSchema);

export default productsModel;