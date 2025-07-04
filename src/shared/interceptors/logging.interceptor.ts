import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map, tap } from 'rxjs';
import { inspect } from 'util';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger: Logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    return next.handle().pipe(
      map((res) => res ?? {}),
      tap((res) => {
        Logger.debug(inspect(res, { colors: true }));
      }),
      tap(() => Logger.debug(`After... ${Date.now() - now}ms`)),
    );
  }
}
