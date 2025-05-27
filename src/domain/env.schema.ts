import { z } from 'zod';

const dotEnvSchema = z.object({
  PORT: z.coerce.number().default(3000),
  OPENAI_API_KEY: z.string(),
  TWILIO_ACCOUNT_SID: z.string(),
  TWILIO_AUTH_TOKEN: z.string(),
  TWILIO_WHATSAPP_NUMBER: z.string(),
});

type DotEnvSchema = z.infer<typeof dotEnvSchema>;

export function validateEnv(config: Record<string, unknown>): DotEnvSchema {
  return dotEnvSchema.parse(config);
}
