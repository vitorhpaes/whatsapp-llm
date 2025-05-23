// src/zapi/dto/incoming-message.dto.ts

import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsString,
  IsNumber,
  IsOptional,
  ValidateNested,
  IsArray,
} from 'class-validator';

export class ReferencedMessageDto {
  @IsString()
  messageId: string;

  @IsBoolean()
  fromMe: boolean;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  participant?: string | null;
}

export class ReactionDto {
  @IsString()
  value: string;

  @IsNumber()
  time: number;

  @IsString()
  reactionBy: string;

  @ValidateNested()
  @Type(() => ReferencedMessageDto)
  referencedMessage: ReferencedMessageDto;
}

export class ContactDto {
  @IsString()
  displayName: string;

  @IsString()
  vCard: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  phones?: string[];
}

export class TextDto {
  @IsString()
  message: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsString()
  thumbnailUrl?: string;
}

export class ImageDto {
  @IsString()
  mimeType: string;

  @IsString()
  imageUrl: string;

  @IsString()
  thumbnailUrl: string;

  @IsOptional()
  @IsString()
  caption?: string;

  @IsOptional()
  @IsNumber()
  width?: number;

  @IsOptional()
  @IsNumber()
  height?: number;

  @IsOptional()
  @IsBoolean()
  viewOnce?: boolean;
}

export class AudioDto {
  @IsString()
  mimeType: string;

  @IsString()
  audioUrl: string;

  @IsOptional()
  @IsBoolean()
  ptt?: boolean;

  @IsOptional()
  @IsNumber()
  seconds?: number;

  @IsOptional()
  @IsBoolean()
  viewOnce?: boolean;
}

export class VideoDto {
  @IsString()
  mimeType: string;

  @IsString()
  videoUrl: string;

  @IsOptional()
  @IsString()
  caption?: string;

  @IsOptional()
  @IsNumber()
  seconds?: number;

  @IsOptional()
  @IsBoolean()
  viewOnce?: boolean;

  @IsOptional()
  @IsNumber()
  width?: number;

  @IsOptional()
  @IsNumber()
  height?: number;
}

export class LocationDto {
  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsString()
  thumbnailUrl?: string;
}

export class IncomingMessageDto {
  // Atributos principais
  @IsBoolean()
  isStatusReply: boolean;

  @IsString()
  senderLid: string;

  @IsString()
  connectedPhone: string;

  @IsBoolean()
  waitingMessage: boolean;

  @IsBoolean()
  isEdit: boolean;

  @IsBoolean()
  isGroup: boolean;

  @IsBoolean()
  isNewsletter: boolean;

  @IsString()
  phone: string;

  @IsBoolean()
  fromMe: boolean;

  @IsOptional()
  @IsString()
  participantPhone?: string | null;

  @IsOptional()
  @IsString()
  participantLid?: string | null;

  @IsString()
  messageId: string;

  @IsString()
  status: 'PENDING' | 'SENT' | 'RECEIVED' | 'READ' | 'PLAYED';

  @IsOptional()
  @IsString()
  referenceMessageId?: string;

  @IsNumber()
  momment: number;

  @IsOptional()
  @IsNumber()
  messageExpirationSeconds?: number;

  @IsOptional()
  @IsString()
  requestMethod?: string;

  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  photo?: string;

  @IsBoolean()
  broadcast: boolean;

  @IsOptional()
  @IsBoolean()
  forwarded?: boolean;

  @IsString()
  instanceId: string;

  // Metadados adicionais
  @IsOptional()
  @IsString()
  chatName?: string;

  @IsOptional()
  @IsString()
  chatLid?: string;

  @IsOptional()
  @IsString()
  senderName?: string;

  @IsOptional()
  @IsString()
  senderPhoto?: string;

  @IsOptional()
  @IsNumber()
  expiresAt?: number | null;

  @IsOptional()
  externalAdReply?: any;

  @IsOptional()
  @IsBoolean()
  fromApi?: boolean;

  @IsOptional()
  @IsString()
  callId?: string | null;

  @IsOptional()
  @IsString()
  code?: string | null;

  @IsOptional()
  @IsString()
  notification?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  notificationParameters?: string[];

  // Payloads de mensagem
  @IsOptional()
  @ValidateNested()
  @Type(() => TextDto)
  text?: TextDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ImageDto)
  image?: ImageDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => AudioDto)
  audio?: AudioDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => VideoDto)
  video?: VideoDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ContactDto)
  contact?: ContactDto;

  @IsOptional()
  document?: any;

  @IsOptional()
  @ValidateNested()
  @Type(() => LocationDto)
  location?: LocationDto;

  @IsOptional()
  sticker?: any;

  @IsOptional()
  @ValidateNested()
  @Type(() => ReactionDto)
  reaction?: ReactionDto;

  @IsOptional()
  buttonsResponseMessage?: any;

  @IsOptional()
  listResponseMessage?: any;

  @IsOptional()
  hydratedTemplate?: any;

  @IsOptional()
  pixKeyMessage?: any;

  @IsOptional()
  carouselMessage?: any;

  @IsOptional()
  poll?: any;

  @IsOptional()
  pollVote?: any;

  @IsOptional()
  requestPayment?: any;

  @IsOptional()
  reviewAndPay?: any;

  @IsOptional()
  reviewOrder?: any;

  @IsOptional()
  order?: any;

  @IsOptional()
  cart?: any;

  @IsOptional()
  newsletterAdminInvite?: any;

  @IsOptional()
  pinMessage?: any;

  @IsOptional()
  event?: any;

  @IsOptional()
  eventResponse?: any;

  @IsOptional()
  sendPayment?: any;

  @IsOptional()
  product?: any;
}
