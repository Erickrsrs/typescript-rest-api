import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

mongoose.set('runValidators', true); //to use default validator in update changes
mongoose.set('strictQuery', false);
mongoose.connect(`${process.env.MONGO_URL}`);
const db = mongoose.connection;

export default db;
