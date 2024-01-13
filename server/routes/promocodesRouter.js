import { Router } from 'express';
import PromocodeController from '../controllers/promocodeController.js';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js';

const promocodeController = new PromocodeController();
const router = new Router();

router.get('/', checkRoleMiddleware([2, 3]), promocodeController.getAll);
router.get('/:id', checkRoleMiddleware([2, 3]), promocodeController.getOne);
router.patch('/:id', checkRoleMiddleware([2, 3]), promocodeController.update);
router.delete('/', checkRoleMiddleware([2, 3]), promocodeController.delete);

export default router;
