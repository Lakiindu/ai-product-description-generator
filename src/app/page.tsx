import GeneratorForm from "@/components/GeneratorForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight">
            AI Product Description Generator
          </h1>
          <p className="text-slate-400 mt-2">
            Generate high-converting product descriptions instantly 🚀
          </p>
        </div>

        {/* MAIN CARD */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl shadow-xl p-6 backdrop-blur">
          <GeneratorForm />
        </div>
      </div>
    </main>
  );
}