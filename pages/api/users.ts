import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDb, closeConnection } from 'services/connectdb';
import create from 'services/users/create';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await connectToDb();

  switch (req.method) {
    case 'GET': {
      const data = await db.collection("users").find({"user": req.query.user}).sort({_id: 1}).toArray();
      res.json(data);
      closeConnection();
      break;
    }
    case 'POST': {
      try {
        const payload = req.body;
        console.log(payload, 'body')
        const data = await create(payload);
        res.status(200).json({ status: 'created', data});
      } catch (error) {
        res.status(422).json({ status: 'not_created', error });
      }
      break;
    }

    default:
      res.status(400);
  }

};