import { useState } from 'react';

export default function QuestionCard({ question, index }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [selected, setSelected] = useState(null);

  function getOptionClass(letter) {
    if (!showAnswer && selected === letter) return 'selected';
    if (showAnswer && letter === question.answer) return 'correct';
    if (showAnswer && selected === letter && letter !== question.answer) return 'wrong';
    return '';
  }

  return (
    <div className="question-card">
      <p className="q-number">Question {index + 1}</p>
      <p className="q-text">{question.question}</p>

      {question.options && (
        <ul className="options">
          {question.options.map((opt, i) => {
            const letter = opt[0];
            return (
              <li
                key={i}
                className={getOptionClass(letter)}
                onClick={() => !showAnswer && setSelected(letter)}
              >
                {opt}
              </li>
            );
          })}
        </ul>
      )}

      <button
        className="reveal-btn"
        onClick={() => setShowAnswer(!showAnswer)}
      >
        {showAnswer ? 'Hide Answer' : 'Show Answer'}
      </button>

      {showAnswer && (
        <div className="answer-box">
          <strong>✅ Answer: {question.answer}</strong>
          <p>{question.explanation}</p>
        </div>
      )}
    </div>
  );
}