import { CustomError } from "./custom_error";
import { Code } from "../constants/code";
import { DOMAIN, DeWT_VALIDITY_PERIOD, PRIVATE_POLICY, SERVICE_TERM_TITLE, TERM_OF_SERVICE } from "../constants/config";
import RLP from "rlp";
import ServiceTerm from "../constants/contracts/service_term";
import IEIP712Data from "../interfaces/ieip712data";
import IJSON from "../interfaces/ijson";
import type { NextRouter } from "next/router";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Keccak = require('@cafeca/keccak');

export const timestampToString = (timestamp: number) => {
  if (timestamp === 0)
    return {
      date: '-',
    };

  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const dateString = `${year}-${month.toString().padStart(2, '0')}-${day
    .toString()
    .padStart(2, '0')}`;

  return {
    date: dateString,
  };
};

export const truncateText = (text: string, limitLength: number) => {
  const words = text.split(' ');
  let result = '';

  for (let i = 0; i < words.length; i++) {
    if ((result + words[i]).length > limitLength) break;
    if (result.length != 0) result += ' ';

    result += words[i];
  }
  if (text.length > limitLength) result += '...';

  return result;
};


// Info (20230117) Murky- locker and await is for Wallet Connect login

interface IRoomOfLocker {
  [key: string]: boolean;
}

// Info (20230117) Murky: room is global variable

type ILocker = [() => boolean, () => boolean, IRoomOfLocker];
export const room: IRoomOfLocker = {'common.Example': false};
export const locker = (id: string): ILocker => {

  // let locked = false;

  const lock = () => {
    if (room[id]) {
      // room[id] === true 代表已經上鎖，某 function 正在執行中；
      // 故 `lock` 回傳 false，代表不能執行某 function
      return false;
    } else {
      // room[id] === false 代表沒有上鎖，代表該 function 可以執行；
      // 故鎖上房門並讓 `lock` 回傳 true， 代表可以執行某 function
      room[id] = true;
      // locked = true;
      return true;
    }
  };

  const unlock = () => {
    // room[id] 代表該 function 已經執行完畢，可以解鎖房門
    if (room[id]) {
      room[id] = false;
      // locked = false;
      return true;
    } else {
      // 重複解鎖，代表流程有問題，故拋出錯誤
      throw new CustomError(Code.LOCK_PROCEDURE_WRONG);
    }
  };

  return [lock, unlock, room];
};

export const wait = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const toQuery = (params: {[key: string]: string | number | boolean} | undefined) => {
  const query: string = params
    ? `?${Object.keys(params)
        .map(key => `${key}=${params[key]}`)
        .join('&')}`
    : ``;
  return query;
};

export const getTimestamp = () => Math.ceil(Date.now() / 1000);

export const getCookieByName = (name: string): string | undefined => {
  const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${name}=`))
    ?.split('=')[1];

  return cookieValue;
};

export const verifySignedServiceTerm = (encodedServiceTerm: string) => {
  let isDeWTLegit = true;
  const serviceTerm = rlpDecodeServiceTerm(encodedServiceTerm);
  // Info: 1. verify contract domain (20230411 - tzuhan)
  if (serviceTerm.message.domain !== DOMAIN) isDeWTLegit = false && isDeWTLegit;
  // Info: 2. verify contract agreement (20230411 - tzuhan)
  if (serviceTerm.message.agree[0] !== TERM_OF_SERVICE) isDeWTLegit = false && isDeWTLegit;
  if (serviceTerm.message.agree[1] !== PRIVATE_POLICY) isDeWTLegit = false && isDeWTLegit;
  // Info: 3. verify contract expiration time (20230411 - tzuhan)
  if (
    !serviceTerm.message.expired || // Info: expired 不存在 (20230411 - tzuhan)
    !serviceTerm.message.iat || // Info: iat 不存在 (20230411 - tzuhan)
    serviceTerm.message.iat > serviceTerm.message.expired || // Info: iat 大於 expired (20230411 - tzuhan)
    serviceTerm.message.iat > getTimestamp() || // Info: iat 大於現在時間  (20230411 - tzuhan)
    serviceTerm.message.expired < getTimestamp() || // Info: expired 小於現在時間 (20230411 - tzuhan)
    serviceTerm.message.iat - serviceTerm.message.expired > DeWT_VALIDITY_PERIOD || // Info: iat 與 expired 的時間間隔大於 DeWT 的有效時間 (20230411 - tzuhan)
    getTimestamp() - serviceTerm.message.iat > DeWT_VALIDITY_PERIOD // Info: 現在時間與 iat 的時間間隔大於 DeWT 的有效時間 (20230411 - tzuhan)
  )
    isDeWTLegit = false && isDeWTLegit;
  // Deprecated: (20230717 - tzuhan) [debug]
  if (!isDeWTLegit) {
    // eslint-disable-next-line no-console
    console.log(
      `verifySignedServiceTerm:`,
      `serviceTerm.message.domain(${serviceTerm.message.domain}) !== DOMAIN(${DOMAIN})`,
      serviceTerm.message.domain !== DOMAIN,
      `serviceTerm.message.agree[0](${serviceTerm.message.agree[0]}) !== TERM_OF_SERVICE(${TERM_OF_SERVICE})`,
      serviceTerm.message.agree[0] !== TERM_OF_SERVICE,
      `serviceTerm.message.agree[1](${serviceTerm.message.agree[1]}) !== PRIVATE_POLICY(${PRIVATE_POLICY})`,
      serviceTerm.message.agree[1] !== PRIVATE_POLICY,
      `serviceTerm.message.iat(${serviceTerm.message.iat}) > serviceTerm.message.expired(${serviceTerm.message.expired})`,
      (serviceTerm.message?.iat ?? 0) > (serviceTerm.message?.expired ?? 0),
      `getTimestamp()`,
      getTimestamp(),
      `serviceTerm.message.iat(${
        serviceTerm.message?.iat ?? 0
      }) > getTimestamp()(${getTimestamp()})`,
      (serviceTerm.message?.iat ?? 0) > getTimestamp(),
      `serviceTerm.message.expired(${
        serviceTerm.message?.expired ?? 0
      }) < getTimestamp()(${getTimestamp()})`,
      (serviceTerm.message?.expired ?? 0) < getTimestamp(),
      `getTimestamp()(${getTimestamp()}) - serviceTerm.message.iat(${
        serviceTerm.message?.iat ?? 0
      }) > DeWT_VALIDITY_PERIOD(${DeWT_VALIDITY_PERIOD})`,
      getTimestamp() - (serviceTerm.message?.iat ?? 0) > DeWT_VALIDITY_PERIOD
    );
    // Deprecated: (20231130 - tzuhan) [debug]
    // eslint-disable-next-line no-console
    console.log(
      `[common] verifySignedServiceTerm isDeWTLegit: ${isDeWTLegit}, serviceTerm`,
      serviceTerm
    );
  }
  return {isDeWTLegit, serviceTerm};
};

const asciiToString = (asciiBuffer: Uint8Array) => {
  let string = '';
  const hexString = Buffer.from(asciiBuffer).toString('hex');
  for (let i = 0; i < hexString.length; i += 2) {
    string += String.fromCharCode(parseInt(hexString.substr(i, 2), 16));
  }
  return string;
};

const asciiToInt = (asciiBuffer: Uint8Array) => {
  const hexString = Buffer.from(asciiBuffer).toString('hex');
  const asciiInt = parseInt(hexString, 16);
  return asciiInt;
};

const convertServiceTermToObject = (serviceTerm: IEIP712Data) => {
  const message = serviceTerm.message as {[key: string]: IJSON};
  const data = {
    primaryType: serviceTerm.primaryType as string,
    domain: {...serviceTerm.domain},
    message: {
      title: message.title as string,
      domain: message.domain as string,
      agree: message.agree as string[],
      signer: message.signer as string,
      expired: message.expired as number,
      iat: message.iat as number,
    },
  };
  return data;
};


export const rlpEncodeServiceTerm = (serviceTerm: IEIP712Data) => {
  const data = convertServiceTermToObject(serviceTerm);
  const encodedData = RLP.encode([
    data.message.title,
    data.message.domain,
    data.message.agree,
    data.message.signer,
    data.message.expired,
    data.message.iat,
  ]);
  const dataToHex = Buffer.from(encodedData).toString('hex');
  return dataToHex;
};


export const rlpDecodeServiceTerm = (data: string) => {
  const buffer = Buffer.from(data, 'hex');
  const decodedData = RLP.decode(buffer);
  const title = decodedData[0] ? asciiToString(decodedData[0] as Uint8Array) : undefined;
  const domain = decodedData[1] ? asciiToString(decodedData[1] as Uint8Array) : undefined;
  const agree = [
    asciiToString((decodedData[2] as Array<Uint8Array>)[0]),
    asciiToString((decodedData[2] as Array<Uint8Array>)[1]),
  ];
  const signer = decodedData[3]
    ? `${toChecksumAddress(Buffer.from(decodedData[3] as Uint8Array).toString('hex'))}`
    : undefined;
  const expired = decodedData[4] ? asciiToInt(decodedData[4] as Uint8Array) : undefined;
  const iat = decodedData[5] ? asciiToInt(decodedData[5] as Uint8Array) : undefined;
  return {
    message: {
      title,
      domain,
      agree,
      signer,
      expired,
      iat,
    },
  };
};

export const getKeccak256Hash = (data: string) => {
  data = data.toLowerCase().replace('0x', '');
  const keccak256 = new Keccak('keccak256');
  const hash = keccak256.update(data).digest('hex');
  return hash;
};

export const toChecksumAddress = (address: string) => {
  address = address.toLowerCase().replace('0x', '');
  const hash = getKeccak256Hash(address);

  let checksumAddress = '0x';

  for (let i = 0; i < address.length; i++) {
    if (parseInt(hash[i], 16) >= 8) {
      checksumAddress += address[i].toUpperCase();
    } else {
      checksumAddress += address[i];
    }
  }

  return checksumAddress;
};

export const getServiceTermContract = (address: string) => {
  const serviceTermsContract = ServiceTerm;
  const message = {
    title: SERVICE_TERM_TITLE,
    domain: DOMAIN,
    agree: [TERM_OF_SERVICE, PRIVATE_POLICY],
    signer: address,
    expired: getTimestamp() + DeWT_VALIDITY_PERIOD,
    iat: getTimestamp(),
  };
  serviceTermsContract.message = message;
  return serviceTermsContract;
};

export const getUserDataLanguageName = (router: NextRouter): string => {
  const language = router.locale
  switch(language) {
    case 'en':
      return 'enUserData'
    case 'cn':
      return 'cnUserData'
    default:
      return 'twUserData'
  }


}