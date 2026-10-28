import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // instrument: ObserveInstrument,

  });

    // serve static assets from the 'upload' folder
  app.useStaticAssets(join(process.cwd(), 'upload'), {
    prefix: '/upload/', // Serve files under the /upload path
  });

  console.log('Application is running on port 3001', process.env.APP_PORT);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.APP_PORT ?? 3001);
}
await bootstrap();
