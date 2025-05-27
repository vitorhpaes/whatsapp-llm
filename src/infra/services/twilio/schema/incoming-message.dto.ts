import { z } from 'zod';

export const TwilioIncomingMessageSchema = z.object({
  // Identificadores
  AccountSid: z.string().describe('SID da conta Twilio'),
  ApiVersion: z.string().describe('Versão da API usada'),
  SmsMessageSid: z.string().describe('ID único da mensagem SMS'),
  SmsSid: z.string().describe('ID do SMS'),
  MessageSid: z.string().describe('ID da mensagem (MMS/WhatsApp)'),

  // Status da mensagem (inclui read-only no WhatsApp)
  SmsStatus: z
    .enum([
      'accepted',
      'scheduled',
      'canceled',
      'queued',
      'sending',
      'sent',
      'failed',
      'delivered',
      'undelivered',
      'receiving',
      'received',
      'read',
    ])
    .describe('Status da mensagem'),

  // Endereços WhatsApp em formato E.164
  From: z
    .string()
    .regex(/^whatsapp:\+\d{10,15}$/)
    .describe('Remetente (whatsapp:+[país][número])'),
  To: z
    .string()
    .regex(/^whatsapp:\+\d{10,15}$/)
    .describe('Destinatário (whatsapp:+[país][número])'),

  // Dados do contato
  WaId: z.string().regex(/^\d+$/).describe('WhatsApp ID do remetente'),
  ProfileName: z.string().optional().describe('Nome de perfil do remetente'),

  // Conteúdo e segmentos
  Body: z.string().optional().describe('Texto da mensagem'),
  NumMedia: z.coerce
    .number()
    .int()
    .nonnegative()
    .describe('Quantidade de mídias anexadas'),
  NumSegments: z.coerce
    .number()
    .int()
    .nonnegative()
    .describe('Número de segmentos da mensagem'),

  // Parâmetros de referral (Click-to-WhatsApp)
  ReferralNumMedia: z.coerce
    .number()
    .int()
    .nonnegative()
    .optional()
    .describe('Mídias no referral'),
  ReferralSourceId: z.string().optional().describe('ID da campanha'),
  ReferralSourceType: z.string().optional().describe('Tipo da fonte'),
  ReferralSourceUrl: z.string().url().optional().describe('URL de referência'),
  ReferralBody: z.string().optional().describe('Texto do anúncio'),
  ReferralHeadline: z.string().optional().describe('Título do anúncio'),

  // Localização (mensagens de localização)
  Latitude: z.coerce.number().optional().describe('Latitude enviada'),
  Longitude: z.coerce.number().optional().describe('Longitude enviada'),
  Address: z.string().optional().describe('Endereço completo'),
  Label: z.string().optional().describe('Rótulo do local'),

  // Encaminhamento
  Forwarded: z.coerce.boolean().optional().describe('true se foi encaminhada'),
  FrequentlyForwarded: z.coerce
    .boolean()
    .optional()
    .describe('true se muito encaminhada'),

  // Tipo de mensagem e botão (quick reply)
  MessageType: z
    .enum(['text', 'image', 'audio', 'video', 'location', 'button'])
    .optional()
    .describe('Tipo da mensagem'),
  ButtonText: z.string().optional().describe('Texto do botão'),

  // Primeiro arquivo de mídia (pode se estender para múltiplos índices)
  MediaContentType0: z.string().optional().describe('Tipo MIME da mídia'),
  MediaUrl0: z.string().url().optional().describe('URL da mídia'),
});
