import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { swaggerMessages } from 'src/constant/message.constant';
import { TOKEN_NAME } from 'src/constant/variable.constant';

const setupSwagger = function (app: NestFastifyApplication) {
  const config = new DocumentBuilder()
    .setTitle(swaggerMessages.TITLE)
    .setDescription(swaggerMessages.DESCRIPTION)
    .setVersion('v1')
    .setExternalDoc('Postman Collection', '/docs-json')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      TOKEN_NAME,
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
};

export default setupSwagger;
