
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { AssignmentSchema } from '@/ai/schemas';

const SingleAssignmentSchema = AssignmentSchema.pick({ title: true, course: true, dueDate: true });

const assignmentPrompt = ai.definePrompt({
    name: 'assignmentPrompt',
    input: { schema: z.object({ assignmentText: z.string() }) },
    output: { schema: SingleAssignmentSchema },
    prompt: `You are an expert academic assistant. Your task is to parse the following text and extract the assignment details.

Today's date is ${new Date().toLocaleDateString()}. When extracting due dates, please resolve them to a specific calendar date in YYYY-MM-DD format. For example, "due next Friday" should be converted to the correct date.

Assignment Text:
{{{assignmentText}}}

Extract the assignment title, the course name, and the due date. Return the information in the structured JSON format requested.`,
});


const extractAssignmentFlow = ai.defineFlow(
  {
    name: 'extractAssignmentFlow',
    inputSchema: z.string(),
    outputSchema: SingleAssignmentSchema,
  },
  async (assignmentText) => {
    const { output } = await assignmentPrompt({ assignmentText });
    if (!output) {
      throw new Error("Assignment parsing failed to produce output.");
    }
    return output;
  }
);

export async function extractAssignmentData(assignmentText: string) {
  return extractAssignmentFlow(assignmentText);
}
