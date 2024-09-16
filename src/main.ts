import { LogLevel, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { art, isDebug } from './shared/helpers/server.helper';
import { TransformInterceptor } from './shared/interceptors/transform.interceptor';

async function bootstrap() {
  const logLevel: LogLevel[] = ['log', 'error', 'warn'];
  if (isDebug()) logLevel.push('debug');

  const app = await NestFactory.create(AppModule, {
    logger: logLevel,
  });

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: '*' });

  const PORT = 3002;
  await app.listen(PORT, '0.0.0.0', () => console.log(art(PORT)));
}
bootstrap();
