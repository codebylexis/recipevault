'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#1f1f1f] text-white font-serif">
      {/* Hero Section */}
      <section className="relative text-center">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: "url('/wood-texture.jpg')" }}
        />
        <div className="relative z-10 px-6 py-32">
          <h1 className="text-5xl font-semibold mb-4">RecipeVault</h1>
          <p className="text-lg text-gray-200 mb-8">
            Curated, personal, timeless. A space to preserve the recipes that matter.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/signup"
              className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded shadow"
            >
              Create an Account
            </Link>
            <Link
              href="/login"
              className="bg-transparent border border-white px-6 py-3 rounded hover:bg-white hover:text-black transition"
            >
              Log In
            </Link>
          </div>
        </div>
      </section>

      {/* Visual Section */}
      <section className="py-20 px-6 flex justify-center bg-[#1f1f1f]">
        <div className="max-w-5xl w-full rounded overflow-hidden shadow-2xl">
          <Image
            src="/cookbook.jpg"
            alt="Cookbook and spices"
            width={1200}
            height={600}
            className="rounded w-full object-cover"
          />
        </div>
      </section>
    </main>
  );
}
