import { BaseException } from './base.exception';
import { HttpStatus } from '@nestjs/common';
import { EErrorCode } from '../enums/error-code.enum';

export class IncorrectRoleException extends BaseException {
  readonly status: number = HttpStatus.BAD_REQUEST;
  constructor(
    code: EErrorCode = EErrorCode.Unknown,
    // Норм бы ошибку
    messageUI: string = 'У вас нет разрешения на доступ к данному контенту',
    messageDebug: string = messageUI,
    public readonly data: any = {},
  ) {
    super(code, messageUI, messageDebug, data);
  }
}
