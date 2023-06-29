import {NextApiRequest, NextApiResponse} from 'next';
import SendMail from '../../lib/utils/email';

type emailConfig = {
  googleClientID: string;
  googleClientPassword: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  /* Info: (20230324 - Julian) read config */
  const config = {
    googleClientID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    googleClientPassword: process.env.REACT_APP_GOOGLE_CLIENT_PASSWORD,
  };

  /* Info: (20230324 - Julian) send email */
  const sendMail = SendMail.sendMail;
  const sender = sendMail(config as emailConfig, await req.body.comment);

  /* Info: (20230324 - Julian) return result */
  const result = await sender;

  res.status(200).json(result);
}
