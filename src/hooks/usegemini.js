import { useState } from 'react';
import { buildPrompt } from '../utils/promptBuilder';
import { parseResponse } from '../utils/parseResponse';

const API_KEY = 'AQ.Ab8RN6IiscPdVk0WHsnX8XnRk3vEH2O7eG4YgKsCnodTPGTFKA';

export function useGemini() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function generateQuestions(formData) {
    setLoading(true);
    setError(null);
    setQuestions([]);

    try {
      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': API_KEY,
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: buildPrompt(formData) }] }]
          }),
        }
      );

      const data = await response.json();
      console.log('API Response:', data);
      
      if (data.error) {
        throw new Error(data.error.message);
      }

      const text = data.candidates[0].content.parts[0].text;
      const parsed = parseResponse(text);
      setQuestions(parsed);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return { questions, loading, error, generateQuestions };
}