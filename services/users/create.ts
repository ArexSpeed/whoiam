import { connectToDb } from '../connectdb';
import Joi from 'joi';
import crypto from 'crypto';

const schema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  password: Joi.string().required()
});

const checkUserExist = async (email: string) => {
  const db = await connectToDb();
  // eslint-disable-next-line prettier/prettier
  const existingUserEmail = await db.collection('users').findOne({ "email": email });
  if (existingUserEmail) {
    throw new Error('This user is exists');
  }
};

const create = async (payload: Record<'email' | 'password' | 'name', string>) => {
  const db = await connectToDb();
  const { email, name, password } = await schema.validateAsync(payload);
  await checkUserExist(email);

  const passwordSalt = crypto.randomBytes(16).toString('hex');
  const passwordHash = crypto
    .pbkdf2Sync(password, passwordSalt, 1000, 64, `sha512`)
    .toString(`hex`);
  const user = await db.collection('users').insertOne({
    email,
    name,
    passwordSalt,
    passwordHash,
    isAdmin: false
  });

  return user;
};

export default create;
