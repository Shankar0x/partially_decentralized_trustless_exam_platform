"use client"
import React, { useEffect, useState } from 'react';
import QuestionPage from '@/components/QuestionPage';
import Cookies from 'js-cookie';
import { useSession } from 'next-auth/react';

const Question = () => {
  const { data: session } = useSession();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const randomNumbers = JSON.parse(Cookies.get('randomNumbers'));

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
    if (selectedOption !== null) {
      setAnswers((prev) => {
        const newAnswers = [...prev];
        newAnswers[currentQuestion] = selectedOption;
        return newAnswers;
      });
    }
    setCurrentQuestion((prev) => Math.min(prev + 1, questions.length - 1));
    setSelectedOption(null);
  };

  const handlePrevious = () => {
    setCurrentQuestion((prev) => Math.max(prev - 1, 0));
    setSelectedOption(answers[currentQuestion - 1] || null);
  };

  const handleClear = () => {
    setSelectedOption(null);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = async () => {
    const rollNumber = session?.user?.name;
    const randomNumbers = JSON.parse(Cookies.get('randomNumbers'));
  
    // Ensure the last selected option is captured
    const updatedAnswers = [...answers];
    if (selectedOption !== null) {
      updatedAnswers[currentQuestion] = selectedOption;
    }
  
    // Format questions with "q" prefix
    const formattedQuestions = randomNumbers.map(num => `q${num}`);
  
    const submissionData = {
      rollNumber,
      questions: formattedQuestions, // Store questions with "q" prefix
      answers: updatedAnswers,        // Directly use updatedAnswers
    };
  
    try {
      const response = await fetch('/api/submitExam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submissionData)
      });
  
      if (response.ok) {
        // Handle success, maybe redirect to a success page or show a message
        console.log('Exam submitted successfully');
        // Redirect to the "submitted" page
        window.location.href = '/submitted';
      } else {
        // Handle error
        console.error('Failed to submit the exam');
      }
    } catch (error) {
      console.error('Error submitting the exam:', error);
    }
  };
  
  
  

  if (questions.length === 0) {
    return <div>Loading...</div>;
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
