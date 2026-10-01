import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // instrument: ObserveInstrument,
  });

  console.log('Application is running on port 3000', process.env.APP_PORT);
  
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.APP_PORT ?? 3000);
}
await bootstrap();
