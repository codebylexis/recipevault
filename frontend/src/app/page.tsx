'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white font-serif">
      {/* Hero Section with wood-texture background */}
      <section
        className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-center px-6"
        style={{ backgroundImage: "url('/wood-texture.jpg')" }}
      >
        <h1 className="text-5xl font-bold mb-4 text-white drop-shadow-lg">
          Welcome to RecipeVault
        </h1>
        <p className="text-lg max-w-2xl text-gray-200 mb-8">
          A refined space to collect, preserve, and elevate your personal recipes.
          Discover inspiration, create thoughtfully, and access your culinary legacy from anywhere.
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

      {/* Fullscreen Photo Section */}
      <section className="min-h-screen relative">
        <Image
          src="/cookbook.jpg"
          alt="Cookbook and ingredients"
          layout="fill"
          objectFit="cover"
          className="opacity-90"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      </section>
    </main>
  );
}
