import { createParamDecorator, SetMetadata, ExecutionContext } from '@nestjs/common';

export const Senha = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const senha = req.body.senha;
    return senha ?? "";
  },
);
