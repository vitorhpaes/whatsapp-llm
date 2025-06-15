// src/twilio/twilio.providers.ts
import { ConfigService } from '@nestjs/config';
import { Provider } from '@nestjs/common';
import twilio from 'twilio';

export const TWILIO_CLIENT = 'TWILIO_CLIENT';

export const twilioClientProvider: Provider = {
  provide: TWILIO_CLIENT,
  useFactory: (config: ConfigService) => {
    const sid = config.get<string>('TWILIO_ACCOUNT_SID');
    const token = config.get<string>('TWILIO_AUTH_TOKEN');
    return twilio(sid, token);
  },
  inject: [ConfigService],
};
