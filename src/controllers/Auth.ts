import { db } from '@utils/dbconnection';
import { Request, Response } from 'express';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { ActivityData } from 'src/types/typings';

const { TOKEN_SECRET } = process.env;

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userCheck = await db.users.findUnique({
    where: { email },
  });

  if (!userCheck) return res.status(400).json({ message: 'User not found' });

  const verifyPassword = await argon2.verify(userCheck.password, password);
  if (!verifyPassword)
    return res.status(400).json({ message: 'Invalid password' });

  const token = jwt.sign({ userId: userCheck.id }, TOKEN_SECRET as string);

  const logData: ActivityData = {
    activity: 'Logged In',
    usersId: userCheck.id,
    ref: '',
  };

  return res.status(200).json({ token });
};

export default { login };
