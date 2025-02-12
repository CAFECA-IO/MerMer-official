import type { NextApiRequest, NextApiResponse } from "next";
import * as packageData from "../../../package.json";

type Data = {
  powerby: string;
}

const version = {
  powerby: `${packageData.name} ${packageData.version}`,
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  res.status(200).json(version);
}
