/**
 * The entry file of the application which uses the core function
 * NestFactory to create a Nest application instance.
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as process from 'node:process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

config();

const swaggerConfig = new DocumentBuilder()
  .setTitle('Plavon API')
  .setDescription('The Plavon API description')
  .setVersion('1.0')
  .build();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  const logger = new Logger('Bootstrap');
  const BACKEND_PORT = process.env.BACKEND_PORT ?? 3000;

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document, {
    jsonDocumentUrl: 'swagger/json',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  try {
    await app.listen(BACKEND_PORT);
  } catch (error) {
    logger.error('Error starting server:', error);
    process.exit(1);
  }

  logger.log(`Server started on port ${BACKEND_PORT}`);
}

bootstrap();
