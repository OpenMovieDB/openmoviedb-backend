import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { statusAppMessage } from './common/utils/status-app-message.util';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  app.enableCors();

  await app.listen(process.env.PORT || 3000);
  await statusAppMessage(app);
}

bootstrap();
