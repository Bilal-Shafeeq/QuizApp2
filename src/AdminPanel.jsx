import React, { useState } from 'react';
import './AdminPanel.css';

const AdminPanel = ({ quizData, setQuizData }) => {
    const [newQuestion, setNewQuestion] = useState('');
    const [newOptions, setNewOptions] = useState(['', '', '', '']);
    const [newCorrectAnswer, setNewCorrectAnswer] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);

    const handleAddQuestion = () => {
        const newQuizData = [
            ...quizData,
            {
                question: newQuestion,
                options: newOptions.filter((option) => option.trim() !== ''),
                correctAnswer: newCorrectAnswer.trim(),
            },
        ];
        setQuizData(newQuizData);
        clearInputs();
    };

    const handleDeleteQuestion = (index) => {
        const newQuizData = [...quizData];
        newQuizData.splice(index, 1);
        setQuizData(newQuizData);
    };

    const handleEditQuestion = (index) => {
        setEditingIndex(index);
        const questionToEdit = quizData[index];
        setNewQuestion(questionToEdit.question);
        setNewOptions([...questionToEdit.options]);
        setNewCorrectAnswer(questionToEdit.correctAnswer);
    };

    const handleSaveEdit = () => {
        if (editingIndex !== null) {
            const updatedQuizData = [...quizData];
            updatedQuizData[editingIndex] = {
                question: newQuestion,
                options: newOptions.filter((option) => option.trim() !== ''),
                correctAnswer: newCorrectAnswer.trim(),
            };
            setQuizData(updatedQuizData);
            clearInputs();
        }
    };

    const clearInputs = () => {
        setNewQuestion('');
        setNewOptions(['', '', '', '']);
        setNewCorrectAnswer('');
        setEditingIndex(null);
    };

    return (
        <div className="admin-panel">
            <h2>Admin Panel</h2>
            <div className="add-question">
                <h3>{editingIndex !== null ? 'Edit Question' : 'Add New Question'}</h3>
                <label>
                    Question:
                    <input
                        type="text"
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                    />
                </label>
                <div className="options-input">
                    <label style={{marginTop:"7px"}}>Options:</label>
                    {newOptions.map((option, i) => (
                        <input
                            key={i}
                            type="text"
                            value={option}
                            onChange={(e) => {
                                const updatedOptions = [...newOptions];
                                updatedOptions[i] = e.target.value;
                                setNewOptions(updatedOptions);
                            }}
                            placeholder={`Option ${i + 1}`}
                        />
                    ))}
                </div>
                <label>
                    Correct Answer:
                    <input
                        type="text"
                        value={newCorrectAnswer}
                        onChange={(e) => setNewCorrectAnswer(e.target.value)}
                    />
                </label>
                {editingIndex !== null ? (
                    <button onClick={handleSaveEdit}>Save Edit</button>
                ) : (
                    <button onClick={handleAddQuestion}>Add Question</button>
                )}
            </div>
            <div className="existing-questions">
                <h3>Existing Questions</h3>
                {quizData.map((question, index) => (
                    <div key={index} className="question-item">
                        <p>{question.question}</p>
                        <div className="question-actions">
                            <button onClick={() => handleEditQuestion(index)}>Edit</button>
                            <button onClick={() => handleDeleteQuestion(index)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPanel;
