import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('API MS Users')
    .setDescription('Microservice to generae the orders from any user')
    .setVersion('1.0')
    .build();

  app.enableCors({
    origin: ['http://localhost:4200'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/users/doc', app, document);

  console.log('runing in port ' + process.env.PORT || 3000);
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
