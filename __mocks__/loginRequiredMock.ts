import { Request, Response, NextFunction } from 'express';
export default function () {
  jest.mock(
    '../src/api/middlewares/loginRequired',
    () => (req: Request, res: Response, next: NextFunction) => {
      return next();
    },
  );
}
