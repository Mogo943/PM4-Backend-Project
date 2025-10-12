import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  )

  const swaggerDocument = new DocumentBuilder()
    .setTitle('API-Backend')
    .setDescription('This is an API for an ecommerce')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const documentModule = SwaggerModule.createDocument(app, swaggerDocument);

  SwaggerModule.setup('api-docs', app, documentModule);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
