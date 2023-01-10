import express from 'express';
import router from './routes/root';
import db from '../config/dbConnect';

db.on('error', console.log.bind(console, 'Erro de conexão'));
db.once('open', () => {
  console.log('Connected to Database');
});

const app = express();
app.use(express.json());
app.use(router);

export default app;