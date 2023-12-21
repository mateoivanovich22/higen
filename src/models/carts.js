import mongoose from 'mongoose';
import db from './db.js';

const collection = 'carts';

const cartsSchema = new mongoose.Schema({
    products: [
        {
            productId: {
                type: String,
            },
            
            quantity: {
                type: Number,
            }

        },
    ],
    email: {
        type: String,
    },
    phoneNumber: {
        type: Number,
    },
    paymentMethod:{
        type: String,
    }
});

const cartsModel = db.model(collection, cartsSchema);

export default cartsModel;