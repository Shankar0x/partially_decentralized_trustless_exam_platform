"use client"
import React from 'react';

const QuestionPage = ({
  question,
  options,
  questionNumber,
  totalQuestions,
  selectedOption,
  onNext,
  onPrevious,
  onClear,
  onSubmit,
  onSelectOption,
}) => {
  return (
    <div>
      <div>
        <h2>Question {questionNumber} of {totalQuestions}</h2>
        <p>{question}</p>
        <ul>
          {options.map((option, index) => (
            <li key={index}>
              <input
                type="radio"
                name={`question-${questionNumber}`}
                checked={selectedOption === option}
                onChange={() => onSelectOption(option)}
              />
              <label>{option}</label>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button onClick={onPrevious} disabled={questionNumber === 1}>
          Previous
        </button>
        <button onClick={onClear}>Clear</button>
        <button onClick={onNext} disabled={questionNumber === totalQuestions}>
          Next
        </button>
        <button onClick={onSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default QuestionPage;
