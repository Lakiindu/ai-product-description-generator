"use client";

import { useEffect, useState } from "react";
import GeneratorForm from "@/components/GeneratorForm";
import Sidebar from "@/components/Sidebar";

type HistoryItem = {
  id: string;
  product: string;
  result: string;
  date: string;
};

export default function Home() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

  // 📥 Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  // 💾 Save to localStorage
  const handleNewResult = (item: HistoryItem) => {
    const updated = [item, ...history].slice(0, 5);
    setHistory(updated);
    localStorage.setItem("history", JSON.stringify(updated));
  };

  return (
    <main className="flex h-screen bg-slate-950 text-white">
      {/* SIDEBAR */}
      <Sidebar history={history} onSelect={setSelectedItem} />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">
              AI Product Generator 🚀
            </h1>
            <p className="text-slate-400 mt-2">
              Create high-quality product descriptions instantly
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 backdrop-blur shadow-xl">
            <GeneratorForm
              onNewResult={handleNewResult}
              selectedItem={selectedItem}
            />
          </div>
        </div>
      </div>
    </main>
  );
}