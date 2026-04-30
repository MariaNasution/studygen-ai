"use client";

import { useState } from "react";

export default function UploadForm({ setFlashcards, setQuiz, setLoading }) {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!file) return alert("Please select a file first!");

    setLoading(true);
    setError(null);
    setFlashcards([]);
    setQuiz([]);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to generate content. Please try again.");

      const data = await res.json();
      setFlashcards(data.flashcards);
      setQuiz(data.quiz);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <input
            type="file"
            id="file-upload"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label
            htmlFor="file-upload"
            className="flex items-center justify-between w-full px-4 py-3 bg-white/20 border-2 border-dashed border-white/40 rounded-xl cursor-pointer hover:bg-white/30 transition-all"
          >
            <span className="text-sm truncate max-w-[200px]">
              {file ? file.name : "Select PDF Document"}
            </span>
            <span className="bg-white text-indigo-600 px-3 py-1 rounded-lg text-xs font-bold uppercase">
              Browse
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3 bg-yellow-400 hover:bg-yellow-300 text-indigo-900 font-black rounded-xl transition-transform active:scale-95 shadow-lg flex items-center justify-center gap-2"
        >
          Generate 
        </button>
      </form>

      {error && (
        <p className="mt-4 text-red-200 text-sm font-medium bg-red-500/20 p-3 rounded-lg border border-red-500/40 animate-pulse">
           {error}
        </p>
      )}
    </div>
  );
}