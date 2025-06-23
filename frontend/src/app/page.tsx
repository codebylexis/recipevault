'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white font-serif">

      {/* Hero Section */}
      <section
        className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-center px-6"
        style={{ backgroundImage: "url('/wood-texture.jpg')" }}
      >
        <h1 className="text-5xl font-playfair font-bold mb-4 drop-shadow-lg">
          Welcome to RecipeVault
        </h1>
        <p className="text-lg max-w-2xl text-gray-200 mb-8 font-light">
          Discover, collect, and cook your favorite recipes in one elegant place.
        </p>
        <div className="flex gap-4">
          <Link
            href="/signup"
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full text-sm uppercase tracking-wide shadow-lg transition"
          >
            Create Account
          </Link>
          <Link
            href="/login"
            className="border border-gray-300 text-gray-100 px-6 py-3 rounded-full text-sm uppercase tracking-wide hover:bg-gray-100 hover:text-black transition"
          >
            Log In
          </Link>
        </div>
      </section>

      {/* Description Section (cookbook image) */}
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
            <h2 className="text-3xl font-playfair font-semibold mb-4">
              A Thoughtfully Designed Kitchen Companion
            </h2>
            <p className="text-gray-200 text-lg font-light">
              RecipeVault is your personal culinary archive — a space to capture ideas, organize ingredients,
              and preserve the meals that matter most. Seamlessly accessible, visually curated, and built for
              the discerning home cook.
            </p>
          </div>
        </div>
      </section>

      {/* Why RecipeVault Section */}
      <section className="bg-black text-white py-20 px-6 text-center">
        <h2 className="text-3xl font-playfair font-semibold mb-6">Why RecipeVault?</h2>
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-8 text-left text-gray-300">
          <ul className="space-y-4 text-lg">
            <li>• Elegant, minimal interface</li>
            <li>• Curated recipe organization</li>
            <li>• Full-featured markdown editor</li>
            <li>• Secure, private recipe storage</li>
          </ul>
          <ul className="space-y-4 text-lg">
            <li>• Add images, tags, and notes</li>
            <li>• Seamless syncing across devices</li>
            <li>• Built for passionate home chefs</li>
            <li>• Designed with intention</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
