import { IResult } from "./result";

export interface IUserContext {
  isConnected: boolean;
  connect: () => Promise<IResult>;
  signServiceTerm: () => Promise<IResult>;
}