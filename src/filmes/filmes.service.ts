import { HttpException, Injectable, HttpStatus, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { BancoProvider } from 'src/banco/banco.provider';
import { Filme } from '../model/filme';

@Injectable()
export class FilmesService {
  constructor(private banco: BancoProvider) {}

  private limparCampos(filme: Filme, ignorar: string | undefined) {
    const camposPraIgnorar = ignorar ? ignorar.split(',') : [];
    const copia = { ...filme };
    camposPraIgnorar.forEach((campo: string) => {
      delete copia[campo as keyof Filme];
    });
    return copia;
  }

  create(createFilmeDto: CreateFilmeDto, emailUsuario: string) {
    if (
      !(
        createFilmeDto.titulo &&
        createFilmeDto.diretor &&
        createFilmeDto.elenco &&
        createFilmeDto.sinopse
      )
    ) {
      throw new BadRequestException('Dados inválidos');
    }

    const aleatorio = (Math.random() * 100) | 0;
    const filme = { 
      ...createFilmeDto,
      id: `FIL${aleatorio}`,
      criadoPor: emailUsuario,
    };

    this.banco.filmes.push(filme);
    return filme;
  }

  findAll(ignorar: string) {
    return this.banco.filmes.map((f: Filme) => {
      return this.limparCampos(f, ignorar);
    });
  }

  findOne(id: string, ignorar: string) {
    const filme = this.banco.filmes.find((filme) => filme.id === id);
    if (!filme) {
      throw new NotFoundException('Filme não encontrado');
      // throw new HttpException('Filme não encontrado', HttpStatus.NOT_FOUND);
    }
    return this.limparCampos(filme, ignorar);
    // return filme;
  }

  update(id: string, updateFilmeDto: UpdateFilmeDto) {
    const indice = this.banco.filmes.findIndex((f: Filme) => f.id === id);
    if (indice !== -1) {
      throw new NotFoundException('Filme não encontrado');
    }

    const filmeAtualizado = { ...this.banco.filmes[indice], ...updateFilmeDto };
    this.banco.filmes[indice] = filmeAtualizado;
    return filmeAtualizado;
  }

  remove(id: string) {
    const indice = this.banco.filmes.findIndex((f: Filme) => f.id === id);
    console.log(indice);
    if (indice === -1) {
      console.log("entrou aqui, índice:", indice);
      throw new NotFoundException('Filme não encontrado');
    }
    const filmeRemovido = this.banco.filmes.splice(indice, 1);
    return filmeRemovido;
  }
}
