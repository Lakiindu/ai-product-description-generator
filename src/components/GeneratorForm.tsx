"use client";

import { useEffect, useState } from "react";

type HistoryItem = {
  id: string;
  product: string;
  result: string;
  date: string;
};

type Props = {
  onNewResult: (item: HistoryItem) => void;
  selectedItem: HistoryItem | null;
};

export default function GeneratorForm({ onNewResult, selectedItem }: Props) {
  const [product, setProduct] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  // 🚀 Sync selected history item into form
  useEffect(() => {
    if (selectedItem) {
      setProduct(selectedItem.product);
      setResult(selectedItem.result);
    }
  }, [selectedItem]);

  // 🚀 GENERATE (REAL API)
  const handleGenerate = async () => {
    if (!product.trim()) return;

    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product }),
      });

      const data = await res.json();

      if (data.result) {
        setResult(data.result);

        const newItem: HistoryItem = {
          id: Date.now().toString(),
          product,
          result: data.result,
          date: new Date().toLocaleString(),
        };

        // 💾 Send to parent (history manager)
        onNewResult(newItem);

        // ✨ clear input for better UX
        setProduct("");
      } else {
        setResult("⚠️ Failed to generate description.");
      }
    } catch (error) {
      console.error(error);
      setResult("❌ Something went wrong. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* INPUT */}
      <div>
        <label className="text-sm text-slate-300">Product Name</label>
        <input
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          placeholder="e.g. Nike Running Shoes"
          className="w-full mt-2 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* BUTTON */}
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Description 🚀"}
      </button>

      {/* RESULT */}
      {result && (
        <div className="p-4 rounded-xl bg-slate-800 border border-slate-700">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Generated Description</h3>

            <button
              onClick={() => navigator.clipboard.writeText(result)}
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              Copy
            </button>
          </div>

          <p className="text-slate-300 leading-relaxed">{result}</p>
        </div>
      )}
    </div>
  );
}