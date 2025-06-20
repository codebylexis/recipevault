const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

app.get('/', (req, res) => {
  res.send('🍽️ RecipeVault API is running!');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

const path = require('path');

// Serve static files for image access
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Recipe routes
app.use('/api/recipes', require('./routes/recipeRoutes'));



