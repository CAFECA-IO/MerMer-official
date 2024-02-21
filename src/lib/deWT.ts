import { getServiceTermContract, toChecksumAddress, verifySignedServiceTerm } from '../lib/common';
import Lunar from '@cafeca/lunar';

export async function checkDeWTIsLegit (deWT: string | undefined, address: string | undefined): Promise<{
  isDeWTLegit: boolean,
  signer: string | undefined,
  deWT: string | undefined,
}> {
  let isDeWTLegit = false;
  let signer: string | undefined;
  const lunar = new Lunar()
  // 1. get DeWT from cookie
  if (!!deWT) {
    const [encodedData, signature] = deWT.split('.');
    // 2. decode and verify signed serviceTermContract
    const result = verifySignedServiceTerm(encodedData);
    isDeWTLegit = result.isDeWTLegit;
    if (isDeWTLegit && result.serviceTerm?.message?.signer && address) {
      signer = toChecksumAddress(result.serviceTerm.message.signer);
      // 3. verify signature with recreate serviceTermContract
      const serviceTermContractTemplate = getServiceTermContract(address);
      const serviceTermContract = {
        ...serviceTermContractTemplate,
        ...result.serviceTerm,
      };
      const verifyR = lunar.verifyTypedData(serviceTermContract, `0x${signature}`);

      isDeWTLegit = isDeWTLegit && !!signer && verifyR;
    }
  }
  return {isDeWTLegit, signer, deWT};
}