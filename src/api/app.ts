import express from 'express';
import { resolve } from 'path';
import routes from './routes/index';

const app = express();
app.use(express.json());
app.use(express.static(resolve(__dirname, '..', '..', 'uploads')));
routes(app);

export default app;
