import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { z } from 'zod';
import { CommunicationModule } from 'src/modules/communication/communication.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validate: (config: Record<string, unknown>) => {
        const envSchema = z.object({
          PORT: z.string().transform(Number).default('3000'),
          // OPENAI_API_KEY: z.string(),
          // ZAPI_BASE_URL: z.string().url().default('https://api.z-api.io'),
          // ZAPI_INSTANCE_ID: z.string(),
          // ZAPI_TOKEN: z.string(),
          // ZAPI_CLIENT_TOKEN: z.string(),
        });
        const parsed = envSchema.safeParse(config);
        if (!parsed.success) {
          console.error(parsed.error.format());
          throw new Error('Invalid environment variables');
        }
        return parsed.data;
      },
    }),
    CommunicationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
