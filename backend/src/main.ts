import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { FRONTEND_ORIGIN } from './constants/app.constants';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));
  const port = process.env.PORT ?? 3333
  await app.listen(port);
  console.log("Server is running on port:", port);
  const configService=app.get(ConfigService);
  app.enableCors({
    origin: configService.get<string>('FRONTEND_ORIGIN'),
    credentials:true,
  })
}
bootstrap();
