import React, { useState } from 'react';
import axios from 'axios';
import './QuestionAnswer.css';

const QuestionAnswer = ({ documentName, isDocumentUploaded }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const handleAsk = async () => {
    if (!question.trim()) {
      alert('Please enter a question.');
      return;
    }

    if (!isDocumentUploaded) {
      alert('Please upload a PDF document first.');
      return;
    }

    setIsLoading(true);
    const currentQuestion = question.trim();

    try {
      const response = await axios.post('/ask', {
        question: currentQuestion,
      });

      const newAnswer = response.data.answer;
      setAnswer(newAnswer);
      
      // Add to history
      setHistory(prev => [{
        question: currentQuestion,
        answer: newAnswer,
        timestamp: new Date().toLocaleString()
      }, ...prev]);

      setQuestion('');
    } catch (error) {
      console.error('Question error:', error);
      setAnswer(
        error.response?.data?.error || 'Failed to get answer. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleAsk();
    }
  };

  if (!isDocumentUploaded) {
    return (
      <div className="question-answer disabled">
        <h2>Ask Questions</h2>
        <p className="upload-prompt">Please upload a PDF document first to start asking questions.</p>
      </div>
    );
  }

  return (
    <div className="question-answer">
      <h2>Ask Questions About: {documentName}</h2>
      
      <div className="question-input-section">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter your question about the document..."
          disabled={isLoading}
          className="question-input"
          rows="3"
        />
        <button
          onClick={handleAsk}
          disabled={!question.trim() || isLoading}
          className="ask-button"
        >
          {isLoading ? 'Getting Answer...' : 'Ask Question'}
        </button>
      </div>

      {answer && (
        <div className="current-answer">
          <h3>Latest Answer:</h3>
          <div className="answer-content">
            {answer}
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="history-section">
          <h3>Question History</h3>
          <div className="history-list">
            {history.map((item, index) => (
              <div key={index} className="history-item">
                <div className="history-question">
                  <strong>Q:</strong> {item.question}
                </div>
                <div className="history-answer">
                  <strong>A:</strong> {item.answer}
                </div>
                <div className="history-timestamp">
                  {item.timestamp}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionAnswer;