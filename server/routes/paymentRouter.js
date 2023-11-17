import { Router } from 'express';
import PaymentController from '../controllers/paymentController.js';

const router = new Router();

router.get('/', PaymentController.getAll);
router.get('/:id', PaymentController.getOne);

export default router;
