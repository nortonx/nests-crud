import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfoModule } from './info/info.module';
import { BancoProvider } from './banco/banco.provider';
import { FilmesModule } from './filmes/filmes.module';
// import { PrimeiroMiddleware } from './middlewares/primeiro.middleware';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [InfoModule, FilmesModule, ConfigModule.forRoot({ isGlobal: true }), AuthModule],
  controllers: [AppController],
  providers: [AppService, BancoProvider],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(PrimeiroMiddleware).forRoutes({
  //     path: '*',
  //     method: RequestMethod.ALL,
  //   });
  // }
}
