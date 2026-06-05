export function parseResponse(rawText) {
  try {
    const clean = rawText.replace(/```json|```/g, '').trim();
    return JSON.parse(clean);
  } catch (err) {
    console.error('Failed to parse Gemini response:', err);
    return [];
  }
}