'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewRecipePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) return alert('Please log in.');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('tags', tags);
    if (image) formData.append('image', image);

    try {
      const res = await fetch('http://localhost:4000/api/recipes', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error('Failed to create recipe');

      const data = await res.json();
      router.push(`/recipes/${data.id}`);
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-[#f4ede4] p-8 max-w-4xl mx-auto font-serif text-[#3c2f28]">
      <h1 className="text-3xl font-semibold mb-8 text-center">New Recipe</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md border border-[#e5d9c5]">
        {/* Title */}
        <div>
          <label className="block font-medium mb-1 text-[#5c4a3c]">Title</label>
          <input
            type="text"
            className="w-full border border-[#d6c7b0] bg-[#fcfaf7] px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#c9a27e]"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Content */}
        <div>
          <label className="block font-medium mb-1 text-[#5c4a3c]">Instructions (Markdown)</label>
          <textarea
            rows={10}
            className="w-full border border-[#d6c7b0] bg-[#fcfaf7] px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#c9a27e]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block font-medium mb-1 text-[#5c4a3c]">Tags (comma-separated)</label>
          <input
            type="text"
            className="w-full border border-[#d6c7b0] bg-[#fcfaf7] px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#c9a27e]"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        {/* Image */}
        <div>
          <label className="block font-medium mb-1 text-[#5c4a3c]">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-sm text-[#6c584c]"
          />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="mt-4 h-40 object-cover border rounded"
            />
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#8b5e3c] text-white py-2 rounded hover:bg-[#6c4226] transition"
        >
          Create Recipe
        </button>
      </form>
    </div>
  );
}
