import express from 'express';
import cors from 'cors';
import { getShopifyOrders, getShopifyVisitors, getShopifyRevenue, getShopifyConversion } from './shopify.js';

const app = express();
app.use(express.json());

// CORS pour le frontend Vercel
app.use(cors({
  origin: 'https://frontend-folder-xngu.vercel.app', // ton frontend exact
  methods: ['GET', 'POST', 'PUT', 'DELETE'],        // toutes les méthodes nécessaires
  allowedHeaders: ['Content-Type', 'Authorization'] // headers que tu utilises
}));

// Routes
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await getShopifyOrders();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/visitors', async (req, res) => {
  try {
    const visitors = await getShopifyVisitors();
    res.json(visitors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/revenue', async (req, res) => {
  try {
    const revenue = await getShopifyRevenue();
    res.json(revenue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/conversion', async (req, res) => {
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