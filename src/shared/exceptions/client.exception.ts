import { BaseException } from './base.exception';
import { HttpStatus } from '@nestjs/common';
import { EErrorCode } from '../enums/error-code.enum';

export class ClientException extends BaseException {
  readonly status: number = HttpStatus.BAD_REQUEST;
  constructor(
    public readonly code: EErrorCode,
    public readonly messageUI: string = 'Ошибка',
    public readonly messageDebug: string = messageUI,
    public readonly data: any = {},
  ) {
    super(code, messageUI, messageDebug, data);
  }
}
