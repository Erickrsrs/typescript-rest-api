import { Request, Response } from 'express';
import { Error } from 'mongoose';
import { User } from '../models/User';

class UserController {
  static async create(req: Request, res: Response) {
    try {
      const newUser = await User.create(req.body);
      const { id, completeName, email } = newUser;
      return res.json({ id, completeName, email });
    } catch (err) {
      if (err instanceof Error.ValidationError) {
        return res.status(400).json(err.message);
      } else {
        return res.status(400).json(err);
      }
    }
  }
  //TODO: remove this route
  static async index(req: Request, res: Response) {
    try {
      const users = await User.find().select('id completeName email');
      return res.json(users);
    } catch (err) {
      return res.status(500).json('Something is wrong');
    }
  }

  static async show(req: Request, res: Response) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(401).json('User does not exist');
      const { id, completeName, email } = user;
      return res.json({ id, completeName, email });
    } catch (err) {
      return res.status(400).json('User not found');
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const user = await User.findByIdAndUpdate(req.userId, req.body, {
        new: true,
      });
      if (!user) return res.status(401).json('User does not exist');
      const { id, completeName, email } = user;
      return res.json({ id, completeName, email });
    } catch (err) {
      if (err instanceof Error.ValidationError) {
        return res.status(400).json(err.message);
      } else {
        return res.status(400).json(err);
      }
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const user = await User.findByIdAndRemove(req.userId);
      if (!user) return res.status(401).json('User does not exist');
      return res.json('User deleted successfully');
    } catch (err) {
      return res.status(400).json('User not found');
    }
  }
}

export default UserController;
