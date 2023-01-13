import { Router } from 'express';
import ImageController from '../controllers/Image';

const router = Router();

router.post('/', ImageController.create);

export default router;
