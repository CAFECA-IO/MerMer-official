import { CustomError } from "./custom_error";
import { Code } from "../constants/code";

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
const room: IRoomOfLocker = {'common.Example': false};
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

// Info (20230117) Murky
// Todo 
//rlpEncodeServiceTerm,
//toChecksumAddress,
//  verifySignedServiceTerm,