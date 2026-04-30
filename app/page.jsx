"use client";

import { useState } from "react";
import UploadForm from "./components/UploadForm";
import Flashcards from "./components/Flashcards";
import Quiz from "./components/Quiz";

export default function Home() {
  const [flashcards, setFlashcards] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <nav className="bg-white border-b border-slate-200 p-4 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-black text-indigo-600 tracking-tighter">StudyGen AI</h1>
          <div className="text-xs font-mono text-slate-400">v1.0.0</div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 pt-10">
        <div className="bg-indigo-600 rounded-3xl p-8 text-white mb-10 shadow-xl shadow-indigo-100">
          <h2 className="text-3xl font-bold mb-2">Transform your PDFs into Knowledge.</h2>
          <p className="opacity-80 mb-6">Upload lecture notes to generate instant flashcards and smart quizzes.</p>
          <UploadForm 
            setFlashcards={setFlashcards} 
            setQuiz={setQuiz} 
            setLoading={setLoading}
          />
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400 italic">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
            AI is analyzing your document...
          </div>
        ) : (
          <>
            {flashcards.length > 0 && (
              <section className="mb-16">
                <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
                  <span></span> Memory Cards
                </h2>
                <Flashcards data={flashcards} />
              </section>
            )}

            {quiz.length > 0 && <Quiz data={quiz} />}
          </>
        )}
      </div>
    </main>
  );
}