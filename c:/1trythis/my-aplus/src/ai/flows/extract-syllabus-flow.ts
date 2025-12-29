
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { SyllabusDataSchema } from '@/ai/schemas';

const syllabusPrompt = ai.definePrompt({
    name: 'syllabusPrompt',
    input: { schema: z.object({ syllabusText: z.string(), currentDate: z.string() }) },
    output: { schema: SyllabusDataSchema },
    prompt: `You are an expert-level data extraction and formatting AI. Your primary function is to meticulously parse unstructured text from a syllabus and convert it into a perfectly structured JSON object.

**Critical Instructions:**
1.  **Analyze the Entire Text:** Read the complete syllabus text provided below.
2.  **Identify Key Information:** Your goal is to extract the course name, all assignments, and all quizzes.
3.  **Handle Imperfect Data:** The text may be messy, incomplete, or poorly formatted. You MUST handle this gracefully.
    *   If you cannot find a course name, return an empty string "" for the 'courseName' field.
    *   If you cannot find any assignments, return an empty array [] for the 'assignments' field.
    *   If you cannot find any quizzes, return an empty array [] for the 'quizzes' field.
    *   **Do NOT fail or error out if information is missing.** Your job is to extract what is present and format it correctly.
4.  **Format Due Dates:**
    *   All due dates MUST be converted to the strict 'YYYY-MM-DD' ISO 8601 format.
    *   Use today's date, which is {{{currentDate}}}, as a reference to resolve relative dates like "next Tuesday", "in two weeks", or "end of the month".
    *   **If a due date for a specific assignment or quiz is ambiguous or cannot be reliably determined, you MUST omit that entire item from the list rather than providing a malformed or incorrect date. This is a critical rule.**
5.  **Structure the Output:** The final output MUST be a valid JSON object that strictly conforms to the requested schema. Pay close attention to data types (strings, arrays of objects).

**Today's Date:** {{{currentDate}}}

**Syllabus Text to Analyze:**
---
{{{syllabusText}}}
---

Now, perform the extraction and provide the structured JSON output.`,
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
