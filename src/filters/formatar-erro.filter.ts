import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class FormatarErroFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ehErroHTTP = exception instanceof HttpException
    const req = host.switchToHttp().getRequest()
    const resFinal = host.switchToHttp().getResponse()
    const status = ehErroHTTP ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
    const res:any = ehErroHTTP && exception.getResponse()

    const payload = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path:req.url,
      message: res.message ?? "Internal server error",
    }

    resFinal.status(status).json(payload)
  }
}
