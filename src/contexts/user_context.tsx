import React, { createContext, useCallback, useContext } from 'react'
import useState from 'react-usestateref';
import { IUserContext } from '../interfaces/user_context';
import { IResult, defaultResultFailed } from '../interfaces/result';
import { Code, Reason } from '../constants/code';
import { CustomError } from '../lib/custom_error';
import Lunar from '@cafeca/lunar';
import { User } from '@prisma/client';
import { getCookieByName, getServiceTermContract, rlpEncodeServiceTerm } from '../lib/common';
import { iDeWTDecode } from '../interfaces/deWT';

export interface IUserProvider {
  children: React.ReactNode;
}

export const UserContext = createContext<IUserContext>({
  isConnected: false,
  connect: (): Promise<IResult> => {
    throw new CustomError(Code.FUNCTION_NOT_IMPLEMENTED);
  },
  signServiceTerm: (): Promise<IResult> => {
    throw new CustomError(Code.FUNCTION_NOT_IMPLEMENTED);
  },
})

export const UserProvider = ({ children }: IUserProvider) => {
  // Info (20240121) Murky - this is Singleton
  const lunar = Lunar.getInstance();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, setUser, userRef] = useState<User | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isConnected, setIsConnected, isConnectedRef] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [enableServiceTerm, setEnableServiceTerm, enableServiceTermRef] = useState<boolean>(false);

  const clearPrivateData = useCallback(() => {
    // clear DeWT
    // setDeWT('');
    setEnableServiceTerm(false);
    setUser(null);
    // setWalletBalances(null);
    // setUserAssets(null);
    // setOpenedCFDs([]);
    // setClosedCFDs([]);
    // setFavoriteTickers([]);
  }, []);
  const connect = useCallback(async (): Promise<IResult> => {
    let result: IResult = { ...defaultResultFailed };
    let resultCode = Code.UNKNOWN_ERROR;

    try {
      result.code = Code.WALLET_IS_NOT_CONNECT;
      const connect = await lunar.connect({});
      setIsConnected(connect);
      if (connect && lunar.isConnected) {
        if (!userRef.current) {
          const { isDeWTLegit, signer, deWT } = await checkDeWT();
          if (isDeWTLegit && signer && deWT) await setPrivateData(signer, deWT);
        }
        resultCode = Code.SUCCESS;
        result = {
          success: true,
          code: resultCode,
        };
      }

    } catch (e) {
      result.code = resultCode;
      result.reason = Reason[resultCode];
    }

    return result;
  }, []);

  const checkDeWT = useCallback(async (): Promise<{
    isDeWTLegit: boolean;
    signer: string | undefined;
    deWT: string | undefined;
  }> => {
    let isDeWTLegit = false;
    let signer = undefined
    const deWT = getCookieByName('DeWT');
    const address = lunar.address
    const res = await fetch('/api/auth/checkDeWT', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        deWT,
        address
      })
    })
    if (res.ok) {
      const result = await res.json()
      isDeWTLegit = result.isDeWTLegit
      signer = result.signer
    }
    return { isDeWTLegit, signer, deWT };
  }, []);

  const login = useCallback(async (): Promise<{
    user: User | null,
    deWTDecode: iDeWTDecode | null
  }> => {
    let user = null
    let deWTDecode = null
    const deWT = getCookieByName('DeWT');
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        deWT
      })
    })
    if (res.ok) {
      const result = await res.json()
      user = result?.data?.user
      deWTDecode = result?.data?.deWTDecode
    }
    return {
      user,
      deWTDecode
    };
  }, []);

  const setPrivateData = useCallback(async (address: string, deWT: string) => {
    let result: IResult = {
      success: false,
      code: Code.INTERNAL_SERVER_ERROR,
      reason: Reason[Code.INTERNAL_SERVER_ERROR],
    };

    result = await deWTLogin(address, deWT);
    if (result.success) {
      const user: User = result.data.user;
      const expiredAt: string = result.data.deWTDecode.expiredAt

      const expiredAtDate = new Date(expiredAt);
      // Deprecate: [debug] (20230524 - tzuhan)
      // eslint-disable-next-line no-console
      console.log(`deWTLogin expiredAtDate: ${expiredAtDate}, user`, user);
      // TODO: setTimeOut to clearPrivateData() (20230508 - tzuhan)
      setUser(user);

      setIsConnected(true);
      setEnableServiceTerm(true);


    } else {
      // Deprecate: [debug] (20230524 - tzuhan)
      // eslint-disable-next-line no-console
      console.log('setPrivateData deWTLogin.result.success false => clearPrivateData');
      clearPrivateData();
    }
  }, []);

  const deWTLogin = useCallback(async (address: string, deWT: string) => {
    const result: IResult = { ...defaultResultFailed };
    // 先 checkDeWT 是否legit後，再去呼叫User
    const { isDeWTLegit } = await checkDeWT();
    if (address && deWT && isDeWTLegit) {
      // Info postDeWT and get User data
      try {
        result.success = false;
        result.code = Code.INTERNAL_SERVER_ERROR;
        result.data = await login();
      } catch (error) {
        result.success = false;
        result.code = Code.INTERNAL_SERVER_ERROR;
        result.reason = Reason[result.code];
        // Deprecate: after implementing error handle (20230508 - tzuhan)
        // eslint-disable-next-line no-console
      }
    }
    return result;
  }, []);

  const signServiceTerm = useCallback(async (): Promise<IResult> => {
    let eip712signature: string;
    let resultCode = Code.UNKNOWN_ERROR;
    let result: IResult = { ...defaultResultFailed, code: resultCode, reason: Reason[resultCode] };

    try {
      if (lunar.isConnected) {
        const serviceTermContract = getServiceTermContract(lunar.address);
        const encodedData = rlpEncodeServiceTerm(serviceTermContract);
        resultCode = Code.SERVICE_TERM_DISABLE;
        eip712signature = await lunar.signTypedData(serviceTermContract);
        resultCode = Code.FAILED_TO_VERIFY_SIGNATURE;
        const verifyR: boolean = lunar.verifyTypedData(serviceTermContract, eip712signature);
        if (verifyR) {
          const deWT = `${encodedData}.${eip712signature.replace('0x', '')}`;
          setDeWT(deWT);
          await setPrivateData(lunar.address, deWT);
          resultCode = Code.SUCCESS;
          result = {
            success: true,
            code: resultCode,
          };
        } else {
          result.code = resultCode;
          result.reason = Reason[result.code];
        }
        return result;
      } else {
        const isConnected = await connect();
        if (isConnected) return signServiceTerm();
        else {
          resultCode = Code.WALLET_IS_NOT_CONNECT;
          result.code = resultCode;
          result.reason = Reason[result.code];
          return result;
        }
      }
    } catch (error) {
      result.code = resultCode;
      result.reason = Reason[resultCode];

      return result;
    }
  }, []);

  const setDeWT = useCallback(async (deWT: string) => {
    // Info (20230117) Murky: Set DeWT to Cookie
    document.cookie = `DeWT=${deWT}; path=/;`;
  }, []);

  // const disconnect = useCallback(async () => {
  //   let result: IResult = {...defaultResultFailed};
  //   try {
  //     // Deprecate: [debug] (20230524 - tzuhan)
  //     // eslint-disable-next-line no-console
  //     console.log(`onClick disconnect => clearPrivateData`);
  //     clearPrivateData();
  //     setIsConnected(false);
  //     await lunar.disconnect();
  //     if (!lunar.isConnected) {
  //       /** TODO  */
  //       result = {
  //         success: true,
  //         code: Code.SUCCESS,
  //       };
  //     }
  //   } catch (error) {
  //     // await disconnect();
  //   }
  //   return result;
  // }, []);
  // Info (20230117) Murky: Down Below is UserContext Construct
  const defaultValue = {
    isConnected: isConnectedRef.current,
    connect,
    signServiceTerm
  }
  return <UserContext.Provider value={defaultValue}>{children}</UserContext.Provider>
}