
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

// Define the shape of a quiz
export interface Quiz {
  id: string;
  title: string;
  course: string;
  dueDate: Date;
  questionCount?: number;
}

// Define the context type
interface QuizzesContextType {
  quizzes: Quiz[];
  addQuiz: (quiz: Omit<Quiz, 'id'>) => void;
  loading: boolean;
}

// Create the context
const QuizzesContext = createContext<QuizzesContextType | undefined>(undefined);

// Custom hook to use the quizzes context
export const useQuizzes = () => {
  const context = useContext(QuizzesContext);
  if (!context) {
    throw new Error('useQuizzes must be used within a QuizzesProvider');
  }
  return context;
};

// Create the provider component
export const QuizzesProvider = ({ children }: { children: ReactNode }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  // Load quizzes from localStorage on initial render
  useEffect(() => {
    try {
      const storedQuizzes = localStorage.getItem('agendaQuizzes');
      if (storedQuizzes) {
        // Parse and convert date strings back to Date objects
        const parsedQuizzes = JSON.parse(storedQuizzes).map((q: any) => ({
          ...q,
          dueDate: new Date(q.dueDate),
        }));
        setQuizzes(parsedQuizzes);
      }
    } catch (error) {
      console.error("Failed to load quizzes", error);
      // Clear corrupted storage
      localStorage.removeItem('agendaQuizzes');
    } finally {
        setLoading(false);
    }
  }, []);

  // Save quizzes to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
        try {
            localStorage.setItem('agendaQuizzes', JSON.stringify(quizzes));
        } catch (error) {
            console.error("Failed to save quizzes to local storage", error);
        }
    }
  }, [quizzes, loading]);

  const addQuiz = useCallback((quiz: Omit<Quiz, 'id'>) => {
    const newQuiz: Quiz = {
      ...quiz,
      id: Date.now().toString(),
    };
    setQuizzes(prev => [...prev, newQuiz]);
  }, []);


  const value = {
    quizzes,
    addQuiz,
    loading,
  };

  return (
    <QuizzesContext.Provider value={value}>
      {children}
    </QuizzesContext.Provider>
  );
};
