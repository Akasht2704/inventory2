"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession, useSession } from "next-auth/react";

export default function AddProductPage() {
  const router = useRouter();
  const { data: session } = useSession();

  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSession().then((s) => {
      if (!s) router.push("/");
    });
  }, [router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!name.trim() || !sku.trim()) {
      setError("Name and SKU are required");
      return;
    }

    const token = session?.user?.token;
    if (!token) {
      setError("No token found. Login again.");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        "/api/products",
        {
          name: name.trim(),
          sku: sku.trim(),
          price: Number(price) || 0,
          categoryId: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-md p-6 pt-8">
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          disabled={loading}
          aria-label="Close"
          className="absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-md text-rose-400 transition hover:bg-rose-50 hover:text-rose-500 disabled:opacity-50"
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-center pr-6">Add New Product</h2>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-0 border-b border-gray-300 rounded-none bg-transparent px-0 py-2 focus:border-blue-500 focus:ring-0 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">SKU</label>
            <input
              type="text"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="w-full border-0 border-b border-gray-300 rounded-none bg-transparent px-0 py-2 focus:border-blue-500 focus:ring-0 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border-0 border-b border-gray-300 rounded-none bg-transparent px-0 py-2 focus:border-blue-500 focus:ring-0 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:opacity-60"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
