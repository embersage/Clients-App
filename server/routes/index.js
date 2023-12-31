import { Router } from 'express';
import userRouter from './userRouter.js';
import tariffRouter from './tariffRouter.js';
import paymentRouter from './paymentRouter.js';
import notificationRouter from './notificationRouter.js';

const router = new Router();

router.use('/user', userRouter);
router.use('/tariff', tariffRouter);
router.use('/payment', paymentRouter);
router.use('/notification', notificationRouter);

export default router;
