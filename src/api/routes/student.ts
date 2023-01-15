import { Router } from 'express';
import StudentController from '../controllers/Student';
import loginRequired from '../middlewares/loginRequired';

const router = Router();

router.get('/', StudentController.index);
router.post('/', loginRequired, StudentController.create);
router.get('/:id', StudentController.show);
router.put('/:id', loginRequired, StudentController.update);
router.delete('/:id', loginRequired, StudentController.delete);

export default router;
