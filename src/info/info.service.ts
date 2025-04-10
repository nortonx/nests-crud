import { Injectable } from '@nestjs/common';
import { BancoProvider } from 'src/banco/banco.provider';
import { Ator, Filme, Genero } from 'src/model';

@Injectable()
export class InfoService {

    constructor(private readonly banco: BancoProvider){}

    pegarDiretores(){
        const dados = new Set(
            this.banco.filmes.map((filme:Filme)=>{
                return JSON.stringify(filme.diretor)
            })
        )
        const arr = Array.from(dados).map(d=>JSON.parse(d as string))
        return arr
    }

    pegarAtores(){
        const dados = new Set(
            this.banco.filmes.flatMap((filme:Filme)=>{
                return filme.elenco.map((a:Ator)=>JSON.stringify(a))
            })
        )
        const arr = Array.from(dados).map(a=>JSON.parse(a as string))
        return arr
    }

    pegarGeneros(){
        const dados = new Set(
            this.banco.filmes.flatMap((filme:Filme)=>{
                return filme.elenco.map((g:Genero)=>JSON.stringify(g))
            })
        )
        const arr = Array.from(dados).map(g=>JSON.parse(g as string))
        return arr
    }
}
