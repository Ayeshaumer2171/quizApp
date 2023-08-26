  import React, { useState } from 'react';
 import questions from './QuizApp/questions.json';
 import './App.css';

  function getOptionClass(qid, opt, attempts) {
  let found = attempts.find(attempt => attempt.qid === qid && attempt.opt === opt);
  if (found) {
    return found.isCorrect ? 'list-group-item success' : 'list-group-item error';
  } else {
    return 'list-group-item';
  }
}

   export default function App() {
  const [attempts, setAttempts] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false); 

  const currentQuestion = questions[currentQuestionIndex];

  const optionSelection = (qid, opt) => {
    const question = questions.find(q => q.id === qid);
    const correctOptIndex = question.answerIndex;
    let isCorrect = opt === question.options[correctOptIndex];
    let attempt = { qid: qid, opt: opt, isCorrect: isCorrect };
    setAttempts([...attempts, attempt]);

    if (currentQuestionIndex === questions.length - 1) {
      setShowResults(true);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setAttempts([]); 
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    const correctAttempts = attempts.filter(attempt => attempt.isCorrect);
   return correctAttempts.length;
  };

  return (
    <div className='container'>

      <h1 style={{display:'flex',justifyContent:'center',color:'white'}}>My Quiz</h1><br></br>
      {showResults ? (
        <div className='result'>
          <h4>Quiz Results</h4>
          <p>Your score: {calculateScore()} / {questions.length}</p>
          <button onClick={() => window.location.reload()}>Restart Quiz</button>
        </div>
      ) : (
        <div>
          <div key={currentQuestion.id}>
            <h4 style={{color:'white'}}>{currentQuestion.statement}</h4>
            <ul className='list-group'>
              {currentQuestion.options.map(opt => {
                return (
                  <li
                    className={getOptionClass(currentQuestion.id, opt, attempts)}
                    key={opt}
                    onClick={() => optionSelection(currentQuestion.id, opt)}
                  >
                    {opt}
                  </li>
                );
              })}
            </ul>
          </div>
          {attempts.length > 0 && (
            <button className='next-button' onClick={handleNext}>
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
}
