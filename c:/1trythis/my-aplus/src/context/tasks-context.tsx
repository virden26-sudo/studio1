
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

// Define the shape of a task
export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

// Define the context type
interface TasksContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'completed'>) => void;
  toggleTask: (id: string) => void;
  loading: boolean;
}

// Create the context
const TasksContext = createContext<TasksContextType | undefined>(undefined);

// Custom hook to use the tasks context
export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
};

// Create the provider component
export const TasksProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  // Load tasks from localStorage on initial render
  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem('agendaTasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error("Failed to load tasks", error);
      localStorage.removeItem('agendaTasks');
    } finally {
        setLoading(false);
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
        try {
            localStorage.setItem('agendaTasks', JSON.stringify(tasks));
        } catch (error) {
            console.error("Failed to save tasks to local storage", error);
        }
    }
  }, [tasks, loading]);

  const addTask = useCallback((task: Omit<Task, 'id' | 'completed'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      completed: false,
    };
    setTasks(prev => [...prev, newTask]);
  }, []);
  
  const toggleTask = useCallback((id: string) => {
    setTasks(prev =>
        prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, []);

  const value = {
    tasks,
    addTask,
    toggleTask,
    loading,
  };

  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  );
};
