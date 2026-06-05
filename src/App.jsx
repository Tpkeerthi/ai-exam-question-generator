import { useGemini } from './hooks/useGemini';
import InputForm from './components/InputForm';
import QuestionCard from './components/QuestionCard';
import ExportButton from './components/ExportButton';
import Loader from './components/Loader';
import './App.css';

export default function App() {
  const { questions, loading, error, generateQuestions } = useGemini();

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎓 AI Exam Question Generator</h1>
        <p>Powered by Google Gemini • Supports Telugu & English</p>
      </header>

      <main>
        <InputForm onGenerate={generateQuestions} loading={loading} />

        {loading && <Loader />}

        {error && <p className="error-msg">{error}</p>}

        {questions.length > 0 && (
          <section className="results">
            <div className="results-header">
              <h2>{questions.length} Questions Generated</h2>
              <ExportButton questions={questions} topic="Exam" />
            </div>

            {questions.map((q, i) => (
              <QuestionCard key={q.id || i} question={q} index={i} />
            ))}

            <div className="bottom-export">
              <ExportButton questions={questions} topic="Exam" />
            </div>
          </section>
        )}
      </main>

      <footer>
        <p>Built with React + Gemini AI</p>
      </footer>
    </div>
  );
}