/**
 * Prosty serwer webowy z Hono
 */

import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { Database } from './database';

const app = new Hono();
const db = new Database();

// Załaduj dane przy starcie
await db.loadData();

// API endpointy (przed serveStatic)
app.get('/api/data', (c) => {
  return c.json(db.getAll());
});

app.get('/api/years', (c) => {
  return c.json(db.getAvailableYears());
});

app.get('/api/units', (c) => {
  return c.json(db.getUnits());
});

app.get('/api/year/:year', (c) => {
  const year = parseInt(c.req.param('year'));
  return c.json(db.getByYear(year));
});

app.get('/api/unit/:id', (c) => {
  const id = c.req.param('id');
  return c.json(db.getByUnit(id));
});

app.get('/api/average', (c) => {
  return c.json(db.getAverageByYear());
});

app.get('/api/ranking/:year', (c) => {
  const year = parseInt(c.req.param('year'));
  const order = c.req.query('order') as 'asc' | 'desc' || 'desc';
  return c.json(db.getRankingByYear(year, order));
});

// Health check
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Strona główna
app.get('/', (c) => {
  return c.redirect('/index.html');
});

// Serwuj pliki statyczne z katalogu public (po API endpointach)
app.use('/*', serveStatic({ root: './public', rewriteRequestPath: (path) => path.replace(/^\//, '') }));

const port = parseInt(process.env.PORT || '3000');
console.log(`Server running on http://localhost:${port}`);

import { serve } from '@hono/node-server';

serve({
  fetch: app.fetch,
  port,
});
