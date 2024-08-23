//响应拦截器
import { Injectable, NestInterceptor, CallHandler } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface Data<T> {
  data: T;
  code: number;
  msg: string;
}

@Injectable()
export class Response<T> implements NestInterceptor {
  intercept(context, next: CallHandler): Observable<Data<T>> {
    return next.handle().pipe(
      map(({ data, code = 200, msg = '请求成功' }) => {
        return {
          data,
          code: code,
          msg: msg,
        };
      }),
    );
  }
}
