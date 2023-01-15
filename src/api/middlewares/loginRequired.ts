import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

interface IData {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ Error: 'Login required' });
  const [, token] = authorization.split(' ');

  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET as string) as IData;
    const { id, email } = data;
    const userExists = await User.findOne({ _id: id, email });

    if (!userExists) {
      return res.status(401).json({ Error: 'Invalid User' });
    }
    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (err) {
    return res.status(401).json({ Error: 'Invalid token' });
  }
};
