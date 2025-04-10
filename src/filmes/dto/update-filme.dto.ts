import { PartialType } from '@nestjs/mapped-types';
import { CreateFilmeDto } from './create-filme.dto';
import { Genero, Diretor, Ator } from 'src/model';

export class UpdateFilmeDto extends PartialType(CreateFilmeDto) {
  titulo: string;
  ano: number;
  genero: Genero[];
  diretor: Diretor;
  elenco: Ator[];
  sinopse: string;
}
