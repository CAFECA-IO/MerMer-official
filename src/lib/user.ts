import { iDeWTDecode } from '../interfaces/deWT';
import { verifySignedServiceTerm } from '../lib/common';
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
    const {isDeWTLegit, serviceTerm} = verifySignedServiceTerm(encodedData);
    const findedUser = await prisma.user.findUnique({
      where: {
        signer:serviceTerm.message.signer
      }
    });
    if (findedUser && isDeWTLegit) {
      return {
        user: findedUser,
        deWTDecode: serviceTerm.message
      }
    }
  }
  return null;
}