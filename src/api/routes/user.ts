import { Router } from 'express';
import UserController from '../controllers/User';
import loginRequired from '../middlewares/loginRequired';

const router = Router();

//this method should not exist
router.get('/', UserController.index);

router.post('/', UserController.create);
router.get('/:id', UserController.show);

//a user can only update their own account
router.put('/', loginRequired, UserController.update);
//a user can only delete their own account
router.delete('/', loginRequired, UserController.delete);

export default router;
