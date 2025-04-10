import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BancoProvider } from 'src/banco/banco.provider';
import { Usuario } from 'src/model';
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService:JwtService,
        private readonly banco: BancoProvider
    ){}

    logar(email:string, senha:string){
        if (!email || !senha){
            throw new BadRequestException("Dados estão inválidos")
        }

        const usuario : Usuario | undefined = this.banco.usuarios.find(u=>u.email == email)

        if (!usuario || !bcrypt.compareSync(senha, usuario.senha)){
            throw new BadRequestException("E-mail ou senha incorretos")
        }

        const token = this.jwtService.sign({email})

        return {token}
    }

    cadastrar(email:string, senha:string){
        if (!email || !senha){
            throw new BadRequestException("Dados estão inválidos")
        }

        const usuario : Usuario | undefined = this.banco.usuarios.find(u=>u.email == email)
        
        if (usuario){
            throw new HttpException("Usuário já cadastrado", HttpStatus.CONFLICT)
        }

        const novoUsuario = {email, senha: bcrypt.hashSync(senha, 5)}
        console.log(novoUsuario)
        this.banco.usuarios.push(novoUsuario)
        return {mensagem: `Usuário ${novoUsuario.email} foi cadastrado`}
    }
}
