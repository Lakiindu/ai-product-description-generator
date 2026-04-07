"use client";

type HistoryItem = {
  id: string;
  product: string;
  result: string;
  date: string;
};

type Props = {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
};

export default function Sidebar({ history, onSelect }: Props) {
  return (
    <aside className="w-80 bg-slate-950 border-r border-slate-800 p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-4">History</h2>

      <div className="space-y-3 overflow-y-auto">
        {history.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect(item)}
            className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 cursor-pointer transition"
          >
            <p className="font-medium">{item.product}</p>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
              {item.result}
            </p>
          </div>
        ))}
      </div>
    </aside>
  );
}