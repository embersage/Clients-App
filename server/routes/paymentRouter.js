import { Router } from 'express';
import PaymentController from '../controllers/paymentController.js';
import checkRoleMiddleware from '../middleware/checkRoleMiddleware.js';

const paymentController = new PaymentController();
const router = new Router();

router.get('/', checkRoleMiddleware([2, 3]), paymentController.getAll);
router.get('/:id', checkRoleMiddleware([2, 3]), paymentController.getOne);

export default router;
