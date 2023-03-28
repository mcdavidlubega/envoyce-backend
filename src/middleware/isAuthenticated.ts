import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const { TOKEN_SECRET } = process.env;
import { Users } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: Users;
    }
  }
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers['x-auth-token'] as string;
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const verified = jwt.verify(token, TOKEN_SECRET as string);
    req.user = verified as Users;
    next();
  } catch (err) {
    return res.status(400).send('Invalid Token');
  }
};
