import { BaseException } from './base.exception';
import { HttpStatus, ValidationError } from '@nestjs/common';
import { EErrorCode } from '../enums/error-code.enum';

export class ValidateException extends BaseException {
  readonly status: number = HttpStatus.BAD_REQUEST;
  constructor(private readonly validationErrors: ValidationError[]) {
    super(
      EErrorCode.Validate,
      'Некорректные данные',
      'Некорректные данные',
      validationErrors.reduce(
        (constraints, err) => Object.assign(constraints, err.constraints),
        {},
      ),
    );
  }
}
