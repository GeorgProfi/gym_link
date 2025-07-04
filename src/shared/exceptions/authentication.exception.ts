import { BaseException } from './base.exception';
import { HttpStatus } from '@nestjs/common';
import { EErrorCode } from '../enums/error-code.enum';

export class AuthenticationException extends BaseException {
  readonly status: number = HttpStatus.UNAUTHORIZED;
  constructor(
    code: EErrorCode = EErrorCode.Unauthorized,
    messageUI: string = 'Ошибка авторизации',
    messageDebug: string = messageUI,
    public readonly data: any = {},
  ) {
    super(code, messageUI, messageDebug, data);
  }
}
