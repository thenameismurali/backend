// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// ✅ Load your routes
const sessionRoutes = require('./routes/session'); // existing
const authRoutes = require('./routes/auth'); // NEW for register

app.use('/api', sessionRoutes);
app.use('/api', authRoutes);

app.get('/', (req, res) => {
  res.send('Backend is working ✅');
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
