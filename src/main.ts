import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FormatarErroFilter } from './filters/formatar-erro.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new FormatarErroFilter());
  console.log(`port is: ${process.env.PORT}`);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
