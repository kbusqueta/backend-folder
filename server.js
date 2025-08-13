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
// /api/orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await getShopifyOrders(); 
    res.json({ orders });
  } catch (err) {
    console.error(err);   // <- très important pour debug
    res.status(500).json({ error: err.message });
  }
});

// /api/stats
app.get('/api/stats', async (req, res) => {
  try {
    const visitors = await getShopifyVisitors();
    const revenue = await getShopifyRevenue();
    const conversion = await getShopifyConversion();
    res.json({ visitors, revenue, conversion });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));