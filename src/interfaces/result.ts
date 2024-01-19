import { ICode } from "../constants/code";

export interface IResult {
  success: boolean;
  code: ICode;
  data?: any;
  reason?: string;
}