import { EErrorCode } from '../enums/error-code.enum';

export interface IResponseException {
  timestamp: Date;
  url: string;
  method: string;
  code: EErrorCode;
  messageUI: string;
  messageDebug: string;
  data: any;
}
