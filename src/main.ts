import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FormatarErroFilter } from './filters/formatar-erro.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new FormatarErroFilter())
  app.useGlobalPipes(new ValidationPipe({whitelist:true}))
  await app.listen(process.env.PORTA ?? 3000);
}
bootstrap();
