import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import './App.css';
import AdminPanel from './AdminPanel';
import { QuizData as initialQuizData } from './QuizData';

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [quizData, setQuizData] = useState(initialQuizData);

  const handleAnswer = (selectedAnswer) => {
    const isCorrect = selectedAnswer === quizData[currentQuestion].correctAnswer;

    setAnswers([...answers, { question: currentQuestion + 1, answer: selectedAnswer, isCorrect }]);

    if (isCorrect) {
      setScore({ ...score, correct: score.correct + 1 });
    } else {
      setScore({ ...score, wrong: score.wrong + 1 });
    }

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleTryAgain = () => {
    setCurrentQuestion(0);
    setScore({ correct: 0, wrong: 0 });
    setShowResult(false);
    setAnswers([]);
  };

  const downloadResults = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Quiz Results');

    worksheet.columns = [
      { header: 'Question', key: 'question', width: 10 },
      { header: 'Answer', key: 'answer', width: 30 },
      { header: 'Is Correct', key: 'isCorrect', width: 15 },
    ];

    answers.forEach((answer) => {
      worksheet.addRow({
        question: answer.question,
        answer: answer.answer,
        isCorrect: answer.isCorrect ? 'Yes' : 'No',
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'quiz_results.xlsx');
  };

  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/admin"
            element={<AdminPanel quizData={quizData} setQuizData={setQuizData} />}
          />
          <Route
            path="/"
            element={
              <div className="quiz-container">
                <ProgressBar totalQuestions={quizData.length} currentQuestion={currentQuestion + 1} />
                {showResult ? (
                  <div className="result-container">
                    <h2>Quiz Result</h2>
                    <p>Correct Answers: {score.correct}</p>
                    <p>Wrong Answers: {score.wrong}</p>
                    <button className="btn" onClick={handleTryAgain} style={{ marginRight: '6px' }}>
                      Try Again
                    </button>
                    <button className="btn" onClick={downloadResults} style={{ marginLeft: '6px' }}>
                      Download Results
                    </button>
                  </div>
                ) : (
                  <div>
                    <h2>Computer Quiz</h2>
                    <p className="question-number">
                      Question {currentQuestion + 1} of {quizData.length}
                    </p>
                    <p className="question-text">{quizData[currentQuestion].question}</p>
                    <div className="options-container">
                      {quizData[currentQuestion].options.map((option, index) => (
                        <button
                          key={index}
                          className="option-btn"
                          onClick={() => handleAnswer(option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
