export function flashcardPrompt(text) {
  return `
You are an educational assistant.

From the following lecture material, generate 10 flashcards in JSON format:

[
  { "question": "...", "answer": "..." }
]

Material:
"""${text}"""
`;
}

export function quizPrompt(text) {
  return `
You are an educational assistant.

Generate 5 multiple-choice questions in JSON format:

[
  {
    "question": "...",
    "options": ["...", "...", "...", "..."],
    "correct": "A",
    "explanation": "..."
  }
]

Material:
"""${text}"""
`;
}