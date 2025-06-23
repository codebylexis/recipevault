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
    <header className="bg-[#141414] text-white shadow-md sticky top-0 z-50 font-serif">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-xl font-semibold tracking-tight text-[#eae6df] hover:text-white">
          RecipeVault
        </Link>
        <nav className="flex gap-6 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`transition ${
                pathname === item.path
                  ? 'text-[#eae6df] underline'
                  : 'text-[#a9a29d] hover:text-[#e0dad4]'
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
