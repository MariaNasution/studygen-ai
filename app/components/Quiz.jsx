import { useState } from "react";

function Question({ q }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-4">{q.question}</h3>
      <div className="space-y-2">
        {q.options.map((opt, j) => {
          const letter = String.fromCharCode(65 + j);
          const isCorrect = letter === q.correct;
          const isSelected = selected === letter;

          const cleanOption = opt.replace(/^[A-D][\)\.]\s*/i, "");
          
          let bgColor = "bg-slate-50 border-slate-200 hover:border-indigo-300";
          if (selected) {
            if (isCorrect) bgColor = "bg-green-100 border-green-500 text-green-700";
            else if (isSelected) bgColor = "bg-red-100 border-red-500 text-red-700";
          }

          return (
            <button
              key={j}
              disabled={!!selected}
              onClick={() => setSelected(letter)}
              className={`w-full text-left p-3 rounded-xl border-2 transition-all ${bgColor}`}
            >
              <span className="font-bold mr-2">{letter}.</span> {opt}
            </button>
          );
        })}
      </div>
      {selected && (
        <div className="mt-4 p-4 bg-indigo-50 rounded-lg animate-fade-in text-sm text-indigo-900">
          <p className="font-bold">Explanation:</p>
          <p>{q.explanation}</p>
        </div>
      )}
    </div>
  );
}

export default function Quiz({ data }) {
  if (!data?.length) return null;
  return (
    <div className="max-w-2xl mx-auto my-12">
      <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-2">
        <span></span> Knowledge Check
      </h2>
      {data.map((q, i) => <Question key={i} q={q} />)}
    </div>
  );
}