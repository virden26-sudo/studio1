import { z } from 'genkit';

const AssignmentSchema = z.object({
  title: z.string().describe('The title of the assignment.'),
  dueDate: z.string().describe('The due date of the assignment in ISO 8601 format (YYYY-MM-DD).'),
});

const QuizSchema = z.object({
    title: z.string().describe('The title of the quiz.'),
    dueDate: z.string().describe('The due date of the quiz in ISO 8601 format (YYYY-MM-DD).'),
    questionCount: z.number().optional().describe('The number of questions in the quiz.'),
});

export const SyllabusDataSchema = z.object({
  courseName: z.string().describe("The name or title of the course (e.g., 'Introduction to Psychology', 'CS 101')."),
  assignments: z.array(AssignmentSchema).describe('A list of all assignments found in the syllabus.'),
  quizzes: z.array(QuizSchema).describe('A list of all quizzes or tests found in the syllabus.'),
});

export type SyllabusData = z.infer<typeof SyllabusDataSchema>;
