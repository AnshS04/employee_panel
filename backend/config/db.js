const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

const connectMongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Successfully connected to MongoDB');
    } catch (err) {
        console.error('Connection error', err);
        process.exit(1);
    }
}

module.exports = {connectMongoDB} 