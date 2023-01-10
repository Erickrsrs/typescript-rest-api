import { Router } from 'express';
import RootController from '../controllers/root';
import StudentController from '../controllers/student';

const router = Router();

router.get('/', RootController.index);
//TODO: make student route separately
router.get('/student', StudentController.addStudent);

export default router;
