import { Injectable, Inject } from '@nestjs/common';
import type { Twilio } from 'twilio';
import { TWILIO_CLIENT } from './twilio.providers';

@Injectable()
export default class TwilioConversationsService {
  constructor(@Inject(TWILIO_CLIENT) private readonly client: Twilio) {}

  /**
   * Cria uma nova conversa com nome amigável.
   * @param friendlyName Nome descritivo da conversa
   */
  async createConversation(friendlyName: string) {
    return this.client.conversations.v1.conversations.create({ friendlyName });
  }

  /**
   * Adiciona um participante WhatsApp a uma conversa existente.
   * @param conversationSid SID da conversa
   * @param address Número de destino (ex: 'whatsapp:+5511999887766')
   * @param proxyAddress Número do remetente (seu WhatsApp Business)
   */
  async addWhatsappParticipant(
    conversationSid: string,
    address: string,
    proxyAddress: string,
  ) {
    return this.client.conversations.v1
      .conversations(conversationSid)
      .participants.create({
        'messagingBinding.address': address,
        'messagingBinding.proxyAddress': proxyAddress,
      });
  }

  /**
   * Envia uma mensagem de texto no contexto de uma conversa.
   * @param conversationSid SID da conversa
   * @param body Conteúdo da mensagem
   * @param author Identificador do autor da mensagem (opcional)
   */
  async sendMessage(conversationSid: string, body: string, author?: string) {
    return this.client.conversations.v1
      .conversations(conversationSid)
      .messages.create({ body, author });
  }

  /**
   * Lista participantes de uma conversa.
   * @param conversationSid SID da conversa
   */
  async listParticipants(conversationSid: string) {
    return this.client.conversations.v1
      .conversations(conversationSid)
      .participants.list();
  }

  /**
   * Lista mensagens de uma conversa.
   * @param conversationSid SID da conversa
   */
  async listMessages(conversationSid: string) {
    return this.client.conversations.v1
      .conversations(conversationSid)
      .messages.list({ limit: 50 });
  }

  /**
   * Remove um participante de uma conversa.
   * @param conversationSid SID da conversa
   * @param participantSid SID do participante
   */
  async removeParticipant(conversationSid: string, participantSid: string) {
    return this.client.conversations.v1
      .conversations(conversationSid)
      .participants(participantSid)
      .remove();
  }
}
