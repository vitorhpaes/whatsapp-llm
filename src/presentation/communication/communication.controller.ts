import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { LangChainAgent } from 'src/infra/langchain/agent';

import { TwilioService } from 'src/infra/services/twilio/twilio.service';
import { TwillioIncomingMessageDto } from 'src/presentation/communication/dto/incoming-message.dto';

@Controller('/communication')
export class CommunicationController {
  constructor(
    private readonly agent: LangChainAgent,
    private readonly twillio: TwilioService,
  ) {}

  @Post('twilio-webhook')
  @HttpCode(200)
  async handleTwillioIncomingMessage(
    @Body() payload: TwillioIncomingMessageDto,
  ) {
    console.log('Webhook Twillio - mensagem recebida:', payload);

    if (!payload.Body) return;

    const response = await this.agent.run(payload.From, payload.Body);

    await this.twillio.sendText(payload.WaId, response);
    return { received: true };
  }
}
