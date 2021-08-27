import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDb } from 'services/connectdb';
import { ObjectId } from 'mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await connectToDb();
  switch (req.method) {
    case 'GET': {
      const subId = req.query.subId;
      const data = await db.collection('words').find({ subId: subId }).sort({ _id: 1 }).toArray();
      res.json(data);
      break;
    }
    case 'POST': {
      try {
        const payload = req.body; //payload has to be in [] cause insertMany
        const options = { ordered: true };
        const words = await db.collection('words').insertMany(payload, options);
        res.status(201).json({ status: 'Add new words', words });
      } catch (error) {
        res.status(422).json({ status: 'not_created', error });
      }
      break;
    }
    case 'PUT': {
      try {
        const id = new ObjectId(req.query.id.toString());
        console.log(id, 'id query');
        const payload = req.body; //payload has to be in [] cause insertMany
        const filter = { _id: id};
        const updateDoc = {
          $set: {
            value: payload.value,
          },
        };
        const options = { upsert: true };
        const words = await db.collection('words').findOneAndUpdate(filter, updateDoc, options);
        res.status(201).json({ status: 'Edit correctlty', words });
      } catch (error) {
        res.status(422).json({ status: 'not_created', error });
      }
      break;
    }
    case 'DELETE': {
      try {
        const id = new ObjectId(req.query.id.toString());
        console.log(id, 'id query deleting');
        const filter = { _id: id};
        const words = await db.collection('words').deleteOne(filter);
        res.status(201).json({ status: 'Edit correctlty', words });
      } catch (error) {
        res.status(422).json({ status: 'not_created', error });
      }
      break;
    }

    default:
      res.status(400);
  }
};
