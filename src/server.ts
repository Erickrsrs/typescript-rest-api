import app from './api/app';
import db from './config/mongoConfig';

const port = process.env.PORT || 3000;

db.on('error', console.log.bind(console, 'MongoDB connection error'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.listen(port, () => {
  console.log(`Server listening on: http://localhost:${port}`);
});
