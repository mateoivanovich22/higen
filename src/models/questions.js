import mongoose from 'mongoose';
import db from './db.js';

const collection = 'questions';
const Schema = mongoose.Schema;

const questionsSchema = new mongoose.Schema({
    email: {
        type: 'string',
    },
    question: {
        type: 'string',
    }
});

const questionsModel = db.model(collection, questionsSchema);

export default questionsModel;