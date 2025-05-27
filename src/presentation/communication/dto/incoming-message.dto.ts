import { createZodDto, zodToOpenAPI } from 'nestjs-zod';
import { TwilioIncomingMessageSchema } from 'src/infra/services/twilio/schema/incoming-message.dto';

export class TwillioIncomingMessageDto extends createZodDto(
  TwilioIncomingMessageSchema,
) {}

zodToOpenAPI(TwilioIncomingMessageSchema);
