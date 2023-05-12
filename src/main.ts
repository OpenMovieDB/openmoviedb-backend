import { ClassSerializerInterceptor, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { setupFastify } from './fastify';
import { statusAppMessage } from './common/utils/status-app-message.util';

async function bootstrap() {
  const { PORT } = process.env;

  const adapter = setupFastify();

  const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      adapter,
      {
        bufferLogs: true,
      },
  );

  app.enableCors({ origin: '*' });

  app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));


  await app.listen(PORT || 3000, '0.0.0.0');

  await statusAppMessage(app);
}

bootstrap();
