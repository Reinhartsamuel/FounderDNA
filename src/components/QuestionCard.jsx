import { useState, useEffect } from "react";

export default function QuestionCard({ question, currentQuestion, totalQuestions, onSelect, onBack }) {
  const [options, setOptions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    setOptions([...question.options].sort(() => Math.random() - 0.5));
    setSelectedIndex(null);
  }, [question]);

  const handleSelect = (opt, idx) => {
    setSelectedIndex(idx);
    setTimeout(() => {
      onSelect(opt.tags);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
      <div className="max-w-3xl w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={onBack}
              className="text-gray-500 hover:text-white transition-colors duration-200 flex items-center gap-2 text-sm font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
              Back
            </button>
            <div className="text-sm text-gray-500 font-medium tracking-wider uppercase">
              Question {currentQuestion} of {totalQuestions}
            </div>
          </div>
          <div className="w-full bg-gray-900 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-white h-full transition-all duration-500 ease-out"
              style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        <h3 className="text-3xl md:text-4xl font-bold text-white text-center leading-tight px-4">
          {question.text}
        </h3>

        <div className="space-y-3 pt-4">
          {options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(opt, idx)}
              className={`block w-full text-left px-6 py-5 bg-gray-900 text-white rounded-xl transition-all duration-200 border border-gray-800 ${
                selectedIndex === idx
                  ? 'bg-white text-black border-white scale-105'
                  : 'hover:bg-gray-800 hover:border-gray-700'
              }`}
            >
              <span className="text-lg">{opt.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
