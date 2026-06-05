import { useState } from 'react';

export default function InputForm({ onGenerate, loading }) {
  const [form, setForm] = useState({
    topic: '',
    type: 'MCQ',
    difficulty: 'Medium',
    count: 5,
    language: 'english',
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.topic.trim()) return;
    onGenerate(form);
  }

  return (
    <div className="input-form">
      <h2>Generate Exam Questions</h2>

      <label>Topic or paste your notes</label>
      <textarea
        name="topic"
        rows={4}
        placeholder="e.g. Photosynthesis, Newton's Laws, World War 2..."
        value={form.topic}
        onChange={handleChange}
      />

      <div className="form-row">
        <div>
          <label>Question type</label>
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="MCQ">Multiple Choice (MCQ)</option>
            <option value="fill-in-the-blank">Fill in the blank</option>
            <option value="short-answer">Short answer</option>
          </select>
        </div>

        <div>
          <label>Difficulty</label>
          <select name="difficulty" value={form.difficulty} onChange={handleChange}>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>

        <div>
          <label>Number of questions</label>
          <select name="count" value={form.count} onChange={handleChange}>
            {[3, 5, 10, 15, 20].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Language</label>
          <select name="language" value={form.language} onChange={handleChange}>
            <option value="english">English</option>
            <option value="telugu">Telugu</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading || !form.topic.trim()}
        className="generate-btn"
      >
        {loading ? 'Generating...' : '✨ Generate Questions'}
      </button>
    </div>
  );
}