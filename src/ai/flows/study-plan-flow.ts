
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { StudyPlanSchema } from '@/ai/schemas';

const AssignmentInputSchema = z.object({
  id: z.string(),
  title: z.string(),
  course: z.string(),
  dueDate: z.date(),
  completed: z.boolean(),
});

const StudyPlanInputSchema = z.object({
    assignments: z.array(AssignmentInputSchema),
    currentDate: z.string(),
});

const studyPlanPrompt = ai.definePrompt({
  name: 'studyPlanPrompt',
  input: { schema: StudyPlanInputSchema },
  output: { schema: StudyPlanSchema },
  prompt: `You are an expert academic advisor. Your task is to create a realistic and effective study plan for a student based on their list of upcoming assignments.

Today's date is {{{currentDate}}}. The student needs a clear, actionable plan to help them prepare for their deadlines without cramming.

Generate a series of study sessions. For each session, provide a clear topic, specific goals, a start and end time, and link it to a specific assignment. Schedule sessions logically, leaving some buffer room around due dates. Prioritize assignments that are due sooner.

Here is the list of upcoming assignments:
{{#each assignments}}
- {{title}} (Course: {{course}}) - Due: {{dueDate}}
{{/each}}

Create a concise, encouraging summary for the plan and then provide the detailed session breakdown. Return the response in the requested JSON format.`,
});

const generateStudyPlanFlow = ai.defineFlow(
  {
    name: 'generateStudyPlanFlow',
    inputSchema: z.array(AssignmentInputSchema),
    outputSchema: StudyPlanSchema,
  },
  async (assignments) => {
    const { output } = await studyPlanPrompt({
        assignments,
        currentDate: new Date().toLocaleDateString()
    });
    if (!output) {
      throw new Error("Study plan generation failed to produce output.");
    }
    return output;
  }
);

export async function generateStudyPlan(assignments: z.infer<typeof AssignmentInputSchema>[]) {
  return generateStudyPlanFlow(assignments);
}
