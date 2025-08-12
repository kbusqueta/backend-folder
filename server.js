import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ordersRouter from './routes/orders.js';
import statsRouter from './routes/stats.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/orders', ordersRouter);
app.use('/api/stats', statsRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Backend running on ${PORT}`));
