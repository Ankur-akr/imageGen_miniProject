# Server (No DB) - Pollinations backend

This server exposes:
- POST /api/image/generate  -> { prompt, style, resolution, quality } => returns { image }
- GET /api/image/all -> [] (no DB)

Run locally:
1. cd server
2. npm install
3. npm run dev
