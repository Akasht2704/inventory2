"use client";
import { useState } from "react";

export default function StockModal({ open, onClose, onSubmit, type }) {
  const [amount, setAmount] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-80 shadow-xl">
        <h2 className="text-xl font-semibold mb-4">
          Stock {type === "in" ? "In" : "Out"}
        </h2>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter quantity"
          className="w-full p-2 border rounded-md mb-4"
        />

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-md"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              if (!amount || amount <= 0) return;
              onSubmit(parseInt(amount));
              setAmount("");
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
