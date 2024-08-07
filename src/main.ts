import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const APP_HOSTNAME = 'localhost';
  const HTTP_PORT = 3000;

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Snow Pet API')
    .setDescription('An API for accessing the Snow Pet Database...')
    .setVersion('0.2.1')
    .addTag('Módulos')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(HTTP_PORT, () => {
    const address = 'http' + '://' + APP_HOSTNAME + ':' + HTTP_PORT + '/';
    Logger.log('Listening at ' + address);
    Logger.log('Access the API documentation at ' + address + 'api');
  });
}
bootstrap();
