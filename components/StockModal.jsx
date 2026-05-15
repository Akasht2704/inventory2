"use client";

import { useState } from "react";

function ArrowDownTrayIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3v12" />
      <path d="m17 14-5 5-5-5" />
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    </svg>
  );
}

function ArrowUpTrayIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 21V9" />
      <path d="m7 10 5-5 5 5" />
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    </svg>
  );
}

export default function StockModal({ open, onClose, onSubmit, type, product }) {
  const [amount, setAmount] = useState("");

  const isIn = type === "in";

  if (!open) return null;

  function handleSubmit() {
    const n = parseInt(amount, 10);
    if (!amount || Number.isNaN(n) || n <= 0) return;
    onSubmit(n);
    setAmount("");
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="stock-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close dialog"
      />

      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-900/15">
        <div
          className={`px-6 pb-4 pt-6 ${isIn ? "bg-gradient-to-br from-emerald-50 to-teal-50/80" : "bg-gradient-to-br from-amber-50 to-orange-50/80"}`}
        >
          <div className="flex items-start gap-4">
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-sm ${
                isIn ? "bg-emerald-500 text-white shadow-emerald-500/30" : "bg-amber-500 text-white shadow-amber-500/30"
              }`}
            >
              {isIn ? <ArrowDownTrayIcon className="h-6 w-6" /> : <ArrowUpTrayIcon className="h-6 w-6" />}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {isIn ? "Receive stock" : "Remove stock"}
              </p>
              <h2 id="stock-modal-title" className="mt-1 text-xl font-semibold tracking-tight text-slate-900">
                Stock {isIn ? "In" : "Out"}
              </h2>
              {product?.name && (
                <p className="mt-1 truncate text-sm text-slate-600" title={product.name}>
                  <span className="text-slate-400">Product · </span>
                  {product.name}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-5 px-6 py-6">
          <div>
            <label htmlFor="stock-modal-qty" className="mb-2 block text-sm font-medium text-slate-700">
              Quantity
            </label>
            <input
              id="stock-modal-qty"
              type="number"
              min={1}
              inputMode="numeric"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder="e.g. 10"
              className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-900/10"
              autoFocus
            />
          </div>

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className={`rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                isIn
                  ? "bg-emerald-600 shadow-emerald-600/25 hover:bg-emerald-500 focus-visible:ring-emerald-500"
                  : "bg-amber-600 shadow-amber-600/25 hover:bg-amber-500 focus-visible:ring-amber-500"
              }`}
            >
              Confirm {isIn ? "stock in" : "stock out"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
