const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createRecipe = async (req, res) => {
  console.log('---- RECEIVED RECIPE POST ----');
  console.log('REQ.BODY:', req.body);
  console.log('REQ.FILE:', req.file);
  console.log('REQ.USERID:', req.userId);

  const { title, content } = req.body;
  const userId = req.userId;

  let imageUrl = null;
  if (req.file) {
    imageUrl = `/uploads/${req.file.filename}`;
  }

  // 🔥 Handle tags (coming in as a JSON stringified array)
  let tags = [];
  if (req.body.tags) {
    try {
      tags = JSON.parse(req.body.tags);
    } catch (err) {
      return res.status(400).json({ message: 'Invalid tags format' });
    }
  }

  try {
    const recipe = await prisma.recipe.create({
      data: {
        title,
        content,
        imageUrl,
        authorId: userId,
        tags: {
          connectOrCreate: tags.map(tag => ({
            where: { name: tag },
            create: { name: tag }
          }))
        }
      },
      include: {
        tags: true
      }
    });

    console.log('✅ RECIPE SAVED:', recipe);
    res.status(201).json(recipe);
  } catch (err) {
    console.error('❌ Error creating recipe:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
