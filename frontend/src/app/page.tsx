'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white font-serif">

      {/* Hero Section with wood-texture background */}
      <section
        className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-center px-6"
        style={{ backgroundImage: "url('/wood-texture.jpg')" }}
      >
        <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
          Welcome to RecipeVault
        </h1>
        <p className="text-lg max-w-2xl text-gray-200 mb-8">
          Discover, collect, and cook your favorite recipes in one elegant place.
        </p>
        <div className="flex gap-4">
          <Link
            href="/signup"
            className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded shadow-md transition"
          >
            Create an Account
          </Link>
          <Link
            href="/login"
            className="border border-white text-white px-6 py-3 rounded hover:bg-white hover:text-black transition"
          >
            Log In
          </Link>
        </div>
      </section>

      {/* Description Section (fullscreen image with overlay text) */}
      <section className="relative min-h-screen">
        <Image
          src="/cookbook.jpg"
          alt="Cookbook and ingredients"
          layout="fill"
          objectFit="cover"
          className="opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="text-center px-6 max-w-3xl">
            <h2 className="text-3xl font-semibold mb-4">A Thoughtfully Designed Kitchen Companion</h2>
            <p className="text-gray-200 text-lg">
              RecipeVault is your personal culinary archive — a space to capture ideas, organize ingredients,
              and preserve the meals that matter most. Seamlessly accessible, visually curated, and built for
              the discerning home cook.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
