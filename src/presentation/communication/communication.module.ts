import { Module } from '@nestjs/common';
import { LangChainAgent } from 'src/infra/langchain/agent';

import { TwilioService } from 'src/infra/services/twilio/twilio.service';
import { CommunicationController } from 'src/presentation/communication/communication.controller';

@Module({
  imports: [],
  controllers: [CommunicationController],
  providers: [TwilioService, LangChainAgent],
})
export class CommunicationModule {}
