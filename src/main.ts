import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WebSocketGateway } from '@nestjs/websockets';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors:true});
  const logger = new Logger('bootstrap');
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  //? =========== Inicio Swagger ================
  const config = new DocumentBuilder()
    .setTitle('Teslo RESTFul API')
    .setDescription('Endpoints')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  //? =========== Fin Swagger ================
  //? =========== Inicio CORS ================
  app.enableCors();
  //? =========== Fin CORS ================
  await app.listen(process.env.PORT);
  logger.log(`App running on port ${process.env.PORT}`);
}
bootstrap();
