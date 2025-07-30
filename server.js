require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Your port
const PORT = process.env.PORT || 5000;

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// ✅ Import your routes — note: singular!
const sessionRoutes = require('./routes/session');

// ✅ Mount your routes under /api
app.use('/api', sessionRoutes);

// ✅ Optional test route
app.get('/', (req, res) => {
  res.send('Backend is working ✅');
});

// Start server
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
