import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './presentation/app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestJsSwagger } from 'nestjs-zod';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Whatsapp LLM connection')
    .setDescription(
      'The api that connects to Whatsapp and uses LLMs with LangChain agents',
    )
    .setVersion('1.0')
    .build();

  patchNestJsSwagger();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
