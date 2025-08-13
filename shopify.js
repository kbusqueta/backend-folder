import fetch from 'node-fetch';

const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY;
const SHOPIFY_STORE_URL = process.env.SHOPIFY_STORE_URL;

// Récupération des commandes
export async function getShopifyOrders() {
  const res = await fetch(`https://${SHOPIFY_STORE_URL}/admin/api/2025-01/orders.json`, {
    headers: {
      'X-Shopify-Access-Token': SHOPIFY_API_KEY,
      'Content-Type': 'application/json'
    }
  });
  const data = await res.json();
  return data.orders;
}

// Exemple fictif pour visiteurs
export async function getShopifyVisitors() {
  // Remplacer par la vraie API Shopify ou analytics
  return { visitors: 1234 };
}

// Exemple fictif pour chiffre d'affaires
export async function getShopifyRevenue() {
  const orders = await getShopifyOrders();
  const revenue = orders.reduce((acc, o) => acc + parseFloat(o.total_price || 0), 0);
  return { revenue };
}

// Exemple fictif pour taux de conversion
export async function getShopifyConversion() {
  const visitors = await getShopifyVisitors();
  const orders = await getShopifyOrders();
  const conversion = visitors.visitors ? (orders.length / visitors.visitors) * 100 : 0;
  return { conversion: conversion.toFixed(2) };
}