# Backend (Node/Express)
## Setup
1. Copy `.env.example` to `.env` and fill your `SHOPIFY_ACCESS_TOKEN`.
2. Install deps: `npm install`
3. Run: `npm run dev` (nodemon) or `npm start`

## Endpoints
- GET /api/orders -> list recent orders (limited, formatted)
- GET /api/stats  -> basic stats (CA, orders count). Visitors require Analytics/Reports API
