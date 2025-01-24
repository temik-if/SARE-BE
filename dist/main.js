"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Documentação API SARE')
        .setDescription('Neste espaço, você encontrará a descrição detalhada de todas as rotas da aplicação, incluindo informações sobre os endpoints disponíveis, métodos HTTP utilizados, parâmetros necessários, e as tabelas do banco de dados associadas a cada funcionalidade. Essa documentação servirá como uma referência completa para entender a estrutura e o funcionamento das APIs, facilitando o desenvolvimento e a integração.')
        .setVersion('1.0')
        .addTag('users')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api-docs', app, document);
    await app.listen(3000);
    console.log(`API docs disponíveis em: http://localhost:3000/api-docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map