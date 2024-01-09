import { CallHandler, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
interface ResponseData<T> {
  data: T;
}
@Injectable()
export class globalResponse<T> implements NestInterceptor {
  intercept(context, next: CallHandler): Observable<ResponseData<T>> {
    // 处理响应
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          status: 0,
          message: '这是拦截的接口',
          success: true,
        };
      }),
    );
  }
}
