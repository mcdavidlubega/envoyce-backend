import { db } from '@utils/dbconnection';
import { Request, Response } from 'express';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

const { TOKEN_SECRET } = process.env;

const signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  const user = await db.users.findUnique({
    where: {
      email,
    },
  });

  if (user) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await argon2.hash(password);
  const newuser = await db.users.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });
  return res.status(201).json(newuser);
};

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

  return res.status(200).json({ token });
};

export default { login, signup };
