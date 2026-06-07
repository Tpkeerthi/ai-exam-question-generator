import { useState } from 'react';
import { buildPrompt } from '../utils/promptBuilder';
import { parseResponse } from '../utils/parseResponse';

const API_KEY = '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';

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
        'https://openrouter.ai/api/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            model: 'google/gemini-2.5-flash',
            messages: [
              {
                role: 'user',
                content: buildPrompt(formData)
              }
            ]
          }),
        }
      );

      const data = await response.json();
      console.log('API Response:', data);

      if (data.error) {
        throw new Error(data.error.message);
      }

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