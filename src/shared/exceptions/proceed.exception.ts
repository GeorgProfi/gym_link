import { EErrorCode } from '../enums/error-code.enum';
import { ProceedAbstract } from './proceedAbstract.exception';
import { HttpStatus } from '@nestjs/common';
export class Proceed extends ProceedAbstract {
  readonly status: number = HttpStatus.BAD_REQUEST;

  constructor(
    public readonly code: EErrorCode = EErrorCode.Unknown,
    public readonly data: any = {},
  ) {
    super(code, data);
  }
}
