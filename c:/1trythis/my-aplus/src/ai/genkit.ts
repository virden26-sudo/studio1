
'use server';

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';
import {genkitNext} from '@genkit-ai/next';

export const ai = genkit(
  genkitNext({
    plugins: [googleAI()],
  })
);
