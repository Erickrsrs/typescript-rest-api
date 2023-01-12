import { Router } from 'express';
import TokenController from '../controllers/Token';

const router = Router();

router.post('/', TokenController.create);

export default router;
