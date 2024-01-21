import type { NextApiRequest, NextApiResponse } from 'next'
import { IResult } from '../../../interfaces/result'
import { Code } from '../../../constants/code'
import { checkDeWTIsLegit } from '../../../lib/deWT'
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const result:IResult = {
    success: false,
    code: Code.DEWT_IS_NOT_LEGIT,
    data: {
      isDeWTLegit: false,
      signer: null,
      deWT: null
    }
  }
  if (req.method === 'POST') {
    const { deWT, address } = req.body
    const {isDeWTLegit, signer } = await checkDeWTIsLegit(deWT, address)

    result.success = true,
    result.code = Code.SUCCESS
    result.data = {
      isDeWTLegit,
      signer,
      deWT
    }
  }
  return res.json(result)
}