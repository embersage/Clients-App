import { Router } from 'express';
import FirstPayController from '../controllers/firstPayController.js';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js';

const firstPayController = new FirstPayController();
const router = new Router();

router.get('/', checkRoleMiddleware([2, 3]), firstPayController.getAll);
router.get('/:id', checkRoleMiddleware([2, 3]), firstPayController.getOne);
router.patch('/:id', checkRoleMiddleware([2, 3]), firstPayController.update);
router.delete('/', checkRoleMiddleware([2, 3]), firstPayController.delete);

export default router;
