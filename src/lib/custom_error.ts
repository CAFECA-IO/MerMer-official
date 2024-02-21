import {ICode, Reason} from '../constants/code';

export class CustomError extends Error {
  code: ICode;

  constructor(code: ICode) {
    const message = Reason[code];
    super(message);
    this.code = code;
  }
}

export const isCustomError = (error: unknown): error is CustomError => {
  return error instanceof CustomError;
};

export interface MetaMaskError extends Error {
  code: number;
  message: string;
}

export function isRejectedError(error: MetaMaskError): boolean {
  const hasCode = +error.code === 4001;
  const hasMessage = error.message.includes('MetaMask');
  const isRejected = hasCode && hasMessage;
  return isRejected;
}
