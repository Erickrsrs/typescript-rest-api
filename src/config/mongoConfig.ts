import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

mongoose.set('runValidators', true);
mongoose.set('strictQuery', false);
mongoose.connect(`${process.env.MONGO_URL}`);
const mongoDB = mongoose.connection;

export default mongoDB;
