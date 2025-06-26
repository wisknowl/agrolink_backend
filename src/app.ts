import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import cors from 'cors';

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('AgroLink backend is running!');
});

app.use('/api/auth', authRoutes);

app.listen(5000, '0.0.0.0', () => {
  console.log('Server running on port 5000');
});
