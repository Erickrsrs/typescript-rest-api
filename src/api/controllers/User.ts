import { Request, Response } from 'express';
import { Error } from 'mongoose';
import { User } from '../models/User';

class UserController {
  static async create(req: Request, res: Response) {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      if (err instanceof Error.ValidationError) {
        res.status(400).json(err.message);
      } else {
        res.status(400).json(err);
      }
    }
  }
}

export default UserController;
