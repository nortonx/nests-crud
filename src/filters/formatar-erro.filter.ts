import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import e from 'express';

@Catch()
export class FormatarErroFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const isHttpError = exception instanceof HttpException;
    const req = host.switchToHttp().getRequest<e.Request>();
    const status = isHttpError
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const res: any = isHttpError && exception.getResponse();
    const resFinal = host.switchToHttp().getResponse();

    const payload = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: req.url,
      message:
        res.message ?? `Internal Server Error: ${HttpStatus.INTERNAL_SERVER_ERROR}`,
    };

    resFinal.status(status).json(payload);
  }
}
