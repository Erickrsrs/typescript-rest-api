import express from 'express';
import { Request, Response, Express } from 'express';
import user from './user';
import student from './student';

const routes = (app: Express) => {
  app.route('/').get((req: Request, res: Response) => {
    res.status(200).send({ isOk: true });
  });

  app.use(express.json());
  app.use('/users/', user);
  app.use('/students/', student);
};

export default routes;
