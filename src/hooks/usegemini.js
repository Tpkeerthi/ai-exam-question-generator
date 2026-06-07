import { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { buildPrompt } from '../utils/promptBuilder';
import { parseResponse } from '../utils/parseResponse';

const ai = new GoogleGenAI({ apiKey: 'AQ.Ab8RN6IiscPdVk0WHsnX8XnRk3vEH2O7eG4YgKsCnodTPGTFKA' });

export function useGemini() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function generateQuestions(formData) {
    setLoading(true);
    setError(null);
    setQuestions([]);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: buildPrompt(formData),
      });

      const parsed = parseResponse(response.text);
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