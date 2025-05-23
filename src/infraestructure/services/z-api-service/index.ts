import axios, { AxiosInstance, AxiosResponse } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.ZAPI_BASE_URL || 'https://api.z-api.io';
const INSTANCE_ID = process.env.ZAPI_INSTANCE_ID!;
const INSTANCE_TOKEN = process.env.ZAPI_TOKEN!;
const CLIENT_TOKEN = process.env.ZAPI_CLIENT_TOKEN!;
export class ZApiService {
  private readonly axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: `${BASE_URL}/instances/${INSTANCE_ID}/token/${INSTANCE_TOKEN}`,
      headers: {
        'Content-Type': 'application/json',
        'Client-Token':
          CLIENT_TOKEN,
      },
    });
  }

  // Instance routes
  public getStatusInstance(): Promise<AxiosResponse> {
    return this.axios.get('/status-instance');
  }

  public disconnectInstance(): Promise<AxiosResponse> {
    return this.axios.get('/disconnect');
  }

  public restartInstance(): Promise<AxiosResponse> {
    return this.axios.get('/restart');
  }

  public getQrCode(): Promise<AxiosResponse<{ qrCode: string }>> {
    return this.axios.get('/qrcode');
  }

  public updateProfileName(name: string): Promise<AxiosResponse> {
    return this.axios.post('/update-profile-name', { name });
  }

  public updateProfileDescription(description: string): Promise<AxiosResponse> {
    return this.axios.post('/update-profile-description', { description });
  }

  // Messages routes
  public sendText(phone: string, message: string, options?: { delayMessage?: number; delayTyping?: number; editMessageId?: string }): Promise<AxiosResponse> {
    return this.axios.post('/send-text', { phone, message, ...options });
  }

  public forwardMessage(chatId: string, messageId: string): Promise<AxiosResponse> {
    return this.axios.post('/forward-message', { chatId, messageId });
  }

  public sendReaction(chatId: string, messageId: string, reaction: string): Promise<AxiosResponse> {
    return this.axios.post('/send-reaction', { chatId, messageId, reaction });
  }

  public deleteReaction(chatId: string, messageId: string): Promise<AxiosResponse> {
    return this.axios.post('/delete-reaction', { chatId, messageId });
  }

  public sendImage(phone: string, imageUrl: string, caption?: string): Promise<AxiosResponse> {
    return this.axios.post('/send-image', { phone, url: imageUrl, caption });
  }

  public sendSticker(phone: string, stickerUrl: string): Promise<AxiosResponse> {
    return this.axios.post('/send-sticker', { phone, url: stickerUrl });
  }

  public sendGif(phone: string, gifUrl: string): Promise<AxiosResponse> {
    return this.axios.post('/send-gif', { phone, url: gifUrl });
  }

  public sendAudio(phone: string, audioUrl: string): Promise<AxiosResponse> {
    return this.axios.post('/send-audio', { phone, url: audioUrl });
  }

  public sendVideo(phone: string, videoUrl: string, caption?: string): Promise<AxiosResponse> {
    return this.axios.post('/send-video', { phone, url: videoUrl, caption });
  }

  public sendPTT(phone: string, audioUrl: string): Promise<AxiosResponse> {
    return this.axios.post('/send-ptt', { phone, url: audioUrl });
  }

  public sendDocument(phone: string, documentUrl: string, filename?: string): Promise<AxiosResponse> {
    return this.axios.post('/send-file', { phone, url: documentUrl, filename });
  }

  public sendLink(phone: string, link: string, title?: string, description?: string, thumbnail?: string): Promise<AxiosResponse> {
    return this.axios.post('/send-link', { phone, link, title, description, thumbnail });
  }

  public sendLocation(phone: string, latitude: number, longitude: number, name?: string, address?: string): Promise<AxiosResponse> {
    return this.axios.post('/send-location', { phone, latitude, longitude, name, address });
  }

  public sendContact(phone: string, contact: { name: string; phone: string }): Promise<AxiosResponse> {
    return this.axios.post('/send-contact', { phone, contact });
  }

  public sendListMessage(phone: string, list: any): Promise<AxiosResponse> {
    return this.axios.post('/send-list-message', { phone, ...list });
  }

  public deleteMessage(messageId: string): Promise<AxiosResponse> {
    return this.axios.post('/delete-message', { messageId });
  }

  // Add other methods following the same pattern as needed...
}
