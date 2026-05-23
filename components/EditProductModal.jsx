"use client";

import { useEffect, useState } from "react";

export default function EditProductModal({ open, product, onClose, onSubmit, loading }) {
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (open && product) {
      setName(product.name ?? "");
      setSku(product.sku ?? "");
      setPrice(String(product.price ?? ""));
    }
  }, [open, product]);

  if (!open || !product) return null;

  function handleSubmit() {
    if (!name.trim() || !sku.trim()) return;
    onSubmit({
      name: name.trim(),
      sku: sku.trim(),
      price: Number(price) || 0,
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-product-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close"
      />
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <div className="border-b border-slate-100 bg-gradient-to-br from-slate-50 to-white px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Catalog</p>
          <h2 id="edit-product-title" className="mt-1 text-xl font-semibold text-slate-900">
            Edit product
          </h2>
        </div>

        <div className="space-y-4 px-6 py-6">
          <div>
            <label htmlFor="edit-name" className="mb-1.5 block text-sm font-medium text-slate-700">
              Product name
            </label>
            <input
              id="edit-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-2.5 text-slate-900 outline-none focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-900/10"
              required
            />
          </div>
          <div>
            <label htmlFor="edit-sku" className="mb-1.5 block text-sm font-medium text-slate-700">
              SKU
            </label>
            <input
              id="edit-sku"
              type="text"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-2.5 text-slate-900 outline-none focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-900/10"
              required
            />
          </div>
          <div>
            <label htmlFor="edit-price" className="mb-1.5 block text-sm font-medium text-slate-700">
              Price (₹)
            </label>
            <input
              id="edit-price"
              type="number"
              min={0}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-2.5 text-slate-900 outline-none focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-900/10"
            />
          </div>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading || !name.trim() || !sku.trim()}
              className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50"
            >
              {loading ? "Saving…" : "Save changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
