import React, { createContext, useCallback} from 'react'
import useState from 'react-usestateref';
import { IUserContext } from '../interfaces/user_context';
import { IResult } from '../interfaces/result';
import { Code } from '../constants/code';
import { CustomError } from '../lib/custom_error';

export interface IUserProvider {
  children: React.ReactNode;
}

export const UserContext = createContext<IUserContext>( {
  isConnected: false,
  connect: (): Promise<IResult> => { 
    throw new CustomError(Code.FUNCTION_NOT_IMPLEMENTED);
  },
  signServiceTerm: (): Promise<IResult> => {
    throw new CustomError(Code.FUNCTION_NOT_IMPLEMENTED);
  },
})

export const UserProvider = ({children}: IUserProvider) => {
  const [isConnected, setIsConnected, isConnectedRef] = useState<boolean>(false);

  const connect = useCallback(async(): Promise<IResult> => {
    const result:IResult = {
      success: false, 
      code: Code.WALLET_IS_NOT_CONNECT,
      data: {}
    }
    return result;
  }, []);

  const signServiceTerm = useCallback(async() : Promise<IResult> => {
    const result:IResult = {
      success: false, 
      code: Code.UNKNOWN_ERROR,
      data: {}
    }
    return result;
  }, [])
  // Info (20230117) Murky: Down Below is UserContext Construct
  const defaultValue = {
    isConnected: isConnectedRef.current,
    connect,
    signServiceTerm
  }
  return <UserContext.Provider value={defaultValue}>{children}</UserContext.Provider>
}