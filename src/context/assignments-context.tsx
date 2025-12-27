
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { assignments as mockAssignments } from '@/lib/mock-data';

// Define the shape of an assignment
export interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: Date;
  completed: boolean;
}

// Define the context type
interface AssignmentsContextType {
  assignments: Assignment[];
  addAssignment: (assignment: Omit<Assignment, 'id' | 'completed'>) => void;
  updateAssignment: (id: string, updates: Partial<Assignment>) => void;
  deleteAssignment: (id: string) => void;
  toggleAssignment: (id: string) => void;
  loading: boolean;
}

// Create the context
const AssignmentsContext = createContext<AssignmentsContextType | undefined>(undefined);

// Custom hook to use the assignments context
export const useAssignments = () => {
  const context = useContext(AssignmentsContext);
  if (!context) {
    throw new Error('useAssignments must be used within an AssignmentsProvider');
  }
  return context;
};

// Create the provider component
export const AssignmentsProvider = ({ children }: { children: ReactNode }) => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  // Load assignments from localStorage on initial render or simulate fetch
  useEffect(() => {
    try {
      const storedAssignments = localStorage.getItem('agendaAssignments');
      if (storedAssignments) {
        // Parse and convert date strings back to Date objects
        const parsedAssignments = JSON.parse(storedAssignments).map((a: any) => ({
          ...a,
          dueDate: new Date(a.dueDate),
        }));
        setAssignments(parsedAssignments);
      } else {
        // If nothing is in storage, load mock data to simulate auto-update
        const assignmentsWithDateObjects = mockAssignments.map(a => ({...a, dueDate: new Date(a.dueDate)}));
        setAssignments(assignmentsWithDateObjects);
      }
    } catch (error) {
      console.error("Failed to load assignments", error);
      // Fallback to mock data on error
      const assignmentsWithDateObjects = mockAssignments.map(a => ({...a, dueDate: new Date(a.dueDate)}));
      setAssignments(assignmentsWithDateObjects);
    } finally {
        setLoading(false);
    }
  }, []);

  // Save assignments to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
        try {
            localStorage.setItem('agendaAssignments', JSON.stringify(assignments));
        } catch (error) {
            console.error("Failed to save assignments to local storage", error);
        }
    }
  }, [assignments, loading]);

  const addAssignment = (assignment: Omit<Assignment, 'id' | 'completed'>) => {
    const newAssignment: Assignment = {
      ...assignment,
      id: Date.now().toString(),
      completed: false,
    };
    setAssignments(prev => [...prev, newAssignment]);
  };

  const updateAssignment = (id: string, updates: Partial<Assignment>) => {
    setAssignments(prev =>
      prev.map(a => (a.id === id ? { ...a, ...updates } : a))
    );
  };

  const deleteAssignment = (id: string) => {
    setAssignments(prev => prev.filter(a => a.id !== id));
  };
  
  const toggleAssignment = (id: string) => {
    setAssignments(prev =>
        prev.map(a => (a.id === id ? { ...a, completed: !a.completed } : a))
    );
  }

  const value = {
    assignments,
    addAssignment,
    updateAssignment,
    deleteAssignment,
    toggleAssignment,
    loading,
  };

  return (
    <AssignmentsContext.Provider value={value}>
      {children}
    </AssignmentsContext.Provider>
  );
};
