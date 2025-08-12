import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();

router.get('/', async (req,res) => {
  try {
    const shop = process.env.SHOPIFY_SHOP_DOMAIN;
    const token = process.env.SHOPIFY_ACCESS_TOKEN;
    const api = process.env.API_VERSION || '2025-01';
    const url = `https://${shop}/admin/api/${api}/orders.json?status=any&limit=50`;
    const r = await fetch(url, { headers: { 'X-Shopify-Access-Token': token, 'Content-Type': 'application/json' } });
    const data = await r.json();
    const orders = (data.orders || []).map(o => ({
      id: o.id,
      name: o.name,
      created_at: o.created_at,
      total_price: o.total_price,
      currency: o.currency,
      customer: o.customer ? `${o.customer.first_name || ''} ${o.customer.last_name || ''}`.trim() : null,
      line_items: o.line_items.map(li => ({ title: li.title, qty: li.quantity, price: li.price }))
    }));
    res.json({ orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

export default router;
