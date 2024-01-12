import { Router } from 'express';
import TariffController from '../controllers/tariffController.js';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js';

const tariffController = new TariffController();
const router = new Router();

router.get('/', checkRoleMiddleware([2, 3]), tariffController.getAll);
router.get('/:id', checkRoleMiddleware([2, 3]), tariffController.getOne);

export default router;
