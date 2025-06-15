import { writeFile } from 'fs/promises';

import tmp from 'tmp-promise';

async function downloadTwilioFile(url: string) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  const authHeader = Buffer.from(`${accountSid}:${authToken}`).toString(
    'base64',
  );

  const response = await fetch(url, {
    headers: {
      Authorization: `Basic ${authHeader}`,
    },
  });

  if (!response.ok) throw new Error(`Could not download Twilio file: ${url}`);

  return response;
}

async function createTemporaryFile(buffer: ArrayBuffer, fileExtension: string) {
  const { path, cleanup } = await tmp.file({ postfix: fileExtension });

  await writeFile(path, Buffer.from(buffer));

  return {
    path,
    cleanupHandler: cleanup,
  };
}

export async function tmpFileDownloadFromURL(
  url: string,
  fileExtension: string,
) {
  const fileContentResponse = await downloadTwilioFile(url);

  const buffer = await fileContentResponse.arrayBuffer();

  return createTemporaryFile(buffer, fileExtension);
}
