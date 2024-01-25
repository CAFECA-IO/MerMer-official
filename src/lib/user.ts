import { merMerAdminConfig } from '../constants/config';
import { iDeWTDecode } from '../interfaces/deWT';
import { rlpDecodeServiceTerm, verifySignedServiceTerm } from '../lib/common';
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
  if (!!deWT) {
    const encodedData = deWT.split('.')[0];
    const {isDeWTLegit, serviceTerm} = verifySignedServiceTerm(encodedData);
    
    // Info - (20230124) signer in serviceTerm is all lowercase, can't not use findUnique to match db data
    const findedUser = await prisma.user.findUnique({
      where: {
        signer: serviceTerm.message.signer,
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

export async function getUserByDeWTAndNoVerify(deWT: string): Promise<{user:User, deWTDecode:iDeWTDecode} | null> {
  if (!!deWT) {
    const encodedData = deWT.split('.')[0];
    const {message} = rlpDecodeServiceTerm(encodedData);
    const defaultUserAvatarUrl = merMerAdminConfig.defaultUserAvatarUrl

    // Info - (20230124) signer in serviceTerm is all lowercase, can't not use findUnique to match db data
    const findedUser = await prisma.user.findUnique({
      where: {
        signer: message.signer
      },
      select: {
        userId: true,
        id: true,
        email: true,
        signer: true,
        role: true,
        avatar: true,
        kms: true,
        twUserData: true,
        enUserData: true,
        cnUserData: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (findedUser) {
      findedUser.avatar = findedUser.avatar ? findedUser.avatar : defaultUserAvatarUrl
      return {
        user: findedUser,
        deWTDecode: message
      };
    }
  }
  return null;
}