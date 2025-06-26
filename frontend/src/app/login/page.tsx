'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data: { token?: string; message?: string } = await res.json();

      if (!res.ok || !data.token) {
        setError(data.message ?? 'Invalid credentials');
        return;
      }

      localStorage.setItem('token', data.token);
      router.push('/dashboard');
    } catch (err: unknown) {
      console.error('Login error:', err);
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4ede4] px-4 font-serif">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg border border-[#e5d9c5]">
        <h1 className="text-3xl font-semibold mb-6 text-center text-[#4b3f2f]">Log In</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div>
            <label className="block text-sm font-medium text-[#5c4a3c]">Email</label>
            <input
              type="email"
              className="mt-1 w-full border border-[#d6c7b0] rounded px-3 py-2 bg-[#fcfaf7] text-black focus:outline-none focus:ring-2 focus:ring-[#c9a27e]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5c4a3c]">Password</label>
            <input
              type="password"
              className="mt-1 w-full border border-[#d6c7b0] rounded px-3 py-2 bg-[#fcfaf7] text-black focus:outline-none focus:ring-2 focus:ring-[#c9a27e]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#a67c52] text-white py-2 rounded hover:bg-[#8c6645] transition disabled:opacity-50"
          >
            {loading ? 'Logging in…' : 'Log In'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#5c4a3c]">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-[#a67c52] underline hover:text-[#8c6645]">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
