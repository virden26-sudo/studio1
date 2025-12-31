
'use server';

import {genkit, genkitNext} from '@genkit-ai/next';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI()],
});
