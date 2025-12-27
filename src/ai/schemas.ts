
import { z } from 'genkit';

export const AssignmentSchema = z.object({
  title: z.string().describe('The title of the assignment.'),
  course: z.string().describe("The course name for the assignment (e.g., 'CS 101', 'Intro to Psychology')."),
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


const StudySessionSchema = z.object({
    topic: z.string().describe("The main topic or subject for the study session."),
    goals: z.array(z.string()).describe("Specific, actionable goals for the session (e.g., 'Complete Chapter 3 practice problems', 'Review lecture notes on Topic X')."),
    startTime: z.string().datetime().describe("The start time for the study session in ISO 8601 format."),
    endTime: z.string().datetime().describe("The end time for the study session in ISO 8601 format."),
    relatedAssignment: z.string().describe("The title of the assignment or quiz this study session is preparing for."),
});

export const StudyPlanSchema = z.object({
    summary: z.string().describe("A brief, encouraging summary of the study plan strategy."),
    sessions: z.array(StudySessionSchema).describe("A list of scheduled study sessions."),
});

export type StudyPlan = z.infer<typeof StudyPlanSchema>;
