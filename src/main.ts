import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  
  const config = new DocumentBuilder()
    .setTitle('Tienda de productos')
    .setDescription('Este proyecto es para pruebas')
    .setVersion('1.0')
    .addTag('Tienda de productos')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.enableCors();

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
