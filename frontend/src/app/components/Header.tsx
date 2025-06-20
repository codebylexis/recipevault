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
    <header className="bg-white dark:bg-black shadow-md sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-green-600 hover:text-green-700">
          🍽️ RecipeVault
        </Link>

        <div className="flex items-center gap-6 text-sm">
          <Link href="/recipes" className="hover:underline">
            Explore
          </Link>
          {isLoggedIn && (
            <>
              <Link href="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <Link href="/recipes/new" className="hover:underline">
                New Recipe
              </Link>
              <button onClick={handleLogout} className="text-red-600 hover:underline">
                Logout
              </button>
            </>
          )}
          {!isLoggedIn && (
            <>
              <Link href="/login" className="hover:underline">
                Login
              </Link>
              <Link href="/register" className="hover:underline">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
