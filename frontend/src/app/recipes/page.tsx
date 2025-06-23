'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Recipe {
  id: string;
  title: string;
  imageUrl?: string;
}

export default function HomePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recipes/public?limit=6`);
        const data = await res.json();
        setRecipes(data);
      } catch (err) {
        console.error('❌ Error fetching featured recipes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero section */}
      <section className="bg-gradient-to-r from-green-100 to-green-200 py-20 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">🍽️ Welcome to RecipeVault</h1>
        <p className="text-lg text-gray-700 mb-6">
          Discover, create, and manage your favorite recipes in one place.
        </p>
        <Link
          href="/explore"
          className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition"
        >
          Explore Recipes
        </Link>
      </section>

      {/* Featured recipes */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-6">Featured Recipes</h2>

        {loading ? (
          <p>Loading recipes...</p>
        ) : recipes.length === 0 ? (
          <p>No recipes available yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="border rounded overflow-hidden hover:shadow">
                {recipe.imageUrl && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${recipe.imageUrl}`}
                    alt={recipe.title}
                    className="w-full h-40 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{recipe.title}</h3>
                  <Link
                    href={`/recipes/${recipe.id}`}
                    className="text-blue-600 text-sm underline"
                  >
                    View Recipe
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
