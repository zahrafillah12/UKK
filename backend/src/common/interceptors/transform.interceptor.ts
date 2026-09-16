import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  Response<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    return next.handle().pipe(
      map((data) => {
        let message = 'Berhasil memproses permintaan';

        // If data object has a message, extract it, or use default
        if (
          data &&
          typeof data === 'object' &&
          data.message &&
          Object.keys(data).length > 1
        ) {
          message = data.message;
          const { message: _, ...rest } = data;
          data = Object.keys(rest).length === 1 && rest.data ? rest.data : rest; // unpack if it was {message, data}
        } else if (
          data &&
          typeof data === 'object' &&
          data.message &&
          data.data
        ) {
          message = data.message;
          data = data.data;
        }

        return {
          status: true,
          statusCode: response.statusCode,
          message,
          data,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}
