"use client"
import React, { useEffect, useState } from 'react';
import QuestionPage from '@/components/QuestionPage';
import Cookies from 'js-cookie';

const Question = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      // Retrieve the random numbers from the cookie
      const randomNumbers = JSON.parse(Cookies.get('randomNumbers'));

      // Fetch questions from the API
      const response = await fetch('/api/getQuestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ randomNumbers })
      });

      const data = await response.json();
      setQuestions(data);
    };

    fetchQuestions();
  }, []);

  const handleNext = () => {
    setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1));
    setSelectedOption(null); // Reset option when moving to the next question
  };

  const handlePrevious = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
    setSelectedOption(null); // Reset option when moving to the previous question
  };

  const handleClear = () => {
    setSelectedOption(null);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    // Logic to submit the test
  };

  if (questions.length === 0) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return (
    <QuestionPage
      question={questions[currentQuestion].q}
      options={[questions[currentQuestion].a, questions[currentQuestion].b, questions[currentQuestion].c, questions[currentQuestion].d]}
      questionNumber={currentQuestion + 1}
      totalQuestions={questions.length}
      selectedOption={selectedOption}
      onNext={handleNext}
      onPrevious={handlePrevious}
      onClear={handleClear}
      onSubmit={handleSubmit}
      onSelectOption={handleSelectOption}
    />
  );
};

export default Question;
