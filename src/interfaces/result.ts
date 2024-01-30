import { Code, ICode, Reason } from "../constants/code";

export interface IResult {
  success: boolean;
  code: ICode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  reason?: string;
}

export const defaultResultSuccess: IResult = {
  success: true,
  code: Code.SUCCESS,
  data: null,
};

export const defaultResultFailed: IResult = {
  success: false,
  code: Code.INTERNAL_SERVER_ERROR,
  reason: Reason[Code.INTERNAL_SERVER_ERROR],
};

