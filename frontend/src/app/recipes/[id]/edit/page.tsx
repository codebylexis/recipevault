'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

export default function EditRecipePage() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/recipes/${id}`);
        const data = await res.json();
        setTitle(data.title);
        setMarkdown(data.content);
        if (data.imageUrl) {
          setPreviewUrl(`http://localhost:4000${data.imageUrl}`);
        }
      } catch (err) {
        console.error('❌ Failed to load recipe:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) return alert('Please log in.');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', markdown);
    if (image) formData.append('image', image);

    try {
      const res = await fetch(`http://localhost:4000/api/recipes/${id}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to update');

      alert('Recipe updated!');
      router.push(`/recipes/${id}`);
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };

  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">✏️ Edit Recipe</h1>
      <form onSubmit={handleUpdate} className="space-y-6">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded mt-1"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Markdown Content</label>
          <textarea
            rows={10}
            className="w-full border px-3 py-2 rounded mt-1"
            value={markdown}
            onChange={e => setMarkdown(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Update Image (optional)</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="mt-4 h-40 object-cover border rounded"
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition"
        >
          Update Recipe
        </button>
      </form>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-2">Live Preview:</h2>
        <div className="prose max-w-none bg-white p-4 rounded shadow">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
