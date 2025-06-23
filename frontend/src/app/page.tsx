'use client';

import Link from 'next/link';
import Image from 'next/image';
import cookbookImage from '/public/cookbook.jpg'; // Make sure this image is in public/ or adjust path

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f9f6f1] text-gray-800">
      {/* Hero */}
      <section className="bg-[url('/wood-texture.jpg')] bg-cover bg-center text-white py-24 px-4 text-center">
        <h1 className="text-5xl font-bold drop-shadow-md mb-4">
          🥘 Welcome to RecipeVault
        </h1>
        <p className="text-lg max-w-xl mx-auto drop-shadow">
          Discover, collect, and cook your favorite recipes in one cozy place.
        </p>
        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Link
            href="/signup"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md transition"
          >
            Create an Account
          </Link>
          <Link
            href="/login"
            className="bg-white text-green-700 border border-green-600 hover:bg-green-50 px-6 py-3 rounded-md transition"
          >
            Log In
          </Link>
        </div>
      </section>

      {/* Image */}
      <div className="flex justify-center bg-[#fefbf8] py-12">
        <Image
          src={cookbookImage}
          alt="Cookbook on wooden table"
          width={700}
          height={400}
          className="rounded shadow-lg object-cover"
          priority
        />
      </div>

      {/* About section*/}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-4 text-center">Why RecipeVault?</h2>
        <ul className="space-y-3 text-lg list-disc list-inside text-gray-700">
          <li>Store and organize your favorite recipes</li>
          <li>Tag, search, and filter by cuisine or ingredients</li>
          <li>Plan meals and save prep instructions</li>
          <li>Access from any device</li>
          <li>Simple, cozy, and distraction-free interface</li>
        </ul>
      </section>

      {/* Call to action */}
      <div className="text-center pb-16">
        <Link
          href="/signup"
          className="inline-block mt-8 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-md text-lg transition"
        >
          Start Saving Recipes Today 🍳
        </Link>
      </div>
    </main>
  );
}
