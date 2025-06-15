import { Injectable, Inject, Logger } from '@nestjs/common';
import { TWILIO_CLIENT } from './twilio.providers';
import type { Twilio } from 'twilio';

@Injectable()
export default class TwilioMessagingService {
  private readonly logger = new Logger(TwilioMessagingService.name);

  constructor(@Inject(TWILIO_CLIENT) private readonly client: Twilio) {}

  async sendMessage(
    from: string,
    to: string,
    body: string,
    mediaUrl?: string[],
    channel: 'whatsapp' | 'sms' = 'whatsapp',
  ) {
    try {
      const result = await this.client.messages.create({
        from: `${channel}:${from}`,
        to: `${channel}:${to}`,
        body,
        mediaUrl,
      });
      return result;
    } catch (error) {
      this.logger.error('Error sending message', error as any);
      throw error;
    }
  }

  async sendTemplate(
    from: string,
    to: string,
    templateName: string,
    templateParams: Record<string, unknown>,
  ) {
    try {
      const result = await this.client.messages.create({
        from: `whatsapp:${from}`,
        to: `whatsapp:${to}`,
        contentSid: templateName,
        contentVariables: JSON.stringify(templateParams),
      });
      return result;
    } catch (error) {
      this.logger.error('Error sending template', error as any);
      throw error;
    }
  }

  async scheduleMessage(
    scheduleTime: Date,
    from: string,
    to: string,
    body: string,
    channel: 'whatsapp' | 'sms' = 'whatsapp',
  ) {
    return this.client.messages.create({
      from: `${channel}:${from}`,
      to: `${channel}:${to}`,
      body,
      sendAt: scheduleTime,
      scheduleType: 'fixed',
    });
  }

  async fetchMessage(messageSid: string) {
    return this.client.messages(messageSid).fetch();
  }

  async cancelScheduledMessage(messageSid: string) {
    return this.client.messages(messageSid).update({
      status: 'canceled',
    });
  }
}
