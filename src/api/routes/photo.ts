import { Router } from 'express';
import PhotoController from '../controllers/Photo';
import loginRequired from '../middlewares/loginRequired';

const router = Router();

router.post('/', loginRequired, PhotoController.create);
router.get('/', loginRequired, PhotoController.index);

export default router;
