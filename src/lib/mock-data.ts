export type Assignment = {
  id: string;
  title: string;
  course: string;
  dueDate: Date;
  submitted: boolean;
};

export const assignments: Assignment[] = [
  {
    id: "1",
    title: "Calculus Homework 3",
    course: "MATH 201",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 2)),
    submitted: false,
  },
  {
    id: "2",
    title: "Essay on Roman History",
    course: "HIST 101",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 5)),
    submitted: false,
  },
  {
    id: "3",
    title: "Lab Report: Photosynthesis",
    course: "BIOL 101",
    dueDate: new Date(new Date().setDate(new Date().getDate() - 1)),
    submitted: true,
  },
  {
    id: "4",
    title: "Programming Assignment 2",
    course: "CS 101",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    submitted: false,
  },
];

export type Announcement = {
  id: string;
  title: string;
  course: string;
  date: Date;
  content: string;
};

export const announcements: Announcement[] = [
  {
    id: "1",
    title: "Midterm Exam Room Change",
    course: "CS 101",
    date: new Date(new Date().setDate(new Date().getDate() - 1)),
    content: "The midterm exam will now be held in room 304 of the engineering building.",
  },
  {
    id: "2",
    title: "Guest Speaker Next Week",
    course: "HIST 101",
    date: new Date(new Date().setDate(new Date().getDate() - 3)),
    content: "Dr. Eleanor Vance will be giving a lecture on the Flavian dynasty.",
  },
];

export type Quiz = {
    id: string;
    title: string;
    course: string;
    dueDate: Date;
    questionCount: number;
}

export const quizzes: Quiz[] = [
    {
        id: "1",
        title: "Quiz 4: Derivatives",
        course: "MATH 201",
        dueDate: new Date(new Date().setDate(new Date().getDate() + 3)),
        questionCount: 10,
    },
    {
        id: "2",
        title: "Pop Quiz: Cell Mitosis",
        course: "BIOL 101",
        dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
        questionCount: 5,
    }
]

export type Discussion = {
    id: string;
    title: string;
    course: string;
    author: string;
    authorAvatarUrl: string;
    lastReply: Date;
    unreadReplies: number;
}

export const discussions: Discussion[] = [
    {
        id: "1",
        title: "Thoughts on the 'Republic'?",
        course: "PHIL 202",
        author: "Alex Johnson",
        authorAvatarUrl: "https://picsum.photos/seed/11/40/40",
        lastReply: new Date(new Date().setDate(new Date().getDate() - 0)),
        unreadReplies: 2,
    },
    {
        id: "2",
        title: "Help with pointer arithmetic",
        course: "CS 101",
        author: "Maria Garcia",
        authorAvatarUrl: "https://picsum.photos/seed/12/40/40",
        lastReply: new Date(new Date().setDate(new Date().getDate() - 2)),
        unreadReplies: 0,
    }
]

export type Grade = {
    id: string;
    assignment: string;
    course: string;
    grade: number;
}

export const grades: Grade[] = [
    {
        id: "1",
        assignment: "Homework 2",
        course: "MATH 201",
        grade: 95,
    },
    {
        id: "2",
        assignment: "Lab Report 1",
        course: "BIOL 101",
        grade: 88,
    },
    {
        id: "3",
        assignment: "Quiz 3",
        course: "CS 101",
        grade: 92,
    },
    {
        id: "4",
        assignment: "Essay 1",
        course: "HIST 101",
        grade: 78,
    },
]
