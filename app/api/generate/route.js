export const runtime = "nodejs";

import { extractText } from "../../../lib/pdf";
import { callAI } from "../../../lib/openrouter";
import { flashcardPrompt, quizPrompt } from "../../../lib/prompts";

function safeParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    try {
      const match = text.match(/\[[\s\S]*\]/);
      if (!match) return [];

      return JSON.parse(match[0]);
    } catch (err) {
      console.error("PARSE FAILED:", text);
      return [];
    }
  }
}

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");

  const buffer = Buffer.from(await file.arrayBuffer());

  const text = await extractText(buffer);

  const MAX_LENGTH = 8000;
  const trimmedText = text.slice(0, MAX_LENGTH);

  const flashcardsRaw = await callAI(flashcardPrompt(trimmedText));
  const quizRaw = await callAI(quizPrompt(trimmedText));

  const flashcards = safeParse(flashcardsRaw);
  console.log("FLASH RAW:", flashcardsRaw);
  const quiz = safeParse(quizRaw);
  console.log("QUIZ RAW:", quizRaw);

  return Response.json({
    flashcards,
    quiz,
  });
}
