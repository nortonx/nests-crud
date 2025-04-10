import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfoModule } from './info/info.module';
import { BancoProvider } from './banco/banco.provider';
import { FilmesModule } from './filmes/filmes.module';

@Module({
  imports: [InfoModule, FilmesModule],
  controllers: [AppController],
  providers: [AppService, BancoProvider],
})
export class AppModule {}
