import { Router } from 'express';
import UserController from '../controllers/User';

const router = Router();

router.post('/create', UserController.create);

export default router;
