'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

export default function EditRecipePage() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchRecipe = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/recipes/${id}`);
        const data = await res.json();
        setTitle(data.title);
        setContent(data.content);
        setTags(data.tags?.map((t: any) => t.name).join(', ') || '');
        setPreviewUrl(data.imageUrl ? `http://localhost:4000${data.imageUrl}` : '');
      } catch (err) {
        alert('Failed to load recipe.');
        console.error(err);
      }
    };

    fetchRecipe();
  }, [id, token]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) return alert('Not logged in.');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('tags', tags);
    if (image) formData.append('image', image);

    try {
      const res = await fetch(`http://localhost:4000/api/recipes/${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error('Update failed');

      alert('Recipe updated!');
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Recipe</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
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
          <label className="block font-medium">Markdown Instructions</label>
          <textarea
            rows={10}
            className="w-full border px-3 py-2 rounded mt-1"
            value={content}
            onChange={e => setContent(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Tags (comma-separated)</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded mt-1"
            value={tags}
            onChange={e => setTags(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium">Replace Image</label>
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
          className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 transition"
        >
          Save Changes
        </button>
      </form>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-2">Live Preview</h2>
        <div className="prose max-w-none bg-white p-4 rounded shadow">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
