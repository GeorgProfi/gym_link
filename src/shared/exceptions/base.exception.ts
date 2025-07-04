import { EErrorCode } from '../enums/error-code.enum';

export abstract class BaseException {
  public abstract readonly status: number;
  constructor(
    public readonly code: EErrorCode = EErrorCode.Unknown,
    public readonly messageUI: string = 'Ошибка',
    public readonly messageDebug: string = messageUI,
    public readonly data: any = {},
  ) {}

  toString(): string {
    return this.messageDebug;
  }
}
