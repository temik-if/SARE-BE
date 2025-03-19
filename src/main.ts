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
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.getHttpAdapter().get('/', (_req, res) => {
    res.redirect('/api-docs');
  });

  const port = process.env.SERVER_PORT || 3000;
  await app.listen(port);
  console.log(`API docs disponíveis em: http://localhost:${port}/api-docs`);
}

bootstrap();