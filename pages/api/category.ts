import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDb } from 'services/connectdb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await connectToDb();
  const data = await db.collection("categories").find().sort({_id: 1}).toArray();
  res.status(200).json(data);
};
