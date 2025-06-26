'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
    <main className="min-h-screen bg-[#f4ede4] text-[#3c2f28] font-serif">
      {/* Hero section */}
      <section className="relative text-center bg-[url('/wood-texture.jpg')] bg-cover bg-center py-28">
        <div className="bg-black bg-opacity-50 absolute inset-0" />
        <div className="relative z-10 px-6">
          <h1 className="text-5xl font-semibold mb-4 text-white">RecipeVault</h1>
          <p className="text-lg mb-6 max-w-2xl mx-auto text-white">
            Save and organize the recipes that matter most — accessible anywhere, anytime.
          </p>
          <Link
            href="/explore"
            className="inline-block border border-white px-6 py-3 text-white rounded hover:bg-[#ede3d0] hover:text-[#3c2f28] transition"
          >
            Explore Recipes
          </Link>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold mb-10 text-center text-[#3c2f28]">Featured Recipes</h2>

        {loading ? (
          <p className="text-center text-[#3c2f28]">Loading recipes...</p>
        ) : recipes.length === 0 ? (
          <p className="text-center text-[#3c2f28]">No recipes available yet.</p>
        ) : (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="overflow-hidden rounded-lg shadow-lg bg-white border border-[#e9e3d8]">
                {recipe.imageUrl && (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${recipe.imageUrl}`}
                    alt={recipe.title}
                    width={500}
                    height={300}
                    className="w-full h-60 object-cover"
                  />
                )}
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2 text-[#3c2f28]">{recipe.title}</h3>
                  <Link
                    href={`/recipes/${recipe.id}`}
                    className="text-sm text-[#7a5c42] underline hover:text-[#5a3e2c]"
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
