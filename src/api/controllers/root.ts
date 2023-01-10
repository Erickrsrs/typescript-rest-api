import { Request, Response } from 'express';

class RootController {
  static index(req: Request, res: Response) {
    res.json({
      isOk: true,
    });
  }
}

export default RootController;
