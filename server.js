import express from 'express';
import cors from 'cors';
import { getShopifyOrders, getShopifyVisitors, getShopifyRevenue, getShopifyConversion } from './shopify.js';

const app = express();
app.use(express.json());

// CORS pour le frontend Vercel
app.use(cors({
  origin: 'https://frontend-folder-xngu.vercel.app'
}));

// Routes
app.get('/orders', async (req, res) => {
  try {
    const orders = await getShopifyOrders();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/visitors', async (req, res) => {
  try {
    const visitors = await getShopifyVisitors();
    res.json(visitors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/revenue', async (req, res) => {
  try {
    const revenue = await getShopifyRevenue();
    res.json(revenue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/conversion', async (req, res) => {
  try {
    const conversion = await getShopifyConversion();
    res.json(conversion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));