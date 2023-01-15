import { Router } from 'express';
import UserController from '../controllers/User';
import loginRequired from '../middlewares/loginRequired';

const router = Router();

router.get('/', UserController.index);
router.post('/', UserController.create);
router.get('/:id', UserController.show);
router.put('/', loginRequired, UserController.update);
router.delete('/', loginRequired, UserController.delete);

export default router;
