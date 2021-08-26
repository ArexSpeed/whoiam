import { connectToDb } from 'services/connectdb';

export default async (req, res) => {
  const db = await connectToDb();
  console.log(db, 'connect');
  const data = await db.collection("categories").find().sort({_id: 1}).toArray();
  res.json(data);
};
