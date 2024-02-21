import type { NextApiRequest, NextApiResponse } from 'next'
import { IResult } from '../../../interfaces/result'
import { Code } from '../../../constants/code'
import { getUserByDeWTAndNoVerify } from '../../../lib/user'
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const result:IResult = {
    success: false,
    code: Code.DEWT_IS_NOT_LEGIT,
    data: null
  }
  if (req.method === 'POST') {
    const { deWT } = req.body
    const userAndDeWTDecode = await getUserByDeWTAndNoVerify(deWT)

    if (userAndDeWTDecode?.user) {
      result.success = true,
      result.code = Code.SUCCESS
      result.data = userAndDeWTDecode?.user
    }
  }
  return res.json(result)
}