import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true, // 사용하지 않는 데코레이터는 삭제하고 쿼리를 날림.
      forbidNonWhitelisted: true, // 사용하지 않는 데코레이터가 쿼리에서 필터링 되면 에러를 던짐.
    }),
  );

  await app.listen(3000);
}
bootstrap();
