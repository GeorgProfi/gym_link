import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { BaseException } from '../exceptions/base.exception';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Request, Response } from 'express';
import { IResponseException } from '../interfaces/response-exception.interface';
import { EErrorCode } from '../enums/error-code.enum';
import * as util from 'util';
import { AuthenticationException } from '../exceptions/authentication.exception';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger(GlobalExceptionFilter.name);
  catch(exception: BaseException | any, host: ArgumentsHost): any {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const request: Request = ctx.getRequest<Request>();

    if (exception instanceof UnauthorizedException) {
      exception = new AuthenticationException();
    }

    this.logger.error(util.inspect(exception, { colors: true }));

    const res: IResponseException = {
      url: request.url,
      method: request.method,
      timestamp: new Date(),
      code: exception.code ?? EErrorCode.Unknown,
      messageUI: exception.messageUI ?? 'Неизвестная ошибка',
      messageDebug: exception.messageDebug ?? exception.toString(),
      data: exception.data ?? {},
    };
    const status = exception.status ?? 500;
    response.status(status).json(res);
  }
}
