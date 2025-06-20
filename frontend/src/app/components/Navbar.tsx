'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Explore', path: '/recipes' },
  { name: 'New Recipe', path: '/recipes/new' },
  { name: 'Dashboard', path: '/dashboard' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-xl font-bold text-green-600">🍽️ RecipeVault</Link>
        <nav className="flex gap-4 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`hover:text-green-700 ${
                pathname === item.path ? 'text-green-600 font-semibold' : 'text-gray-700'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
