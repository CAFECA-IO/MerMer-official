import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let dir: string

  if (!req.query.dir) {
    res.status(400).json({ error: 'Bad Request' });
    return;
  }
  else if (Array.isArray(req.query.dir)) {
    dir = req.query.dir.join('/');
  } else {
    dir = req.query.dir;
  }
  try {
    const filePath = path.join(process.cwd(), 'public', dir);

    fs.readFile(filePath, (err, data) => {
      if (err) {
        if(err.code === 'ENOENT') {
          res.status(404).json({ error: 'File not found' });
          return;
        } else {
        res.status(500).json({ error: 'Failed to read file' });
        return;
        }
      } else {
        res.status(200).send(data);
      }
    });

    return res.status(200);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch file' });
  }
}