import { Module } from '@nestjs/common';
import { LangChainAgent } from 'src/infra/langchain';
import ZApiService from 'src/infra/services/z-api-service';

import { CommunicationController } from 'src/modules/communication/communication.controller';
import { CommunicationService } from 'src/modules/communication/communication.service';

@Module({
  imports: [],
  controllers: [CommunicationController],
  providers: [CommunicationService, ZApiService, LangChainAgent],
})
export class CommunicationModule {}
