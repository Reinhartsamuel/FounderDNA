import { useState } from 'react';
import LandingScreen from './components/LandingScreen';
import QuestionCard from './components/QuestionCard';
import ResultCard from './components/ResultCard';
import questionsData from './data/questions.json';
import { calculateResult } from './utils/scoring';

function App() {
  const [screen, setScreen] = useState('landing');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const handleStart = () => {
    setScreen('quiz');
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  const handleAnswer = (tags) => {
    const newAnswers = [...answers, tags];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questionsData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const calculatedResult = calculateResult(newAnswers);
      setResult(calculatedResult);
      setScreen('result');
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setAnswers(answers.slice(0, -1));
    } else {
      setScreen('landing');
      setAnswers([]);
      setCurrentQuestionIndex(0);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-10 bg-black border-b border-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-xl font-bold text-white tracking-tight">FounderDNA</h1>
        </div>
      </div>

      <div className="pt-16">
        {screen === 'landing' && (
          <LandingScreen onStart={handleStart} />
        )}

        {screen === 'quiz' && (
          <QuestionCard
            question={questionsData[currentQuestionIndex]}
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={questionsData.length}
            onSelect={handleAnswer}
            onBack={handleBack}
          />
        )}

        {screen === 'result' && result && (
          <ResultCard
            result={result.archetype}
            scores={result.scores}
            archetypeInfo={result.archetypeInfo}
          />
        )}
      </div>
    </>
  );
}

export default App;
