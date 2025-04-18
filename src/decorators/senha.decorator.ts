import { SetMetadata } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';

export const Senha = createParamDecorator(
    (data:string, ctx:ExecutionContext)=>{
        const req = ctx.switchToHttp().getRequest()
        const senha = req.body?.senha
        return senha ?? ""
    }
)
