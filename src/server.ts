import app from './api/app';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on: http://localhost:${port}`);
});
