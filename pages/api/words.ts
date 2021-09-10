import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDb, closeConnection } from 'services/connectdb';
import { ObjectId } from 'mongodb';
import { getSession } from 'next-auth/client';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await connectToDb();
  switch (req.method) {
    case 'GET': {
      const query = req.query;
      if (query.subId) {
        const subId = query.subId;
        const data = await db.collection('words').find({ subId: subId }).sort({ _id: 1 }).toArray();
        closeConnection();
        res.json(data);
        break;
      } else {
        const data = await db.collection('words').find().sort({ _id: 1 }).toArray();
        closeConnection();
        res.json(data);
        break;
      }
    }
    case 'POST': {
      try {
        const session = await getSession({ req });
        if (!session) {
          return res.status(401).json({ error: 'not_authorized' });
        }
        const payload = req.body; //payload has to be in [] cause insertMany
        const options = { ordered: true };
        const words = await db.collection('words').insertMany(payload, options);
        res.status(201).json({ status: 'Add new words', words });
      } catch (error) {
        res.status(422).json({ status: 'not_created', error });
      }
      closeConnection();
      break;
    }
    case 'PUT': {
      const session = await getSession({ req });
      if (!session) {
        return res.status(401).json({ error: 'not_authorized' });
      }
      try {
        const id = new ObjectId(req.query.id.toString());
        const payload = req.body; //payload has to be in [] cause insertMany
        const filter = { _id: id };
        const updateDoc = {
          $set: {
            value: payload.value
          }
        };
        const options = { upsert: true };
        const words = await db.collection('words').findOneAndUpdate(filter, updateDoc, options);
        res.status(201).json({ status: 'Edit correctlty', words });
      } catch (error) {
        res.status(422).json({ status: 'not_created', error });
      }
      closeConnection();
      break;
    }
    case 'DELETE': {
      const session = await getSession({ req });
      if (!session) {
        return res.status(401).json({ error: 'not_authorized' });
      }
      try {
        const id = new ObjectId(req.query.id.toString());
        const filter = { _id: id };
        const words = await db.collection('words').deleteOne(filter);
        closeConnection();
        res.status(201).json({ status: 'Edit correctlty', words });
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
