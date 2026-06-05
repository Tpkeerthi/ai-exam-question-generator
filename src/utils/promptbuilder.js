export function buildPrompt({ topic, type, difficulty, count, language }) {
  return `
You are an expert teacher. Generate ${count} ${type} questions on the topic: "${topic}".
Difficulty level: ${difficulty}.
Language: ${language === 'telugu' ? 'Telugu' : 'English'}.

Return ONLY a valid JSON array with no extra text, no markdown, no code fences.
Use this exact format:
[
  {
    "id": 1,
    "question": "...",
    "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
    "answer": "A",
    "explanation": "Brief explanation why this answer is correct."
  }
]

For fill-in-the-blank: omit "options".
For short-answer: omit "options", set answer to a 1-2 sentence model answer.
  `;
}