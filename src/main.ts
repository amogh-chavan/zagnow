import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './module/app.module';
import setupSwagger from './config/swagger.config';
import { envConfigService } from './config/env.config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(), //using fastify instead of express because it is 2x in speed
  );
  app.enableCors({ origin: '*', allowedHeaders: '*', methods: '*' });

  setupSwagger(app);
  const port = envConfigService.get('PORT');
  await app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
  });
}
bootstrap();
