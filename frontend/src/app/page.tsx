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
    <main className="min-h-screen bg-[#fdfaf6]">
      {/* Hero section */}
      <section className="py-20 text-center bg-gradient-to-br from-[#fbe9d0] to-[#fff5eb]">
        <div className="max-w-4xl mx-auto px-4">
          <img
            src="/cookbook.jpg"
            alt="Cookbook"
            className="w-24 mx-auto mb-4 rounded shadow-md"
          />
          <h1 className="text-4xl font-bold text-[#3b2f2f] mb-4">
            🍲 Welcome to RecipeVault
          </h1>
          <p className="text-lg text-[#4b3c3c] mb-6">
            Discover, create, and treasure your favorite recipes in a cozy home for food lovers.
          </p>
          <Link
            href="/explore"
            className="inline-block bg-[#a0522d] text-white px-6 py-3 rounded hover:bg-[#8b4513] transition"
          >
            Explore Recipes
          </Link>
        </div>
      </section>

      {/* Featured recipes */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold text-[#5c4033] mb-6">Featured Recipes</h2>

        {loading ? (
          <p className="text-[#8a6d3b]">Loading recipes...</p>
        ) : recipes.length === 0 ? (
          <p className="text-[#8a6d3b]">No recipes available yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white border border-[#e0d4c1] rounded overflow-hidden shadow-sm hover:shadow-md transition"
              >
                {recipe.imageUrl && (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${recipe.imageUrl}`}
                    alt={recipe.title}
                    className="w-full h-40 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#3b2f2f]">
                    {recipe.title}
                  </h3>
                  <Link
                    href={`/recipes/${recipe.id}`}
                    className="text-[#a0522d] text-sm underline"
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
