import { Router } from 'express';
import StudentController from '../controllers/Student';

const router = Router();

router.post('/create', StudentController.create);

export default router;
