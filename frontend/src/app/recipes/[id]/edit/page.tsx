'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

interface Recipe {
  title: string;
  content: string;
  imageUrl?: string;
}

export default function EditRecipePage() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [markdown, setMarkdown] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchRecipe = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/recipes/${id}`,
          { signal: controller.signal }
        );
        const data: Recipe = await res.json();

        setTitle(data.title);
        setMarkdown(data.content);
        if (data.imageUrl) {
          setPreviewUrl(`${process.env.NEXT_PUBLIC_API_URL}${data.imageUrl}`);
        }
      } catch (err) {
        console.error('❌ Failed to load recipe:', err);
        alert('Failed to load recipe.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
    return () => controller.abort();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) return alert('Please log in.');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', markdown);
    if (image) formData.append('image', image);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/recipes/${id}`,
        {
          method: 'PUT',
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      if (!res.ok) throw new Error('Update failed');
      alert('Recipe updated!');
      router.push(`/recipes/${id}`);
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };

  if (loading) {
    return <p className="p-10 text-center text-gray-600 font-serif">Loading…</p>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto font-serif text-[#3c2f28]">
      <h1 className="text-3xl font-semibold mb-6">Edit Recipe</h1>

      <form onSubmit={handleUpdate} className="space-y-6">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            className="w-full border border-[#d6c7b0] px-3 py-2 rounded bg-[#fdfaf5] focus:outline-none focus:ring-2 focus:ring-[#c9a27e]"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Markdown Content</label>
          <textarea
            rows={10}
            className="w-full border border-[#d6c7b0] px-3 py-2 rounded bg-[#fdfaf5] focus:outline-none focus:ring-2 focus:ring-[#c9a27e]"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Update Image (optional)</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {previewUrl && (
            <Image
              src={previewUrl}
              alt="Current recipe image"
              width={400}
              height={200}
              className="mt-4 object-cover border rounded"
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-[#a67c52] text-white py-2 px-6 rounded hover:bg-[#8c6645] transition"
        >
          Update Recipe
        </button>
      </form>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-2">Live Preview</h2>
        <div className="prose max-w-none bg-[#fcfaf7] p-4 rounded shadow text-black">
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
