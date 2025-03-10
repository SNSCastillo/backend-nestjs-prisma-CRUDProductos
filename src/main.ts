import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Para usar la documentación de Swagger
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')

  // Antes que se inicie el server se pone la configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Tienda de productos')
    .setDescription('Este proyecto es para pruebas')
    .setVersion('1.0')
    .addTag('Tienda de productos')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  // Configuración de CORS
  // Esto acepta cualquier dominio el backend
  app.enableCors();

  await app.listen(process.env.PORT ?? 4000); // porque el 3000 va a ser del front
}
bootstrap();
