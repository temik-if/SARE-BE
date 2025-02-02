import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  // Configuração básica do Swagger
  const config = new DocumentBuilder()
    .setTitle('Documentação API SARE')
    .setDescription('Neste espaço, você encontrará a descrição detalhada de todas as rotas da aplicação, incluindo informações sobre os endpoints disponíveis, métodos HTTP utilizados, parâmetros necessários, e as tabelas do banco de dados associadas a cada funcionalidade. Essa documentação servirá como uma referência completa para entender a estrutura e o funcionamento das APIs, facilitando o desenvolvimento e a integração.')
    .setVersion('1.0')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
  console.log(`API docs disponíveis em: http://localhost:3000/api-docs`);
}
bootstrap();
