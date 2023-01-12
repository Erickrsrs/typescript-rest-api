import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface IData {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json('Login required');

  const [, token] = authorization.split(' ');

  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET as string) as IData;
    const { id, email } = data;
    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (err) {
    return res.status(401).json('Invalid token');
  }
};
