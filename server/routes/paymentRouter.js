import { Router } from 'express';
import PaymentController from '../controllers/paymentController.js';

const paymentController = new PaymentController();
const router = new Router();


router.get('/', paymentController.getAll);
router.get('/:id', paymentController.getOne);

export default router;
