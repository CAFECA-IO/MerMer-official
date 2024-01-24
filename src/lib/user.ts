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
    
    // Info - (20230124) signer in serviceTerm is all lowercase, can't not use findUnique to match db data
    const findedUser = await prisma.user.findFirst({
      where: {
        signer: {
          equals:serviceTerm.message.signer,
          mode: 'insensitive'
        }
      }
    });

    if (findedUser && isDeWTLegit) {
      return {
        user: findedUser,
        deWTDecode: serviceTerm.message
      };
    }
  }
  return null;
}