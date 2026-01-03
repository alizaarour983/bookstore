const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./config/database');
const booksRoutes = require('./routes/books');
const cartRoutes = require('./routes/cart');
const ordersRoutes = require('./routes/orders');

const app = express();

// ✅ Use Railway PORT or 5000 for local testing
const PORT = process.env.PORT || 5001;

// ✅ Allow both localhost (for testing) and your deployed frontend
app.use(
  cors({
    origin: [
      'http://localhost:3000',          // Local frontend
      'https://alizaarour983.github.io' // GitHub Pages frontend
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-session-id']
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/books', booksRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', ordersRoutes);

// Optional test route for Railway
app.get('/', (req, res) => res.send('✅ Bookstore API running'));

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
