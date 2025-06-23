'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Something went wrong');
        return;
      }

      localStorage.setItem('token', data.token);
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4ede4] px-4 font-serif">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg border border-[#e5d9c5]">
        <h1 className="text-3xl font-semibold mb-6 text-center text-[#4b3f2f]">Create Your Account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div>
            <label className="block text-sm font-medium text-[#5c4a3c]">Email</label>
            <input
              type="email"
              className="mt-1 w-full border border-[#d6c7b0] rounded px-3 py-2 bg-[#fcfaf7] focus:outline-none focus:ring-2 focus:ring-[#c9a27e]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5c4a3c]">Password</label>
            <input
              type="password"
              className="mt-1 w-full border border-[#d6c7b0] rounded px-3 py-2 bg-[#fcfaf7] focus:outline-none focus:ring-2 focus:ring-[#c9a27e]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#a67c52] text-white py-2 rounded hover:bg-[#8c6645] transition"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#5c4a3c]">
          Already have an account?{' '}
          <a href="/login" className="text-[#a67c52] underline hover:text-[#8c6645]">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
