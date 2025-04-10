import { Module } from '@nestjs/common';
import { InfoController } from './info.controller';
import { InfoService } from './info.service';
import { BancoProvider } from 'src/banco/banco.provider';

@Module({
  controllers: [InfoController],
  providers: [InfoService, BancoProvider],
})
export class InfoModule {}
