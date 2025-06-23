'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Recipe {
  id: string;
  title: string;
  imageUrl?: string;
  tags?: { name: string }[];
}

export default function ExploreRecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState('');

  useEffect(() => {
    const query = new URLSearchParams();
    if (search) query.append('q', search);
    if (tag) query.append('tag', tag);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recipes/public?${query.toString()}`)
      .then(res => res.json())
      .then(setRecipes)
      .catch(err => {
        console.error('❌ Failed to load public recipes:', err);
      });
  }, [search, tag]);

  return (
    <div className="max-w-6xl mx-auto p-6 font-serif text-[#3c2f28]">
      <h1 className="text-3xl font-semibold mb-6">Explore Recipes</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          placeholder="Search by keyword..."
          className="border border-[#d6c7b0] bg-[#fdfaf5] px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-[#c9a27e]"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <input
          placeholder="Filter by tag (e.g. Vegan, Thai)"
          className="border border-[#d6c7b0] bg-[#fdfaf5] px-4 py-2 rounded w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-[#c9a27e]"
          value={tag}
          onChange={e => setTag(e.target.value)}
        />
      </div>

      {recipes.length === 0 ? (
        <p className="text-[#5e4b3c]">No recipes found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map(recipe => (
            <div
              key={recipe.id}
              className="border border-[#e9ddd0] rounded overflow-hidden hover:shadow-lg transition bg-[#fffaf5]"
            >
              {recipe.imageUrl && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}${recipe.imageUrl}`}
                  alt={recipe.title}
                  width={500}
                  height={200}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4 space-y-2">
                <h2 className="text-lg font-semibold text-[#3c2f28]">{recipe.title}</h2>
                <div className="flex flex-wrap gap-2 text-xs text-[#6c584c]">
                  {recipe.tags?.map(t => (
                    <span
                      key={t.name}
                      className="bg-[#e8dfd3] px-2 py-1 rounded cursor-pointer hover:bg-[#d6c7b0]"
                      onClick={() => setTag(t.name)}
                    >
                      #{t.name}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/recipes/${recipe.id}`}
                  className="text-sm text-[#8b5e3c] underline hover:text-[#6c4226]"
                >
                  View Recipe
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
