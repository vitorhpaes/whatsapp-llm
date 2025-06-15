import 'dotenv/config';
import { OpenAIWhisperAudio } from '@langchain/community/document_loaders/fs/openai_whisper_audio';
import { tmpFileDownloadFromURL } from 'src/infra/files/tmp-file-download';

export async function transcribeAudioFromURL(url: string) {
  const { path, cleanupHandler } = await tmpFileDownloadFromURL(url, '.ogg');

  const whisperLoader = new OpenAIWhisperAudio(path, {
    transcriptionCreateParams: {
      model: 'whisper-1', // -> $ 0,006 per minute,
      // model: 'gpt-4o-transcribe', // -> $ 0,006 per minute
      // model: 'gpt-4o-mini-transcribe', // -> $ 0,003 per minute
    },
  });

  const audioDocs = await whisperLoader.load();

  const finalAudioTranscription = audioDocs
    .map((d) => d.pageContent)
    .join('\n');

  cleanupHandler();

  return finalAudioTranscription;
}
