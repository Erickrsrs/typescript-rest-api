import { Request, Response } from 'express';
import { Error } from 'mongoose';
import { User } from '../models/User';

class UserController {
  static async create(req: Request, res: Response) {
    try {
      const user = await User.create(req.body);
      const { id, completeName, email } = user;
      return res.json({
        message: 'User created successfully',
        user: { id, completeName, email },
      });
    } catch (err) {
      if (err instanceof Error.ValidationError) {
        return res.status(400).json({ Error: err.message });
      } else {
        return res.status(400).json({ Error: err });
      }
    }
  }

  static async index(req: Request, res: Response) {
    try {
      const users = await User.find().select('id completeName email');
      return res.json({ users });
    } catch (err) {
      return res.status(500).json({ Error: 'Something went wrong' });
    }
  }

  static async show(req: Request, res: Response) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(400).json({ Error: 'User does not exist' });
      const { _id, completeName, email } = user;
      return res.json({ user: { _id, completeName, email } });
    } catch (err) {
      return res.status(400).json({ Error: 'User not found' });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      if (req.body.id && req.body.id !== req.userId) {
        return res.status(400).json({ Error: 'You cannot change your id' });
      }
      const user = await User.findByIdAndUpdate(req.userId, req.body, {
        new: true,
      });
      if (!user) return res.status(400).json({ Error: 'User does not exist' });
      const { id, completeName, email } = user;
      return res.json({ user: { id, completeName, email } });
    } catch (err) {
      if (err instanceof Error.ValidationError) {
        return res.status(400).json({ Error: err.message });
      } else {
        return res.status(400).json({
          Error:
            'You can change the following parameters: completeName and email',
        });
      }
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const user = await User.findByIdAndRemove(req.userId);
      if (!user) return res.status(400).json({ Error: 'User does not exist' });
      const { id, completeName, email } = user;
      return res.json({
        message: 'User deleted successfully',
        user: { id, completeName, email },
      });
    } catch (err) {
      return res.status(500).json({ Error: 'Something went wrong' });
    }
  }
}

export default UserController;
