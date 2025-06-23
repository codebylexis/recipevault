'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <header className="bg-[#1f1f1f] text-white shadow-md sticky top-0 z-50 font-serif">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-semibold tracking-tight">
          RecipeVault
        </Link>

        <div className="flex items-center gap-6 text-sm">
          <Link href="/recipes" className="hover:underline hover:text-gray-300 transition">
            Explore
          </Link>
          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className="hover:underline hover:text-gray-300 transition">
                Dashboard
              </Link>
              <Link href="/recipes/new" className="hover:underline hover:text-gray-300 transition">
                New Recipe
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:underline hover:text-gray-300 transition">
                Login
              </Link>
              <Link href="/signup" className="hover:underline hover:text-gray-300 transition">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
