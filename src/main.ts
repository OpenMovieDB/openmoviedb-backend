import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma';
import { ConfigService } from '@nestjs/config';
import { CorsConfig, NestConfig } from './common/configs/config.interface';
import { statusAppMessage } from './common/utils/status-app-message.util';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  const configService = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>('nest');
  const corsConfig = configService.get<CorsConfig>('cors');

  if (corsConfig.enabled) {
    app.enableCors();
  }

  const config = new DocumentBuilder().setTitle('OpenMovieDB rest api').addBearerAuth().setVersion('1').build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT || nestConfig.port || 3000);
  await statusAppMessage(app);
}
bootstrap();
