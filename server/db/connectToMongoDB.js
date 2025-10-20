import { connect } from 'mongoose';
import { config } from 'dotenv';

config();

const MONGODB_URI = process.env.MONGODB_CONNECTION_STRING;

const connectToMongoDB = async () => {
    try {
        await connect(MONGODB_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(`Error connecting to MongoDB : ${error}`);
    }
}

export default connectToMongoDB;