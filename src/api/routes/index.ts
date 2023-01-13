import express, { Request, Response, Express } from 'express';
import token from './token';
import user from './user';
import student from './student';
import image from './image';

const routes = (app: Express) => {
  app.route('/').get((req: Request, res: Response) => {
    res.status(200).send({ isOk: true });
  });

  app.use(express.json());
  app.use('/token/', token);
  app.use('/users/', user);
  app.use('/students/', student);
  app.use('/image/', image);
};

export default routes;
