
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of a single grade and a course
export interface Grade {
  id: string;
  assignmentTitle: string;
  score: number;
  total: number;
}

export interface Course {
  id: string;
  name: string;
  grade: number; // Overall grade percentage
  grades: Grade[];
}

// Define the context type
interface GradesContextType {
  courses: Course[];
  addCourse: (courseName: string) => void;
  addGrade: (courseId: string, grade: Omit<Grade, 'id'>) => void;
  loading: boolean;
}

// Create the context
const GradesContext = createContext<GradesContextType | undefined>(undefined);

// Custom hook to use the grades context
export const useGrades = () => {
  const context = useContext(GradesContext);
  if (!context) {
    throw new Error('useGrades must be used within a GradesProvider');
  }
  return context;
};

// Helper to calculate overall grade for a course
const calculateOverallGrade = (grades: Grade[]): number => {
    if (grades.length === 0) return 0;
    const totalScore = grades.reduce((acc, g) => acc + g.score, 0);
    const totalPossible = grades.reduce((acc, g) => acc + g.total, 0);
    if (totalPossible === 0) return 0;
    return Math.round((totalScore / totalPossible) * 100);
}

// Create the provider component
export const GradesProvider = ({ children }: { children: ReactNode }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  // Load courses from localStorage on initial render
  useEffect(() => {
    try {
      const storedCourses = localStorage.getItem('agendaGrades');
      if (storedCourses) {
        setCourses(JSON.parse(storedCourses));
      }
    } catch (error) {
      console.error("Failed to load grades from local storage", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save courses to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem('agendaGrades', JSON.stringify(courses));
      } catch (error) {
        console.error("Failed to save grades to local storage", error);
      }
    }
  }, [courses, loading]);

  const addCourse = (courseName: string) => {
    const existingCourse = courses.find(c => c.name.toLowerCase() === courseName.toLowerCase());
    if (existingCourse) return; // Avoid adding duplicate courses

    const newCourse: Course = {
      id: Date.now().toString(),
      name: courseName,
      grade: 0,
      grades: [],
    };
    setCourses(prev => [...prev, newCourse]);
  };

  const addGrade = (courseId: string, grade: Omit<Grade, 'id'>) => {
    setCourses(prev =>
      prev.map(c => {
        if (c.id === courseId) {
          const newGrades = [...c.grades, { ...grade, id: Date.now().toString() }];
          const newOverallGrade = calculateOverallGrade(newGrades);
          return { ...c, grades: newGrades, grade: newOverallGrade };
        }
        return c;
      })
    );
  };

  const value = {
    courses,
    addCourse,
    addGrade,
    loading,
  };

  return (
    <GradesContext.Provider value={value}>
      {children}
    </GradesContext.Provider>
  );
};

    