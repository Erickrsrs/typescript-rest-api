import express from 'express';
import { resolve } from 'path';
import routes from './routes/index';
import db from '../config/dbConnect';

db.on('error', console.log.bind(console, 'Erro de conexão'));
db.once('open', () => {
  console.log('Connected to Database');
});

const app = express();
app.use(express.json());
app.use(express.static(resolve(__dirname, '..', '..', 'uploads')));
routes(app);

export default app;
