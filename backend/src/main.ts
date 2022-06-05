import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const corsOptions = {
    origin: ['*'],
    optionsSuccessStatus: 200,
  };
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  app.enableCors(corsOptions);
}
bootstrap();
