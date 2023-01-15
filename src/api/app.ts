import express from 'express';
import { resolve } from 'path';
import routes from './routes/index';
import mongoDB from '../config/mongoConfig';

mongoDB.on('error', console.log.bind(console, 'MongoDB connection error'));
mongoDB.once('open', () => {
  console.log('Connected to MongoDB');
});

const app = express();
app.use(express.json());
app.use(express.static(resolve(__dirname, '..', '..', 'uploads')));
routes(app);

export default app;
