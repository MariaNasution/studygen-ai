import { useState } from "react";

function Card({ card }) {
  const [show, setShow] = useState(false);

  return (
    <div 
      onClick={() => setShow(!show)}
      className="cursor-pointer group perspective w-full h-40"
    >
      <div className={`relative w-full h-full text-center transition-all duration-500 preserve-3d shadow-md rounded-xl p-6 flex items-center justify-center border-2 ${show ? 'bg-indigo-600 border-indigo-700' : 'bg-white border-slate-200'}`}>
        {!show ? (
          <div>
            <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest">Question</span>
            <p className="text-lg font-semibold text-slate-800">{card.question}</p>
            <p className="text-[10px] text-slate-400 mt-2 italic">Click to reveal answer</p>
          </div>
        ) : (
          <div>
            <span className="text-xs font-bold text-indigo-200 uppercase tracking-widest">Answer</span>
            <p className="text-md text-white leading-relaxed">{card.answer}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Flashcards({ data }) {
  if (!data?.length) return null;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
      {data.map((card, i) => <Card key={i} card={card} />)}
    </div>
  );
}