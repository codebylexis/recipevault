'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#1f1f1f] text-white font-['Playfair_Display']">
      {/* Hero Section */}
      <section
        className="w-full h-screen bg-cover bg-center flex flex-col items-center justify-center text-center px-4"
        style={{ backgroundImage: "url('/wood-texture.jpg')" }}
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Welcome to RecipeVault</h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8">
          Discover, collect, and cook your favorite recipes in one elegant place.
        </p>
        <div className="flex gap-4">
          <Link
            href="/signup"
            className="bg-neutral-700 text-white px-6 py-3 rounded-md hover:bg-neutral-600 transition font-semibold tracking-wide"
          >
            Create Account
          </Link>
          <Link
            href="/login"
            className="border border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-black transition font-semibold tracking-wide"
          >
            Log In
          </Link>
        </div>
      </section>

      {/* Full-width Photo */}
      <section className="w-full">
        <Image
          src="/cookbook.jpg"
          alt="Open cookbook with spices"
          width={1600}
          height={800}
          className="w-full object-cover"
        />
      </section>

      {/* Why RecipeVault Section */}
      <section className="max-w-4xl mx-auto py-20 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Why RecipeVault?</h2>
        <ul className="text-lg text-gray-300 space-y-3">
          <li>• Elegant and intuitive interface for organizing recipes</li>
          <li>• Access and manage your collection across all devices</li>
          <li>• Tag, search, and discover your favorite meals</li>
          <li>• Add photos, instructions, and ingredients with ease</li>
          <li>• Built with simplicity and luxury in mind</li>
        </ul>
      </section>
    </main>
  );
}
