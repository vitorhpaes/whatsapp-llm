import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { LangChainAgent } from 'src/infra/langchain';
import ZApiService from 'src/infra/services/z-api-service';
import { IncomingMessageDto } from 'src/modules/communication/dto/incoming-message.dto';

@Controller('/communication')
export class CommunicationController {
  constructor(
    private readonly zapi: ZApiService,
    private readonly agent: LangChainAgent,
  ) {}

  @Post('webhook')
  @HttpCode(200)
  async handleIncomingMessage(@Body() payload: IncomingMessageDto) {
    console.log('Webhook Z-API - mensagem recebida:', payload);

    // if (payload.phone !== '') return { received: true };

    const response = await this.agent.run(
      payload.phone,
      payload?.text?.message ?? '',
    );

    // await this.zapi.sendText(payload.phone, response);

    return { received: response };
  }
}
