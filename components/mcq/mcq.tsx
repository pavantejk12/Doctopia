'use client'

// src/components/MCQ.tsx
import React, { useState } from 'react';

interface Option {
  id: string;
  option: string;
  isoption: boolean;
}

interface Question {
  id: string;
  image?: {
    id: string;
    filename: string;
    mimeType: string;
    filesize: number;
    width: number;
    height: number;
    createdAt: string;
    updatedAt: string;
    url: string;
  };
  question: string;
  options: Option[];
}

const MCQ: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({});
  const [userScore, setUserScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const data: {
    id: string;
    name: string;
    questions: Question[];
    createdAt: string;
    updatedAt: string;
  } = {
    id: "65de141d4922ec96a1e2b96c",
    name: "MCQ Demo test",
    questions: [
      {
        id: "65de140e9dc5c9c3283b5b87",
        image: {
          id: "65971b8d1c8eb925aebf1bf6",
          filename: "tshirt (1)-1.png",
          mimeType: "image/png",
          filesize: 1582,
          width: 64,
          height: 64,
          createdAt: "2024-01-04T20:56:45.809Z",
          updatedAt: "2024-01-04T20:56:45.809Z",
          url: "https://d3th4fjgtl3dup.cloudfront.net/images/drive/tshirt (1)-1.png",
        },
        question: "What is this ?",
        options: [
          {
            id: "65de14129dc5c9c3283b5b88",
            option: "T shirt",
            isoption: true,
          },
          {
            id: "65de14169dc5c9c3283b5b89",
            option: "Pant",
            isoption: false,
          },
        ],
      },
      {
        id: "65de1b2cdcf23b65aefd1056",
        question: "What do you mean by BD",
        options: [
          {
            id: "65de1b3ddcf23b65aefd1057",
            option: "Bangladesh",
            isoption: true,
          },
          {
            id: "65de1b44dcf23b65aefd1058",
            option: "India",
            isoption: false,
          },
        ],
      },
    ],
    createdAt: "2024-02-27T16:55:57.866Z",
    updatedAt: "2024-02-27T17:26:41.851Z",
  };

  // Set the total number of questions
  React.useEffect(() => {
    setTotalQuestions(data.questions.length);
  }, [data.questions]);

  const handleOptionChange = (questionId: string, optionId: string) => {
    setSelectedOptions((prevSelectedOptions) => {
      const currentSelectedOptions = prevSelectedOptions[questionId] || [];
      const updatedOptions = [...currentSelectedOptions];

      const optionIndex = updatedOptions.indexOf(optionId);

      if (optionIndex === -1) {
        updatedOptions.push(optionId);
      } else {
        updatedOptions.splice(optionIndex, 1);
      }

      return {
        ...prevSelectedOptions,
        [questionId]: updatedOptions,
      };
    });
  };

  const handleSubmit = () => {
    console.log(selectedOptions)

    let score = 0;

    data.questions.forEach((question) => {
      const userAnswers = selectedOptions[question.id] || [];
      const correctAnswers = question.options.filter((opt) => opt.isoption).map((opt) => opt.id);

      if (userAnswers.length === correctAnswers.length && userAnswers.every((opt) => correctAnswers.includes(opt))) {
        score += 1;
      }
    });

    setUserScore(score);
  };

  // Calculate the total score percentage
  const totalScorePercentage = ((userScore / totalQuestions) * 100).toFixed(2);

  return (
    <div>
      <h2>{data.name}</h2>
      {data.questions.map((question) => (
        <div key={question.id}>
          <h3>{question.question}</h3>
          {question.image && <img src={question.image.url} alt="Question" />}
          <ul>
            {question.options.map((option) => (
              <li key={option.id}>
                <label>
                  <input
                    type="checkbox"
                    name={`mcqOption_${question.id}_${option.id}`}
                    value={option.id}
                    checked={(selectedOptions[question.id] || []).includes(option.id)}
                    onChange={() => handleOptionChange(question.id, option.id)}
                  />
                  {option.option}
                </label>
              </li>
            ))}
          </ul>
          <p>
            Selected Options for Question {question.id}: {JSON.stringify(selectedOptions[question.id] || [])}
          </p>
        </div>
      ))}
      <button onClick={handleSubmit}>Submit Answers</button>
      {userScore > 0 && (
        <div>
          <p>Total Score: {userScore}</p>
          <p>Total Score Percentage: {totalScorePercentage}%</p>
        </div>
      )}
    </div>
  );
};

export default MCQ;
