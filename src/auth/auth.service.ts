import { BadRequestException, HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BancoProvider } from 'src/banco/banco.provider';
import { Usuario } from 'src/model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly banco: BancoProvider,
  ) {}
  logar(email: string, senha: string) {
    if (!email || !senha) {
      throw new BadRequestException('Dados incorretos');
    }
    const usuario: Usuario | undefined = this.banco.usuarios.find(
      (usuario) => usuario.email === email,
    );

    if (!usuario || !bcrypt.compareSync(senha, usuario.senha)) {
      throw new HttpException('usuário não cadastrado', HttpStatus.NOT_FOUND);
    }

    const token = this.jwtService.sign({ email });

    return { token };
  }

  cadastrar(email: string, senha: string) {
    if (!email || !senha) {
      throw new BadRequestException('Dados incorretos');
    }

    const usuario: Usuario | undefined = this.banco.usuarios.find(usuario => usuario.email === email);

    if (usuario) {
      throw new HttpException('usuário já cadastrado', HttpStatus.CONFLICT);
    }

    const novoUsuario = { email, senha: bcrypt.hashSync(senha, 5) };

    this.banco.usuarios.push(novoUsuario);

    return { message: `Usuário ${email} cadastrado com sucesso` };
  }
}
