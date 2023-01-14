import { Router } from 'express';
import StudentController from '../controllers/Student';
import loginRequired from '../middlewares/loginRequired';

const router = Router();

//TODO: middlewares to update photo references on the changes in students... (update and delete)

router.get('/', StudentController.index);
router.post('/', loginRequired, StudentController.create);
router.get('/:id', StudentController.show);
router.put('/:id', loginRequired, StudentController.update);
router.delete('/:id', loginRequired, StudentController.delete);

export default router;
