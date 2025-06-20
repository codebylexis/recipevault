'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Recipe {
  id: string;
  title: string;
  imageUrl?: string;
  public: boolean;
}

export default function Dashboard() {
  const [email, setEmail] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    setEmail(payload.email || 'user');

    const fetchRecipes = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/recipes/mine', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setRecipes(data);
      } catch (err: unknown) {
        console.error('❌ Error loading recipes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const toggleVisibility = async (id: string) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await fetch(`http://localhost:4000/api/recipes/${id}/toggle`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` },
      });

      setRecipes((prev) =>
        prev.map((r) => (r.id === id ? { ...r, public: !r.public } : r))
      );
    } catch (err: unknown) {
      console.error('❌ Failed to toggle visibility:', err);
    }
  };

  const deleteRecipe = async (id: string) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    if (!confirm('Are you sure you want to delete this recipe?')) return;

    try {
      await fetch(`http://localhost:4000/api/recipes/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      setRecipes((prev) => prev.filter((r) => r.id !== id));
    } catch (err: unknown) {
      console.error('❌ Failed to delete recipe:', err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      {email && (
        <p className="mb-6 text-gray-700">
          Welcome, <strong>{email}</strong>! 🎉
        </p>
      )}

      {loading ? (
        <p>Loading your recipes...</p>
      ) : recipes.length === 0 ? (
        <p>You haven’t created any recipes yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="border rounded-lg overflow-hidden hover:shadow-md transition"
            >
              {recipe.imageUrl && (
                <Image
                  src={`http://localhost:4000${recipe.imageUrl}`}
                  alt={recipe.title}
                  width={400}
                  height={200}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-4 space-y-2">
                <h2 className="text-lg font-semibold">{recipe.title}</h2>
                <Link
                  href={`/recipes/${recipe.id}`}
                  className="text-blue-600 underline text-sm"
                >
                  View
                </Link>
                <Link
                  href={`/recipes/edit/${recipe.id}`}
                  className="text-yellow-600 underline text-sm block"
                >
                  Edit
                </Link>
                <button
                  onClick={() => toggleVisibility(recipe.id)}
                  className="block text-xs text-gray-600 hover:underline mt-1"
                >
                  {recipe.public ? 'Make Private' : 'Make Public'}
                </button>
                <button
                  onClick={() => deleteRecipe(recipe.id)}
                  className="text-red-500 text-xs hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
