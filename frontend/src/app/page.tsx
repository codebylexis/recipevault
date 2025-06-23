'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fefcf9]">
      {/* Hero section */}
      <section className="py-20 text-center bg-gradient-to-br from-[#fbe9d0] to-[#fff5eb]">
        <div className="max-w-4xl mx-auto px-4">
          <img
            src="/cookbook.jpg"
            alt="Cookbook"
            className="w-48 sm:w-56 mx-auto mb-6 rounded shadow-lg"
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
    </main>
  );
}
