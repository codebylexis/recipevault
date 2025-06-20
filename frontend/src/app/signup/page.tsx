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

export default function ExploreRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState('');

  useEffect(() => {
    const query = new URLSearchParams();
    if (search) query.append('q', search);
    if (tag) query.append('tag', tag);

    fetch(`http://localhost:4000/api/recipes/public?${query.toString()}`)
      .then((res) => res.json())
      .then((data) => setRecipes(data));
  }, [search, tag]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Explore Recipes 🍽️</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          placeholder="Search by keyword..."
          className="border px-3 py-2 rounded w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          placeholder="Filter by tag (e.g. Italian)"
          className="border px-3 py-2 rounded w-full sm:w-60"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
      </div>

      {recipes.length === 0 ? (
        <p className="text-gray-600">No recipes found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="border rounded-lg overflow-hidden hover:shadow transition"
            >
              {recipe.imageUrl && (
                <Image
                  src={`http://localhost:4000${recipe.imageUrl}`}
                  alt={recipe.title}
                  width={600}
                  height={300}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-4 space-y-1">
                <h2 className="text-lg font-semibold">{recipe.title}</h2>
                <div className="flex flex-wrap gap-1 text-xs text-gray-600">
                  {recipe.tags?.map((t) => (
                    <span
                      key={t.name}
                      className="bg-gray-200 px-2 py-1 rounded cursor-pointer"
                      onClick={() => setTag(t.name)}
                    >
                      #{t.name}
                    </span>
                  ))}
                </div>
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
    </div>
  );
}
