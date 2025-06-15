// src/twilio/twilio.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { twilioClientProvider } from './twilio.providers';
import TwilioVerifyService from './twilio-verify.service';
import TwilioMessagingService from './twilio-messaging.service';
// import TwilioConversationsService from './twilio-conversations.service';

@Module({
  imports: [ConfigModule],
  providers: [
    twilioClientProvider,
    TwilioVerifyService,
    TwilioMessagingService,
    // TwilioConversationsService,
  ],
  exports: [
    TwilioVerifyService,
    TwilioMessagingService,
    // TwilioConversationsService,
  ],
})
export class TwilioModule {}
