import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class PrimeiroMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log("Passei por aqui")
    next();
  }
}
