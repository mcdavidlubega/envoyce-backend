import express from 'express';
import apiVersionRoutes from '@routes/apiVersionRoutes';
const app = express();

app.use(express.json())
app.use('/', apiVersionRoutes);

app.get('/', (req, res) => {
    return res.status(200).send('Home');
});

app.use((req, res) => {
    return res.status(404).json({ message: 'resource not found' });
  });
  


export default app