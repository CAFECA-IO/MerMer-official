import { iDeWTDecode } from '../interfaces/deWT';
import { rlpDecodeServiceTerm } from '../lib/common';
import prisma from "./db";
import { User } from '@prisma/client';

export async function isUserWalletExist(signer: string): Promise<boolean> {
  const findedUser = await prisma.user.findUnique({
    where: {
      signer
    }
  })

  return !!findedUser
}


export async function getUserByDeWT(deWT: string): Promise<{user:User, deWTDecode:iDeWTDecode} | null> {
  // 1. get DeWT from cookie
  if (!!deWT) {
    const encodedData = deWT.split('.')[0];
    const deWTDecode = rlpDecodeServiceTerm(encodedData);
    const findedUser = await prisma.user.findUnique({
      where: {
        signer:deWTDecode.message.signer
      }
    });
    if (findedUser) {
      return {
        user: findedUser,
        deWTDecode: deWTDecode.message
      }
    }
  }
  return null;
}