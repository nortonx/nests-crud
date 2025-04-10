import { Injectable } from '@nestjs/common';
import { BancoProvider } from 'src/banco/banco.provider';
import { Ator } from '../model/ator';
import { Genero } from 'src/model';

@Injectable()
export class InfoService {
  constructor(private readonly banco: BancoProvider) {}

  pegarDiretores() {
    const dados = new Set(
      this.banco.filmes.map((filme) => {
        return JSON.stringify(filme.diretor);
      }),
    );
    const array = Array.from(dados).map((d) => JSON.parse(d));
    return array;
  }

  pegarAtores() {
    const dados = new Set(
      this.banco.filmes.flatMap((filme) => {
        return filme.elenco.map((a: Ator) => JSON.stringify(a));
      }),
    );
    const array = Array.from(dados).map((a) => JSON.parse(a));
    return array;
  }

  pegarGeneros() {
    const dados = new Set(
      this.banco.filmes.flatMap((filme) => {
        return filme.genero.map((g: Genero) => JSON.stringify(g));
      }),
    );
    const array = Array.from(dados).map((g) => JSON.parse(g));
    return array;
  }
}
