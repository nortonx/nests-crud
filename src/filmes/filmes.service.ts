import { HttpException, Injectable, HttpStatus, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { BancoProvider } from 'src/banco/banco.provider';
import { Filme } from 'src/model';

@Injectable()
export class FilmesService {
  constructor(private banco:BancoProvider){}

  private limparCampos(filme:Filme, ignorar:string| undefined){
    const camposPraIgnorar = ignorar ? ignorar.split(",") : []
    const copia = {...filme}
    camposPraIgnorar.forEach((campo:string)=>{
      delete copia[campo as keyof Filme]
    })
    return copia
  }

  create(filmeDto: CreateFilmeDto, emailUsuario:string) {
    // if(!(
    //   filmeDto.ano && filmeDto.diretor && filmeDto.elenco
    //   && filmeDto.genero && filmeDto.sinopse && filmeDto.titulo
    // )){
    //   throw new BadRequestException("Informações inválidas")
    // }

    const aleatorio = (Math.random() * 100) | 0
    const filme = {...filmeDto, id: `FIL${aleatorio}`, criadoPor:emailUsuario}
    this.banco.filmes.push(filme)
    return filme
    
  }

  findAll(ignorar:string) {
    return this.banco.filmes.map((f:Filme)=>{
      return this.limparCampos(f, ignorar)
    })
  }

  findOne(id: string, ignorar:string) {
    const filme = this.banco.filmes.find((f:Filme)=> f.id === id)
    if(!filme){
      throw new NotFoundException("Não encontrado")
      // throw new HttpException("Não encontrado", HttpStatus.NOT_FOUND)
    }
    return this.limparCampos(filme, ignorar)
  }

  update(id: string, filmeDto: UpdateFilmeDto, usuario:string) {
    const indice = this.banco.filmes.findIndex((f:Filme)=>f.id === id)
    if (indice === -1){
      throw new NotFoundException("Filme não foi encontrado")
    }
    if (usuario !== this.banco.filmes[indice].criadoPor){
      throw new ForbiddenException()
    }
    const filmeAtualizado = {...this.banco.filmes[indice], ...filmeDto}
    this.banco.filmes[indice] = filmeAtualizado
    return filmeAtualizado
  }

  remove(id: string, usuario:string) {
    const indice = this.banco.filmes.findIndex((f:Filme)=>f.id === id)
    if (indice === -1){
      throw new NotFoundException("Filme não foi encontrado")
    }
    if (usuario !== this.banco.filmes[indice].criadoPor){
      throw new ForbiddenException()
    }
    const filmeRemovido = this.banco.filmes.splice(indice, 1)
    return filmeRemovido
  }
}
