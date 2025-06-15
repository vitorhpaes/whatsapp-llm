// src/twilio/twilio-verify.service.ts
import { Injectable, Inject } from '@nestjs/common';

import type { Twilio } from 'twilio';
import { TWILIO_CLIENT } from './twilio.providers';

@Injectable()
export default class TwilioVerifyService {
  private serviceSid?: string;

  constructor(@Inject(TWILIO_CLIENT) private readonly client: Twilio) {}

  async createVerifyService(name = 'Default verification service') {
    const svc = await this.client.verify.v2.services.create({
      friendlyName: name,
    });
    this.serviceSid = svc.sid;
  }

  async createVerification(
    phone: string,
    channel: 'sms' | 'whatsapp' = 'whatsapp',
  ) {
    if (!this.serviceSid)
      throw new Error('Crie primeiro o verification service');
    return this.client.verify.v2
      .services(this.serviceSid)
      .verifications.create({ to: phone, channel });
  }

  async verificationCheck(phone: string, code: string) {
    if (!this.serviceSid) throw new Error('Serviço não inicializado');
    const chk = await this.client.verify.v2
      .services(this.serviceSid)
      .verificationChecks.create({ to: phone, code });
    return chk.status as 'approved' | 'pending';
  }
}
