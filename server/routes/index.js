import { Router } from 'express';
import userRouter from './userRouter.js';
import promocodeRouter from './promocodeRouter.js';
import paymentRouter from './paymentRouter.js';
import notificationRouter from './notificationRouter.js';

const router = new Router();

router.use('/user', userRouter);
router.use('/promocode', promocodeRouter);
router.use('/payment', paymentRouter);
router.use('/notification', notificationRouter);

export default router;
