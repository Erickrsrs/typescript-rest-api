import { Request, Response } from 'express';
import { Error } from 'mongoose';
import { User } from '../models/User';

class UserController {
  static async create(req: Request, res: Response) {
    try {
      const newUser = await User.create(req.body);
      return res.json(newUser);
    } catch (err) {
      if (err instanceof Error.ValidationError) {
        return res.status(400).json(err.message);
      } else {
        return res.status(400).json(err);
      }
    }
  }

  static async index(req: Request, res: Response) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (err) {
      return res.status(500).json('Something is wrong');
    }
  }

  static async show(req: Request, res: Response) {
    try {
      const user = await User.findById(req.params.id);
      return res.json(user);
    } catch (err) {
      return res.status(400).json('User not found');
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(400).json('User not found');
      }
      await user.updateOne(req.body);
      return res.json(user);
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
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(400).json('User not found');
      }
      await user.deleteOne();
      return res.json('User deleted successfully');
    } catch (err) {
      if (err instanceof Error.ValidationError) {
        return res.status(400).json(err.message);
      } else {
        return res.status(400).json(err);
      }
    }
  }
}

export default UserController;
