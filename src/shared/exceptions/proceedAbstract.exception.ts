import { EErrorCode } from '../enums/error-code.enum';

export abstract class ProceedAbstract {
  public abstract readonly status: number;
  constructor(
    public readonly code: EErrorCode = EErrorCode.Unknown,
    public readonly data: any = {},
  ) {}
}
