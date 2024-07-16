/**
 * The entry file of the application which uses the core function
 * NestFactory to create a Nest application instance.
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import * as fs from 'node:fs';

config();

const httpsOptions = {
  key: fs.readFileSync('./secrets/cert.key'),
  cert: fs.readFileSync('./secrets/cert.crt'),
};
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });
  const BACKEND_PORT = process.env.BACKEND_PORT ?? 3000;
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(BACKEND_PORT);
}
bootstrap();
