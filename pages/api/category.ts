import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDb, closeConnection } from 'services/connectdb';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await connectToDb();
  switch (req.method) {
    case 'GET': {
      const data = await db.collection('categories').find().sort({ _id: 1 }).toArray();
      res.json(data);
      closeConnection();
      break;
    }
    case 'POST': {
      try {
        const payload = req.body;
        const category = await db.collection('categories').insertOne({
          catId: payload.catId,
          category: payload.category
        });
        res.status(200).json({ status: 'created', category });
      } catch (error) {
        res.status(422).json({ status: 'not_created', error });
      }
      closeConnection();
      break;
    }

    default:
      res.status(400);
  }
};
