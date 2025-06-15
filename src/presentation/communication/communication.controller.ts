import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { LangChainAgent } from 'src/infra/langchain/agent';

import { twilioAudioTranscriptionTool } from 'src/infra/langchain/tools/audio-transcription.tool';

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
    let message = '';

    if (!payload.Body && !!payload.MediaUrl0)
      message = await twilioAudioTranscriptionTool.invoke({
        url: payload.MediaUrl0,
      });
    else if (payload.Body) message = payload.Body!;
    else return;

    const response = await this.agent.run(payload.From, message);

    await this.twillio.sendText(payload.WaId, response);
    return { received: true };
  }
}
