import mongoose from 'mongoose';
import { DATABASE_URL, NODE_ENV } from '../config/env.js';

if (!DATABASE_URL) {
    throw new Error('Please define the DATABASE_URL env variable inside .env.<dev/prod>.local');
}

const connectToDB = async () => {
    try {
        await mongoose.connect(DATABASE_URL);
        console.log(`Connected to MongoDB in ${NODE_ENV} mode`);
    } catch (error) {
        console.error("Error connecting to database", error);
        process.exit(1);
    }
}

export default connectToDB;