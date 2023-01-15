import { Request, Response, Express } from 'express';
import token from './token';
import user from './user';
import student from './student';
import photo from './photo';

const routes = (app: Express) => {
  app.route('/').get((req: Request, res: Response) => {
    res.send({ healthCheck: true });
  });

  app.use('/token/', token);
  app.use('/users/', user);
  app.use('/students/', student);
  app.use('/photo/', photo);
};

export default routes;
