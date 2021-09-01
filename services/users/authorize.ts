import { connectToDb } from '../connectdb';
import Joi from 'joi';
import crypto from 'crypto';

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const authorizeUser = async (payload: Record<'email' | 'password', string>) => {
  const db = await connectToDb();
  const { email, password } = await schema.validateAsync(payload);

  // eslint-disable-next-line prettier/prettier
  const user = await db.collection('users').findOne({ "email": email });

  if (!user) {
    return null;
  }

  const passwordHash = crypto
    .pbkdf2Sync(password, user.passwordSalt, 1000, 64, `sha512`)
    .toString(`hex`);

  if (passwordHash !== user.passwordHash) {
    return null;
  }

  return {
    id: user._id,
    email: user.email,
    name: user.name,
    isAdmin: user.isAdmin
  };
};

export default authorizeUser;
