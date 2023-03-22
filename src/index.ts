import express from 'express';
import indexRoute from '@routes/index.route';
const app = express();

const {PORT} = process.env || 3000

app.get('/', (req, res) => {
  res.json({ message: 'hello world!' });
});

app.use('/', indexRoute);

app.listen(PORT, () => {
  console.log(`...listening on port ${PORT}`);
});
