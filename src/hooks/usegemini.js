import { useState } from 'react';
import { buildPrompt } from '../utils/promptBuilder';
import { parseResponse } from '../utils/parseResponse';

const WORKER_URL = 'https://proud-poetry-4d2d.keerthipriyathammineni.workers.dev';

export function useGemini() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function generateQuestions(formData) {
    setLoading(true);
    setError(null);
    setQuestions([]);

    try {
      const response = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [{ role: 'user', content: buildPrompt(formData) }]
        }),
      });

      const data = await response.json();
      console.log('API Response:', data);

      if (data.error) throw new Error(data.error.message);

      const text = data.choices[0].message.content;
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