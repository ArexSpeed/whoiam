import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDb } from 'services/connectdb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await connectToDb();
  switch (req.method) {
    case 'GET': {
      const data = await db.collection('words').find().sort({ _id: 1 }).toArray();
      res.json(data);
      break;
    }
    case 'POST': {
      try {
        const payload = req.body; //payload has to be in [] cause insertMany
        console.log(payload, 'payload in api')
        const options = { ordered: true };
        const words = await db.collection('words').insertMany(payload, options);
        res.status(201).json({ status: 'Add new words', words });
      } catch (error) {
        res.status(422).json({ status: 'not_created', error });
      }
      break;
    }

    default:
      res.status(400);
  }
};
