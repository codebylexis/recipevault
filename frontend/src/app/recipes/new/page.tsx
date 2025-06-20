'use client';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useRouter } from 'next/navigation';

export default function NewRecipePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return setError('Title and content are required');

    setLoading(true);
    setError('');
    const token = localStorage.getItem('token');
    if (!token) return setError('Please log in.');

    const fd = new FormData();
    fd.append('title', title);
    fd.append('content', content);
    fd.append('tags', tags);
    if (image) fd.append('image', image);

    try {
      const res = await fetch('http://localhost:4000/api/recipes', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      if (!res.ok) throw new Error(await res.text());
      router.push('/dashboard');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to create');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">New Recipe</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-600">{error}</p>}
        {/* Title, Tags, Content, Image upload */}
        {/* Same structure as before */}
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Creating...' : 'Create Recipe'}
        </button>
      </form>
      {/* Markdown Live Preview */}
    </div>
  );
}
