
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { SyllabusDataSchema } from '@/ai/schemas';

const syllabusPrompt = ai.definePrompt({
    name: 'syllabusPrompt',
    input: { schema: z.object({ syllabusText: z.string(), currentDate: z.string() }) },
    output: { schema: SyllabusDataSchema },
    prompt: `You are an expert academic assistant. Your task is to parse the following syllabus text and extract key information about the course, its assignments, and quizzes.

Today's date is {{{currentDate}}}. When extracting due dates, please resolve them to a specific calendar date in YYYY-MM-DD format. For example, "due next Friday" should be converted to the correct date.

Syllabus Text:
{{{syllabusText}}}

Analyze the text provided. Do your best to identify the course name, and list all assignments and quizzes you can find. It is okay if some information is missing (e.g., no quizzes are listed, or the course name is not obvious). Extract all the information you can from the text. Return the information in the structured JSON format requested.`,
});


const extractSyllabusFlow = ai.defineFlow(
  {
    name: 'extractSyllabusFlow',
    inputSchema: z.string(),
    outputSchema: SyllabusDataSchema,
  },
  async (syllabusText) => {
    const { output } = await syllabusPrompt({ 
        syllabusText,
        currentDate: new Date().toLocaleDateString()
    });
    if (!output) {
      throw new Error("Syllabus parsing failed to produce output.");
    }
    return output;
  }
);

export async function extractSyllabusData(syllabusText: string) {
  return extractSyllabusFlow(syllabusText);
}
