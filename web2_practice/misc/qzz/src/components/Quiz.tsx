// components/Quiz.tsx

import { Container, Heading, Text, Button } from '@shadcn/ui';
import { motion } from 'framer-motion';
import React from 'react';

// Define types for the answer and question structures
interface Answer {
  id: string;
  text: string;
}

interface Question {
  id: number;
  text: string;
  answers: Answer[];
}

// Sample data for the quiz
const questions: Question[] = [
  {
    id: 1,
    text: 'What is the capital of France?',
    answers: [
      { id: 'a', text: 'Paris' },
      { id: 'b', text: 'London' },
      { id: 'c', text: 'Berlin' },
      { id: 'd', text: 'Madrid' },
    ],
  },
  {
    id: 2,
    text: 'What is the largest planet in our solar system?',
    answers: [
      { id: 'a', text: 'Earth' },
      { id: 'b', text: 'Saturn' },
      { id: 'c', text: 'Jupiter' },
      { id: 'd', text: 'Mars' },
    ],
  },
  {
    id: 3,
    text: 'What is the chemical symbol for Gold?',
    answers: [
      { id: 'a', text: 'Au' },
      { id: 'b', text: 'Ag' },
      { id: 'c', text: 'Fe' },
      { id: 'd', text: 'Pb' },
    ],
  },
];

const QuizQuestion: React.FC<{ question: Question }> = ({ question }) => {
  return (
    <Container className="mb-4">
      <Heading className="text-2xl font-bold mb-2">{question.text}</Heading>
      <ul>
        {question.answers.map((answer) => (
          <motion.li
            key={answer.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Text className="text-lg">{answer.text}</Text>
          </motion.li>
        ))}
      </ul>
    </Container>
  );
};

const Quiz: React.FC = () => {
  return (
    <Container className="max-w-md mx-auto p-4">
      <Heading className="text-3xl font-bold mb-4">Quiz Time!</Heading>
      <Text className="text-lg mb-4">
        Answer the following questions to test your knowledge.
      </Text>
      {questions.map((question) => (
        <QuizQuestion key={question.id} question={question} />
      ))}
      <Button className="mt-4" onClick={() => console.log('Submit quiz')}>
        Submit
      </Button>
    </Container>
  );
};

export default Quiz;