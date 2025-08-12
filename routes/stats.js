import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();

// Simple stats: fetch recent orders (last 30) and compute revenue + orders count.
// Visitors are not provided by Orders API; for accurate visitors/conversion use Shopify Reports or integrate GA4.
router.get('/', async (req,res) => {
  try {
    const shop = process.env.SHOPIFY_SHOP_DOMAIN;
    const token = process.env.SHOPIFY_ACCESS_TOKEN;
    const api = process.env.API_VERSION || '2025-01';
    // simple: last 100 orders
    const url = `https://${shop}/admin/api/${api}/orders.json?status=any&limit=100`;
    const r = await fetch(url, { headers: { 'X-Shopify-Access-Token': token, 'Content-Type': 'application/json' } });
    const data = await r.json();
    const orders = data.orders || [];
    const revenue = orders.reduce((sum, o) => sum + parseFloat(o.total_price || 0), 0);
    const stats = {
      orders_count: orders.length,
      revenue: revenue.toFixed(2),
      // visitors is unknown here — backend returns null for visitors by default
      visitors: null,
      conversion_rate: null
    };
    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

export default router;
