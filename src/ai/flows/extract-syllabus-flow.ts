
'use server';
/**
 * @fileOverview A flow for extracting structured data from a syllabus text.
 *
 * - extractSyllabusData - A function that handles the syllabus data extraction.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { SyllabusDataSchema } from '@/ai/schemas';

const syllabusPrompt = ai.definePrompt({
    name: 'syllabusPrompt',
    input: { schema: z.object({ syllabusText: z.string() }) },
    output: { schema: SyllabusDataSchema },
    prompt: `You are an expert academic assistant. Your task is to parse the following syllabus text and extract key information about the course, its assignments, and quizzes.

Today's date is ${new Date().toLocaleDateString()}. When extracting due dates, please resolve them to a specific calendar date in YYYY-MM-DD format. For example, "due next Friday" should be converted to the correct date.

Syllabus Text:
{{{syllabusText}}}

Extract all assignments and quizzes, paying close attention to their titles and due dates. Return the information in the structured JSON format requested.`,
});


const extractSyllabusFlow = ai.defineFlow(
  {
    name: 'extractSyllabusFlow',
    inputSchema: z.string(),
    outputSchema: SyllabusDataSchema,
  },
  async (syllabusText) => {
    const { output } = await syllabusPrompt({ syllabusText });
    if (!output) {
      throw new Error("Syllabus parsing failed to produce output.");
    }
    return output;
  }
);

export async function extractSyllabusData(syllabusText: string) {
  return extractSyllabusFlow(syllabusText);
}
