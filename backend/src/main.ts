/**
 * The entry file of the application which uses the core function
 * NestFactory to create a Nest application instance.
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const BACKEND_PORT = process.env.BACKEND_PORT ?? 3000;
  await app.listen(BACKEND_PORT);
}
bootstrap();
