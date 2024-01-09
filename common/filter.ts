import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response, Request } from 'express';
@Catch()
export class HttpFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();
    const request: Request = ctx.getRequest();
    const status = exception.getStatus();
    // 设置返回的状态码、请求头、返回体
    response.status(status).json({
      success: false,
      timestamp: new Date().toISOString(),
      data: exception,
      status,
      path: request.url,
    });
  }
}
