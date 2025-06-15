import { tool } from '@langchain/core/tools';
import { transcribeAudioFromURL } from 'src/infra/langchain/functions/audio-transcription';

import { z } from 'zod';

const toolSchema = z.object({
  url: z.string().url(),
});

export const twilioAudioTranscriptionTool = tool(
  ({ url }) => {
    return transcribeAudioFromURL(url);
  },
  {
    name: 'Tool de transcrição',
    description:
      'Tool utilizada para transcrever um áudio para texto em qualquer linguagem',
    schema: toolSchema,
  },
);
