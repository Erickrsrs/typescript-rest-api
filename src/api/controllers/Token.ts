import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

class TokenController {
  static async create(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(401).json('Invalid credentials');
      }
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(401).json('User does not exist');
      }
      if (!(await user.validatePassword(password))) {
        return res.status(401).json('Invalid password');
      }
      const { id } = user;
      const token = jwt.sign(
        { id, email },
        process.env.TOKEN_SECRET as string,
        {
          expiresIn: process.env.TOKEN_EXPIRATION,
        },
      );
      return res.json({ token });
    } catch (err) {
      return res.status(400).json(err);
    }
  }
}

export default TokenController;
