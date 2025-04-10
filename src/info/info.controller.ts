import { Controller, Get } from '@nestjs/common';
import { InfoService } from './info.service';

@Controller('info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Get('diretores')
  pergarDiretores() {
    return this.infoService.pegarDiretores();
  }

  @Get('atores')
  pegarAtores() {
    return this.infoService.pegarAtores();
  }

  @Get('generos')
  pegarGeneros() {
    return this.infoService.pegarGeneros();
  }
}
