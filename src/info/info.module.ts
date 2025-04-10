import { Module } from '@nestjs/common';
import { InfoController } from './info.controller';
import { InfoService } from './info.service';
import { BancoProvider } from 'src/banco/banco.provider';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [InfoController],
  providers: [InfoService, BancoProvider, JwtService],
})
export class InfoModule {}
