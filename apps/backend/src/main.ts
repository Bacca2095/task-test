import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const configApp = async (app: INestApplication) => {
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );
};

const configSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Task api')
    .setDescription('CRUD operations for tasks')
    .setVersion('1.0')

    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
};

const bootstrap = async () => {
  const app: INestApplication = await NestFactory.create(AppModule);

  configApp(app);
  configSwagger(app);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: ${await app.getUrl()}`);
};

bootstrap().catch((err) => {
  Logger.error(`❌ Error starting server: ${err}`);
});
