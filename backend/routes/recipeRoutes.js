const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const multer = require('multer');
const path = require('path');
const { createRecipe } = require('../controllers/recipeController');
const authMiddleware = require('../middleware/authMiddleware');

// Set up multer for local image storage
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = Date.now() + ext;
    cb(null, filename);
  },
});
const upload = multer({ storage });

// 🔐 Create a new recipe (with image)
router.post('/', authMiddleware, upload.single('image'), createRecipe);

// 🌍 Get public recipes
router.get('/public', async (req, res) => {
  try {
    const recipes = await prisma.recipe.findMany({
      where: { public: true },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        imageUrl: true,
      },
    });

    res.json(recipes);
  } catch (err) {
    console.error('❌ Error fetching public recipes:', err);
    res.status(500).json({ message: 'Failed to load public recipes' });
  }
});

// 👤 Get recipes created by the logged-in user
router.get('/mine', authMiddleware, async (req, res) => {
  try {
    const recipes = await prisma.recipe.findMany({
      where: { authorId: req.userId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        public: true,
        imageUrl: true,
      },
    });

    res.json(recipes);
  } catch (err) {
    console.error('❌ Error fetching user recipes:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🔁 Toggle public/private status
router.patch('/:id/toggle', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id },
    });

    if (!recipe || recipe.authorId !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const updated = await prisma.recipe.update({
      where: { id },
      data: { public: !recipe.public },
    });

    res.json(updated);
  } catch (err) {
    console.error('❌ Error toggling visibility:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🗑️ Delete a recipe by ID (must be owner)
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const recipe = await prisma.recipe.findUnique({ where: { id } });

    if (!recipe || recipe.authorId !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await prisma.recipe.delete({ where: { id } });
    res.json({ message: 'Recipe deleted' });
  } catch (err) {
    console.error('❌ Error deleting recipe:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✏️ Update a recipe by ID (must be owner)
router.put('/:id', authMiddleware, upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const recipe = await prisma.recipe.findUnique({ where: { id } });

    if (!recipe || recipe.authorId !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    let imageUrl = recipe.imageUrl;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const updated = await prisma.recipe.update({
      where: { id },
      data: {
        title,
        content,
        imageUrl,
      },
    });

    res.json(updated);
  } catch (err) {
    console.error('❌ Error updating recipe:', err);
    res.status(500).json({ message: 'Update failed' });
  }
});

// 🔎 Get a single recipe by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  console.log('📥 Fetching recipe with ID:', id);

  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id },
      include: { tags: true } // 👈 ADD THIS
    });

    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.json(recipe);
  } catch (err) {
    console.error('❌ Error fetching recipe by ID:', err);
    res.status(500).json({ message: 'Failed to load recipe', error: err.message });
  }
});

// ✏️ Update a recipe
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { title, content, tags } = req.body;

  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id },
    });

    if (!recipe || recipe.authorId !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Update main fields
    const updated = await prisma.recipe.update({
      where: { id },
      data: {
        title,
        content,
        tags: {
          set: [], // Clear old tags
          connectOrCreate: tags.map(tag => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
      include: { tags: true },
    });

    res.json(updated);
  } catch (err) {
    console.error('❌ Error updating recipe:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
// 🌍 Public recipes with optional filtering
router.get('/public', async (req, res) => {
  const { tag, q } = req.query;

  try {
    const recipes = await prisma.recipe.findMany({
      where: {
        public: true,
        ...(q && {
          OR: [
            { title: { contains: q, mode: 'insensitive' } },
            { content: { contains: q, mode: 'insensitive' } },
          ]
        }),
        ...(tag && {
          tags: {
            some: {
              name: tag,
            }
          }
        })
      },
      orderBy: { createdAt: 'desc' },
      include: {
        tags: true,
      }
    });

    res.json(recipes);
  } catch (err) {
    console.error('❌ Error fetching public recipes:', err);
    res.status(500).json({ message: 'Failed to load public recipes' });
  }
});


// ✏️ Update an existing recipe
router.patch('/:id', authMiddleware, upload.single('image'), async (req, res) => {
  const { id } = req.params;
  const { title, content, tags } = req.body;

  try {
    const recipe = await prisma.recipe.findUnique({ where: { id } });

    if (!recipe || recipe.authorId !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    let imageUrl = recipe.imageUrl;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    // Update the recipe (excluding tags for now)
    const updatedRecipe = await prisma.recipe.update({
      where: { id },
      data: {
        title,
        content,
        imageUrl,
      },
    });

    // Handle tag updates
    if (tags) {
      const tagNames = tags
        .split(',')
        .map(t => t.trim().toLowerCase())
        .filter(Boolean);

      const tagRecords = await Promise.all(
        tagNames.map(name =>
          prisma.tag.upsert({
            where: { name },
            update: {},
            create: { name },
          })
        )
      );

      await prisma.recipe.update({
        where: { id },
        data: {
          tags: {
            set: tagRecords.map(t => ({ id: t.id })),
          },
        },
      });
    }

    res.json({ message: 'Recipe updated!' });
  } catch (err) {
    console.error('❌ Error updating recipe:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
