import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Twilio from 'twilio';

/**
 * Serviço para integrar com Twilio WhatsApp via SDK oficial.
 */
@Injectable()
export class TwilioService {
  private readonly client: Twilio.Twilio;
  private readonly from: string;
  private readonly logger = new Logger(TwilioService.name);

  constructor(private readonly config: ConfigService) {
    const accountSid = this.config.get<string>('TWILIO_ACCOUNT_SID');
    const authToken = this.config.get<string>('TWILIO_AUTH_TOKEN');
    const whatsappNumber = this.config.get<string>('TWILIO_WHATSAPP_NUMBER');

    if (!accountSid || !authToken || !whatsappNumber) {
      this.logger.error(
        'TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN e TWILIO_WHATSAPP_NUMBER não configurados.',
      );
      throw new Error(
        'É necessário definir as variáveis de ambiente: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_NUMBER',
      );
    }

    // o SDK retorna any, fazemos cast para manter tipagem forte
    this.client = Twilio(accountSid, authToken);
    this.from = `whatsapp:${whatsappNumber}`;
  }

  /**
   * Envia mensagem de texto via WhatsApp.
   */
  async sendText(to: string, body: string, statusCallback?: string) {
    return this.client.messages.create({
      from: this.from,
      to: `whatsapp:${to}`,
      body,
      ...(statusCallback ? { statusCallback } : {}),
    });
  }

  /**
   * Envia mídia (imagens, áudio, vídeo) via WhatsApp.
   */
  async sendMedia(to: string, mediaUrls: string[], body?: string) {
    return this.client.messages.create({
      from: this.from,
      to: `whatsapp:${to}`,
      ...(body ? { body } : {}),
      mediaUrl: mediaUrls,
    });
  }

  /**
   * Envia localização via WhatsApp.
   */
  async sendLocation(
    to: string,
    latitude: number,
    longitude: number,
    label?: string,
    body?: string,
  ) {
    const persistentAction = label
      ? [`geo:${latitude},${longitude}|${label}`]
      : [`geo:${latitude},${longitude}`];

    return this.client.messages.create({
      from: this.from,
      to: `whatsapp:${to}`,
      ...(body ? { body } : {}),
      persistentAction,
    });
  }

  /**
   * Recupera detalhes de uma mensagem.
   */
  async getMessageDetails(messageSid: string) {
    return this.client.messages(messageSid).fetch();
  }

  /**
   * Lista mensagens para o número configurado.
   */
  async listMessages(
    pageSize = 50,
    dateSentAfter?: Date,
    dateSentBefore?: Date,
  ) {
    const opts = {
      from: this.from,
      limit: pageSize,
      ...(dateSentAfter ? { dateSentAfter } : {}),
      ...(dateSentBefore ? { dateSentBefore } : {}),
    };
    return this.client.messages.list(opts);
  }
}
